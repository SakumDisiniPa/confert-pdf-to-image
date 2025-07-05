import os
import zipfile
import tempfile
from flask_cors import CORS
from flask import Flask, request, send_file, jsonify
from pdf2image import convert_from_path
from PIL import Image, ImageFilter
import io

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'temp/uploads'
OUTPUT_FOLDER = 'temp/output'
ALLOWED_EXTENSIONS = {'pdf'}
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def optimize_image(image, output_format, quality):
    """Apply format-specific optimizations"""
    if output_format in ('jpg', 'jpeg'):
        image = image.convert('RGB')
        # Apply slight sharpening to compensate for JPEG artifacts
        image = image.filter(ImageFilter.SHARPEN)
    elif output_format == 'png':
        # Optimize PNG for smaller size without quality loss
        image = image.convert('RGBA') if image.mode == 'P' else image
    elif output_format == 'tiff':
        # Use LZW compression for TIFF
        pass
    return image

def convert_pdf_to_images(pdf_path, original_filename, output_format, dpi=300, quality=85):
    """Convert PDF to optimized images with smart settings"""
    try:
        images = convert_from_path(
            pdf_path,
            dpi=dpi,
            thread_count=4,
            grayscale=False,
            fmt='ppm'  # Intermediate format for best quality
        )
    except Exception as e:
        raise ValueError(f"PDF conversion failed: {str(e)}")

    converted_images = []
    base_name = os.path.splitext(original_filename)[0]
    
    for i, image in enumerate(images):
        try:
            img_io = io.BytesIO()
            image = optimize_image(image, output_format, quality)
            
            if output_format in ('jpg', 'jpeg'):
                # Smart quality adjustment based on DPI
                adj_quality = max(70, min(quality, 95 - (dpi // 100)))
                image.save(
                    img_io,
                    format='JPEG',
                    quality=adj_quality,
                    optimize=True,
                    progressive=True
                )
                ext = 'jpg'
            elif output_format == 'png':
                # Adaptive compression level
                comp_level = 6 if dpi <= 300 else 8
                image.save(
                    img_io,
                    format='PNG',
                    compress_level=comp_level,
                    optimize=True
                )
                ext = 'png'
            elif output_format == 'tiff':
                image.save(
                    img_io,
                    format='TIFF',
                    compression='lzw'
                )
                ext = 'tiff'
            elif output_format == 'bmp':
                image.save(img_io, format='BMP')
                ext = 'bmp'
            
            img_io.seek(0)
            converted_images.append((f"{base_name}_page_{i+1}.{ext}", img_io))
        except Exception as e:
            raise ValueError(f"Page {i+1} conversion failed: {str(e)}")
    
    return converted_images

@app.route('/convert', methods=['POST'])
def convert():
    # Validate request
    if 'files' not in request.files:
        return jsonify({'error': 'No files provided'}), 400
    
    files = request.files.getlist('files')
    if not files or all(file.filename == '' for file in files):
        return jsonify({'error': 'No selected files'}), 400
    
    # Validate parameters with proper error handling
    try:
        output_format = request.form.get('format', 'png').lower()
        dpi = int(request.form.get('dpi', 300))
        quality = int(request.form.get('quality', 85))  # Default to 85
        
        # Clamp values properly
        dpi = max(72, min(dpi, 600))  # Between 72-600
        quality = max(60, min(quality, 100))  # Between 60-100
        
        if output_format not in ['png', 'jpg', 'jpeg', 'tiff', 'bmp']:
            raise ValueError("Invalid output format")
            
    except ValueError as e:
        return jsonify({'error': f"Invalid parameter: {str(e)}"}), 400

    # Process files
    temp_dir = tempfile.mkdtemp()
    output_files = []
    first_filename = None
    
    try:
        for file in files:
            if file and allowed_file(file.filename):
                if first_filename is None:
                    first_filename = os.path.splitext(file.filename)[0]
                
                # Save uploaded PDF
                pdf_path = os.path.join(temp_dir, file.filename)
                file.save(pdf_path)
                
                # Convert with error handling
                try:
                    images = convert_pdf_to_images(
                        pdf_path,
                        file.filename,
                        output_format,
                        dpi=dpi,
                        quality=quality
                    )
                    output_files.extend(images)
                except ValueError as e:
                    return jsonify({'error': str(e)}), 400
        
        if not output_files:
            return jsonify({'error': 'No valid PDF files processed'}), 400
        
        # Return single file
        if len(output_files) == 1:
            filename, img_io = output_files[0]
            return send_file(
                img_io,
                as_attachment=True,
                download_name=filename,
                mimetype=f'image/{output_format}'
            )
        
        # Create optimized zip
        zip_filename = f"{first_filename}_converted.zip"
        zip_io = io.BytesIO()
        
        with zipfile.ZipFile(zip_io, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as zipf:
            for filename, img_io in output_files:
                zipf.writestr(filename, img_io.getvalue())
        
        zip_io.seek(0)
        return send_file(
            zip_io,
            as_attachment=True,
            download_name=zip_filename,
            mimetype='application/zip'
        )
    
    except Exception as e:
        app.logger.error(f"Conversion error: {str(e)}")
        return jsonify({'error': 'Server error during conversion'}), 500
    
    finally:
        # Cleanup
        for root, _, files in os.walk(temp_dir, topdown=False):
            for name in files:
                os.remove(os.path.join(root, name))
            os.rmdir(root)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)