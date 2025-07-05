import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 10,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
        isDragActive 
          ? 'border-indigo-500 bg-indigo-50/50 backdrop-blur-sm' 
          : 'border-gray-300/80 hover:border-indigo-400 bg-white/50 hover:bg-indigo-50/30'
      }`}
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        <div className={`mx-auto h-16 w-16 transition-all duration-300 ${
          isDragActive ? 'scale-110 text-indigo-600' : 'text-gray-400'
        }`}>
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <div className="space-y-1">
          <p className={`text-xl font-semibold transition-colors ${
            isDragActive ? 'text-indigo-700' : 'text-gray-700'
          }`}>
            {isDragActive ? 'Release to convert' : 'Drag & drop PDFs here'}
          </p>
          <p className="text-sm text-gray-500">
            or <span className="text-indigo-600 font-medium">browse files</span>
          </p>
        </div>
        <div className="flex justify-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            Max 10 files • PDF only
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dropzone;