const Header = ({ onFeaturesClick }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 group">
            <div className="p-2 bxg-white/20 rounded-lg backdrop-blur-sm transition-all duration-300 group-hover:rotate-12">
              <svg
                className="h-10 w-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                PDF <span className="text-blue-200">To</span> Image
              </h1>
              <p className="text-blue-100 mt-1">
                Transform documents with <span className="font-semibold">one-click</span> magic
              </p>
            </div>
          </div>

          <div className="flex space-x-6 items-center">
              <button 
              onClick={onFeaturesClick}
              className="hidden md:block text-white/90 hover:text-white transition-colors font-medium px-3 py-2 rounded-lg hover:bg-white/10"
            >
              Features
            </button>
            <a
              href="#how-it-works"
              className="hidden md:block text-white/90 hover:text-white transition-colors font-medium"
            >
              How It Works
            </a>
            <a
              href="https://github.com/SakumDisiniPa/confert-pdf-to-image"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 group"
            >
              <svg 
                className="h-5 w-5 text-white group-hover:scale-110 transition-transform" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="text-white font-medium hidden md:inline">GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full backdrop-blur-sm">
            PNG • JPG • TIFF • BMP
          </span>
          <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full backdrop-blur-sm">
            Batch Processing
          </span>
          <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full backdrop-blur-sm">
            High Resolution
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;