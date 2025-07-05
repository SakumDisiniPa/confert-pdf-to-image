const Results = ({ files, onClear }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 mt-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Your Results
          <span className="ml-2 text-indigo-600">{files.length}</span>
        </h3>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
            Ready
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {files.map((file, index) => (
          <div 
            key={index} 
            className="group flex justify-between items-center p-4 bg-white hover:bg-indigo-50/30 rounded-xl border border-gray-200 hover:border-indigo-200 transition-all duration-200"
          >
            <div className="flex items-center space-x-4 min-w-0">
              <div className={`p-3 rounded-lg ${file.isZip ? 'bg-amber-100/50' : 'bg-emerald-100/50'}`}>
                {file.isZip ? (
                  <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-gray-800 truncate">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {file.isZip ? (
                    <span className="inline-flex items-center">
                      <svg className="w-3 h-3 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                      </svg>
                      ZIP archive ({files.length} files)
                    </span>
                  ) : (
                    <span className="inline-flex items-center">
                      <svg className="w-3 h-3 mr-1 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Ready to download
                    </span>
                  )}
                </p>
              </div>
            </div>
            <a
              href={file.url}
              download={file.name}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download</span>
            </a>
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <div className="mt-6 pt-5 border-t border-gray-200 flex justify-end">
          <button 
            onClick={() => {
              files.forEach(file => URL.revokeObjectURL(file.url));
              onClear();
            }}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default Results;