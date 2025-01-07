import { useState, useEffect } from "react";
import { Brush, Zap } from "lucide-react";
import { HexColorPicker, HexColorInput } from "react-colorful";

const simpleGradients = [
  {
    name: "Sunset",
    value: "linear-gradient(to right, #ff6e7f, #bfe9ff)",
  },
  {
    name: "Ocean",
    value: "linear-gradient(to right, #00b4db, #0083b0)",
  },
  {
    name: "Sunny",
    value: "linear-gradient(to right, #f6d365, #fda085)",
  },
  {
    name: "Forest",
    value: "linear-gradient(to right, #84fab0, #8fd3f4)",
  },
  {
    name: "Twilight",
    value: "linear-gradient(to right, #a8c0ff, #3f2b96)",
  },
  {
    name: "Rose",
    value: "linear-gradient(to right, #dd5e89, #f7bb97)",
  },
];

const fontOptions = [
  { name: "Default", value: "'Plus Jakarta Sans', system-ui, sans-serif" },
  { name: "Roboto", value: "'Roboto', sans-serif" },
  { name: "Poppins", value: "'Poppins', sans-serif" },
  { name: "Playfair Display", value: "'Playfair Display', serif" },
  { name: "Montserrat", value: "'Montserrat', sans-serif" },
  { name: "Open Sans", value: "'Open Sans', sans-serif" },
  { name: "Lato", value: "'Lato', sans-serif" },
];

const BackgroundTypes = {
  simpleGradients: "Simple Gradients",
  customGradients: "Custom Gradients",
  customColor: "Custom Color",
};

export const PageSettings = ({ pageData, updatePageData }) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [backgroundType, setBackgroundType] = useState(
    BackgroundTypes.simpleGradients
  );
  const [selectedGradient, setSelectedGradient] = useState(
    simpleGradients[0].value
  );
  const [gradientColor1, setGradientColor1] = useState("#ff6e7f");
  const [gradientColor2, setGradientColor2] = useState("#bfe9ff");
  const [customColor, setCustomColor] = useState("#ffffff");
  const [showColorPicker1, setShowColorPicker1] = useState(false);
  const [showColorPicker2, setShowColorPicker2] = useState(false);
  const [showCustomColorPicker, setShowCustomColorPicker] = useState(false);
  const [fontFamily, setFontFamily] = useState(
    pageData.fontFamily || "'Plus Jakarta Sans', system-ui, sans-serif"
  );

  useEffect(() => {
    // Update background based on type whenever relevant values change
    let newBackground;
    switch (backgroundType) {
      case BackgroundTypes.simpleGradients:
        newBackground = selectedGradient;
        break;
      case BackgroundTypes.customGradients:
        newBackground = `linear-gradient(to right, ${gradientColor1}, ${gradientColor2})`;
        break;
      case BackgroundTypes.customColor:
        newBackground = customColor;
        break;
      default:
        newBackground = selectedGradient;
    }
    updatePageData({ ...pageData, backgroundColor: newBackground });
  }, [
    backgroundType,
    selectedGradient,
    gradientColor1,
    gradientColor2,
    customColor,
    updatePageData,
    pageData,
  ]);

  const handleFontFamilyChange = (font) => {
    setFontFamily(font);
    updatePageData({ ...pageData, fontFamily: font });
  };

  // Close color pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".color-picker-container")) {
        setShowColorPicker1(false);
        setShowColorPicker2(false);
        setShowCustomColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <label className="flex items-center font-medium text-gray-700 mb-2">
          <Zap className="w-4 h-4 mr-1.5" />
          Short URL
        </label>
        <div className="flex">
          <div className="bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg px-3 flex items-center min-w-fit">
            <span className="text-sm text-gray-500 whitespace-nowrap">
              cardify.com/
            </span>
          </div>
          <input
            type="text"
            // value={}
            // onChange={}
            className="flex-1 px-4 py-2.5 border border-gray-200 
                      focus:border-primary focus:ring-2 focus:ring-primary/20 
                      transition-all group-hover:border-gray-300
                      rounded-r-lg"
            placeholder="Enter your short URL"
          />
        </div>
      </div>

      <button
        onClick={() => setShowCustomization(!showCustomization)}
        className="px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all w-full flex justify-center items-center gap-2 font-medium"
      >
        <Brush className="w-5 h-5" />
        Customize Appearance
      </button>

      {showCustomization && (
        <div className="mt-4 border border-gray-100 rounded-xl p-6 bg-white shadow-sm space-y-6 ">
          {/* Background Type Selector */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-900">
              Background Style
            </label>
            <select
              value={backgroundType}
              onChange={(e) => setBackgroundType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {Object.values(BackgroundTypes).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {/* Background Options */}
            <div className="mt-4">
              {backgroundType === BackgroundTypes.simpleGradients && (
                <div className="grid grid-cols-3 gap-3">
                  {simpleGradients.map((gradient) => (
                    <button
                      key={gradient.name}
                      onClick={() => setSelectedGradient(gradient.value)}
                      className={`h-20 rounded-lg transition-all hover:scale-105 ${
                        selectedGradient === gradient.value
                          ? "ring-2 ring-primary"
                          : "border border-gray-200"
                      }`}
                      style={{ background: gradient.value }}
                    />
                  ))}
                </div>
              )}

              {backgroundType === BackgroundTypes.customGradients && (
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <div className="relative flex-1 color-picker-container">
                      <div className="space-y-2">
                        <div
                          onClick={() => setShowColorPicker1(!showColorPicker1)}
                          className="h-10 rounded-lg border cursor-pointer"
                          style={{ backgroundColor: gradientColor1 }}
                        />
                        <HexColorInput
                          color={gradientColor1}
                          onChange={setGradientColor1}
                          className="w-full px-2 py-1 text-sm border rounded"
                        />
                      </div>
                      {showColorPicker1 && (
                        <div className="absolute mt-2 z-20">
                          <HexColorPicker
                            color={gradientColor1}
                            onChange={setGradientColor1}
                          />
                        </div>
                      )}
                    </div>
                    <div className="relative flex-1 color-picker-container">
                      <div className="space-y-2">
                        <div
                          onClick={() => setShowColorPicker2(!showColorPicker2)}
                          className="h-10 rounded-lg border cursor-pointer"
                          style={{ backgroundColor: gradientColor2 }}
                        />
                        <HexColorInput
                          color={gradientColor2}
                          onChange={setGradientColor2}
                          className="w-full px-2 py-1 text-sm border rounded"
                        />
                      </div>
                      {showColorPicker2 && (
                        <div className="absolute mt-2 z-20">
                          <HexColorPicker
                            color={gradientColor2}
                            onChange={setGradientColor2}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="h-20 rounded-lg border"
                    style={{
                      background: `linear-gradient(to right, ${gradientColor1}, ${gradientColor2})`,
                    }}
                  />
                </div>
              )}

              {backgroundType === BackgroundTypes.customColor && (
                <div className="relative color-picker-container">
                  <div className="space-y-2">
                    <div
                      onClick={() =>
                        setShowCustomColorPicker(!showCustomColorPicker)
                      }
                      className="h-10 rounded-lg border cursor-pointer"
                      style={{ backgroundColor: customColor }}
                    />
                    <HexColorInput
                      color={customColor}
                      onChange={setCustomColor}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  {showCustomColorPicker && (
                    <div className="absolute mt-2 z-20">
                      <HexColorPicker
                        color={customColor}
                        onChange={setCustomColor}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Font Family Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-900">
              Font Family
            </label>
            <div className="grid grid-cols-2 gap-2">
              {fontOptions.map((font) => (
                <button
                  key={font.value}
                  onClick={() => handleFontFamilyChange(font.value)}
                  className={`px-4 py-3 rounded-lg border text-sm transition-all ${
                    fontFamily === font.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  style={{ fontFamily: font.value }}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
