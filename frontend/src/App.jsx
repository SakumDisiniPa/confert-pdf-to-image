import { useState } from 'react';
import Header from './components/Header';
import Dropzone from './components/Dropzone';
import FileList from './components/FileList';
import FormatOptions from './components/FormatOptions';
import Results from './components/Results';

function App() {
  const [files, setFiles] = useState([]);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [format, setFormat] = useState('png');
  const [dpi, setDpi] = useState(300);
  const [quality, setQuality] = useState(100);

  const handleDrop = (acceptedFiles) => {
    const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
    setFiles(prev => [...prev, ...pdfFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
    }))]);
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const convertFiles = async () => {
    if (files.length === 0) return;
    
    setIsConverting(true);
    setConvertedFiles([]);
    
    const formData = new FormData();
    files.forEach(file => formData.append('files', file.file));
    formData.append('format', format);
    formData.append('dpi', dpi);
    formData.append('quality', quality);

    try {
      const response = await fetch('http://localhost:5000/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Conversion failed');
      }

      // Cek content-type untuk menentukan apakah response berupa zip atau image
      const contentType = response.headers.get('content-type');
      const isZip = contentType.includes('application/zip');
      const filename = response.headers.get('content-disposition')?.split('filename=')[1] || 
                    (isZip ? 'converted_files.zip' : `converted.${format}`);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      setConvertedFiles([{
        url,
        name: filename.replace(/"/g, ''),
        isZip: isZip,
      }]);
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Conversion failed. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const clearAll = () => {
    setFiles([]);
    setConvertedFiles([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
            <Dropzone onDrop={handleDrop} />
            
            {files.length > 0 && (
              <>
                <FileList files={files} onRemove={removeFile} />
                
                <FormatOptions 
                  format={format}
                  setFormat={setFormat}
                  dpi={dpi}
                  setDpi={setDpi}
                  quality={quality}
                  setQuality={setQuality}
                />
                
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={convertFiles}
                    disabled={isConverting}
                    className={`px-6 py-2 rounded-lg text-white transition ${isConverting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    {isConverting ? 'Converting...' : 'Convert'}
                  </button>
                </div>
              </>
            )}
          </div>
          
          {convertedFiles.length > 0 && (
            <Results files={convertedFiles} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;