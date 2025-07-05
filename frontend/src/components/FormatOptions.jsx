const FormatOptions = ({ format, setFormat, dpi, setDpi, quality, setQuality }) => {
  const handleFormatChange = (e) => {
    const newFormat = e.target.value;
    setFormat(newFormat);
    if (newFormat === 'jpg') {
      setQuality(dpi >= 300 ? 85 : 90);
    }
  };

  const handleDpiChange = (e) => {
    const newDpi = parseInt(e.target.value);
    setDpi(newDpi);
    if (format === 'jpg') {
      setQuality(Math.max(70, 95 - (newDpi / 50)));
    }
  };

  const getQualityLevel = (q) => {
    if (q < 75) return 'Basic';
    if (q < 85) return 'Good';
    if (q < 90) return 'High';
    return 'Premium';
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Conversion Settings
        </h3>
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
            {format.toUpperCase()}
          </span>
          <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {dpi} DPI
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Format Selector */}
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center">
              Output Format
              <span className="ml-1.5 text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                Required
              </span>
            </span>
          </label>
          <select
            id="format"
            value={format}
            onChange={handleFormatChange}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          >
            <option value="png">PNG (Lossless)</option>
            <option value="jpg">JPG (Balanced)</option>
            <option value="tiff">TIFF (Print Quality)</option>
            <option value="bmp">BMP (Uncompressed)</option>
          </select>
          <div className="mt-2 text-xs text-gray-500 flex items-center">
            <svg className="w-3 h-3 mr-1 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            {format === 'jpg' ? 'Best for photographs' : 
             format === 'png' ? 'Best for text and graphics' :
             format === 'tiff' ? 'Best for professional printing' : 'Raw bitmap format'}
          </div>
        </div>

        {/* DPI Selector */}
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <label htmlFor="dpi" className="block text-sm font-medium text-gray-700 mb-2">
            Resolution
          </label>
          <div className="relative">
            <select
              id="dpi"
              value={dpi}
              onChange={handleDpiChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all"
            >
              <option value="72">72 DPI (Web - Fastest)</option>
              <option value="150">150 DPI (Mobile/Tablet)</option>
              <option value="300">300 DPI (Print - Recommended)</option>
              <option value="600">600 DPI (High Resolution)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Faster</span>
              <span>Higher Quality</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-indigo-600 h-1.5 rounded-full" 
                style={{ width: `${((dpi - 72) / (600 - 72)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Quality Slider (Conditional) */}
        {format === 'jpg' && (
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
            <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex justify-between items-center">
                <span>Quality Level</span>
                <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                  {getQualityLevel(quality)}
                </span>
              </div>
            </label>
            <input
              type="range"
              id="quality"
              min="60"
              max="95"
              step="1"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between mt-2">
              <div className="text-center">
                <div className="text-xs text-gray-500">60%</div>
                <div className="text-xs text-gray-400 mt-1">Basic</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">75%</div>
                <div className="text-xs text-gray-400 mt-1">Good</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">85%</div>
                <div className="text-xs text-gray-400 mt-1">High</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">95%</div>
                <div className="text-xs text-gray-400 mt-1">Premium</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Smart Tips Panel */}
      <div className={`mt-6 p-4 rounded-xl transition-all duration-300 ${
        format === 'jpg' 
          ? 'bg-blue-50/80 border border-blue-200' 
          : 'bg-gray-50/80 border border-gray-200'
      }`}>
        <div className="flex items-start">
          <div className={`flex-shrink-0 p-2 rounded-lg ${
            format === 'jpg' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-gray-800">
              {format === 'jpg' ? 'JPG Optimization Tip' : 'Conversion Advice'}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {format === 'jpg' 
                ? `For ${dpi}DPI, we recommend ${dpi >= 300 ? '75-85%' : '85-95%'} quality for optimal balance between file size and visual quality.`
                : format === 'png'
                ? 'PNG format preserves all image data without quality loss, ideal for text and line art.'
                : format === 'tiff'
                ? 'TIFF is best for professional printing and archiving at maximum quality.'
                : 'BMP provides completely uncompressed output, resulting in very large files.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormatOptions;