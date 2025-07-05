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
  const [quality, setQuality] = useState(85); // Default to recommended quality
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);

  const handleDrop = (acceptedFiles) => {
    const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
    setFiles(prev => [
      ...prev, 
      ...pdfFiles.map(file => ({
        file,
        id: Math.random().toString(36).slice(2, 11),
        name: file.name,
        size: file.size,
        uploadTime: new Date().toISOString()
      }))
    ]);
  };

  // Fungsi untuk toggle modal
  const toggleFeaturesModal = () => {
    setShowFeaturesModal(!showFeaturesModal);
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

      const contentType = response.headers.get('content-type');
      const isZip = contentType.includes('application/zip');
      const filename = response.headers.get('content-disposition')?.split('filename=')[1] || 
                     (isZip ? 'converted_files.zip' : `converted.${format}`);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      setConvertedFiles([{
        url,
        name: filename.replace(/"/g, ''),
        isZip,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } catch (error) {
      console.error('Conversion error:', error);
      alert(error.message || 'Conversion failed. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const clearAll = () => {
    // Clean up object URLs to prevent memory leaks
    convertedFiles.forEach(file => URL.revokeObjectURL(file.url));
    setFiles([]);
    setConvertedFiles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
       <Header onFeaturesClick={toggleFeaturesModal} />

      {/* Features Modal */}
      {showFeaturesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Key Features</h3>
                <button 
                  onClick={toggleFeaturesModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Feature 1 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">High-Quality Conversion</h4>
                    <p className="text-gray-600 mt-1">Konversi PDF dengan DPI yang dapat disesuaikan (hingga 600) dan pengaturan kualitas.</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Batch Processing</h4>
                    <p className="text-gray-600 mt-1">Konversi beberapa PDF sekaligus. File akan dizip secara otomatis saat mengonversi beberapa dokumen.</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-purple-100 rounded-lg text-purple-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Fast Processing</h4>
                    <p className="text-gray-600 mt-1">Mesin konversi yang dioptimalkan yang memproses berkas Anda dengan cepat tanpa kehilangan kualitas.</p>
                  </div>
                </div>

                {/* Feature 4 - Gratis */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">100% Gratis</h4>
                    <p className="text-gray-600 mt-1">Tidak ada biaya tersembunyi. Konversi PDF ke gambar tanpa batas dan tanpa biaya.</p>
                  </div>
                </div>

                {/* Feature 6 - Ukuran File Kecil */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Ukuran File Optimal</h4>
                    <p className="text-gray-600 mt-1">Hasil konversi dengan ukuran file kecil tanpa mengurangi kualitas gambar.</p>
                  </div>
                </div>

                {/* Feature 7 - Cepat */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-red-100 rounded-lg text-red-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Proses Kilat</h4>
                    <p className="text-gray-600 mt-1">Konversi dokumen dalam hitungan detik berkat teknologi mutakhir.</p>
                  </div>
                </div>

                {/* Feature 8 - Multi Format */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-purple-100 rounded-lg text-purple-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Multi Format Output</h4>
                    <p className="text-gray-600 mt-1">Support konversi ke berbagai format (PNG, JPG, TIFF, BMP) dalam satu platform.</p>
                  </div>
                </div>

                {/* Feature 9 - Privasi */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-indigo-100 rounded-lg text-indigo-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Privasi Terjaga</h4>
                    <p className="text-gray-600 mt-1">File Anda tidak kami simpan di server. Semua proses terjadi secara lokal di browser Anda.</p>
                  </div>
                </div>

                {/* Feature 10 - Drag & Drop */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-pink-100 rounded-lg text-pink-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Drag & Drop</h4>
                    <p className="text-gray-600 mt-1">Upload file dengan mudah cukup drag & drop atau klik untuk memilih file.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={toggleFeaturesModal}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden p-6 border border-gray-200/60">
            <Dropzone onDrop={handleDrop} />
            
            {files.length > 0 && (
              <div className="space-y-6 mt-6">
                <FileList files={files} onRemove={removeFile} />
                
                <FormatOptions 
                  format={format}
                  setFormat={setFormat}
                  dpi={dpi}
                  setDpi={setDpi}
                  quality={quality}
                  setQuality={setQuality}
                />
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={clearAll}
                    className="px-5 py-2.5 text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear All
                  </button>
                  <button
                    onClick={convertFiles}
                    disabled={isConverting}
                    className={`px-6 py-2.5 rounded-lg text-white transition-all duration-300 shadow-md ${
                      isConverting 
                        ? 'bg-indigo-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 hover:shadow-lg'
                    } flex items-center`}
                  >
                    {isConverting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Convert Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {convertedFiles.length > 0 && (
            <Results files={convertedFiles}
                     onClear={clearAll}
             />
          )}
        </div>
      </main>

      <footer className="mt-12 py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} PDF Conferter By Sakum. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;