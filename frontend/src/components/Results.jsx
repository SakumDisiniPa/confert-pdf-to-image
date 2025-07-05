const Results = ({ files }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Conversion Results</h3>
      <div className="space-y-4">
        {files.map((file, index) => (
          <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {file.isZip ? (
                  <svg className="h-8 w-8 text-yellow-500" /* zip icon */ >
                    {/* ... */}
                  </svg>
                ) : (
                  <svg className="h-8 w-8 text-green-500" /* image icon */ >
                    {/* ... */}
                  </svg>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {file.isZip ? 'ZIP archive containing all images' : 'Converted image file'}
                </p>
              </div>
            </div>
            <a
              href={file.url}
              download={file.name}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;