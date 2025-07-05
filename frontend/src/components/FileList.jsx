const FileList = ({ files, onRemove }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Selected Files <span className="text-gray-500">({files.length})</span>
        </h3>
        <span className="text-xs font-medium px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-full">
          PDF only
        </span>
      </div>
      
      <ul className="space-y-3">
        {files.map((file) => (
          <li 
            key={file.id} 
            className="group relative p-4 bg-white hover:bg-indigo-50/30 rounded-xl border border-gray-200 hover:border-indigo-200 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center min-w-0 space-x-4">
                <div className="p-2 bg-red-100/50 rounded-lg">
                  <svg
                    className="h-6 w-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {file.name}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </span>
                    <span className="text-xs text-gray-400">
                      • Uploaded {new Date(file.uploadTime).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => onRemove(file.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-100 transition-colors duration-200"
                title="Remove file"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
            
            <div className="absolute top-0 right-0 mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-xs text-gray-500">Click to remove</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default FileList;