const FormatOptions = ({ format, setFormat, dpi, setDpi, quality, setQuality }) => {
  const handleFormatChange = (e) => {
    const newFormat = e.target.value;
    setFormat(newFormat);
    // Reset quality to recommended default when format changes
    if (newFormat === 'jpg') {
      setQuality(dpi >= 300 ? 85 : 90);
    }
  };

  const handleDpiChange = (e) => {
    const newDpi = parseInt(e.target.value);
    setDpi(newDpi);
    // Adjust quality automatically for JPG
    if (format === 'jpg') {
      setQuality(Math.max(70, 95 - (newDpi / 50))); // Higher DPI = slightly lower quality
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Conversion Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">
            Output Format
          </label>
          <select
            id="format"
            value={format}
            onChange={handleFormatChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="png">PNG (Lossless)</option>
            <option value="jpg">JPG (Balanced)</option>
            <option value="tiff">TIFF (High Quality)</option>
            <option value="bmp">BMP (Uncompressed)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {format === 'jpg' ? 'Best for photos' : 
             format === 'png' ? 'Best for text/diagrams' :
             format === 'tiff' ? 'Best for printing' : 'Uncompressed format'}
          </p>
        </div>
        
        <div>
          <label htmlFor="dpi" className="block text-sm font-medium text-gray-700 mb-1">
            Resolution (DPI)
          </label>
          <select
            id="dpi"
            value={dpi}
            onChange={handleDpiChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="72">72 (Web - Fastest)</option>
            <option value="150">150 (Mobile/Tablet)</option>
            <option value="300">300 (Print - Recommended)</option>
            <option value="600">600 (High-Res)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {dpi >= 300 ? `Note: ${dpi}DPI may create larger files` : 'Good balance of quality/size'}
          </p>
        </div>
        
        {format === 'jpg' && (
          <div>
            <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-1">
              JPG Quality: {quality}%
              <span className="ml-2 text-xs font-normal">
                ({quality < 80 ? 'Low' : quality < 90 ? 'Good' : 'Excellent'})
              </span>
            </label>
            <input
              type="range"
              id="quality"
              min="60"
              max="95"
              step="1"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Smaller File</span>
              <span>Better Quality</span>
            </div>
          </div>
        )}
      </div>

      {/* Quality Tips */}
      {format === 'jpg' && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> {dpi >= 300 
              ? 'For high DPI, 75-85% quality is usually sufficient'
              : 'For web use, 85-95% quality provides excellent results'}
          </p>
        </div>
      )}
    </div>
  );
};

export default FormatOptions;