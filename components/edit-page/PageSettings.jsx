import { useState, useEffect } from "react";
import { Brush, Upload, UserCog, Zap } from "lucide-react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import Image from "next/image";

const InputField = ({
  label,
  name,
  type = "text",
  required = true,
  options = [],
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      )}
    </div>
  );
};

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
  { name: "Lato", value: "'Lato', sans-serif" },
  { name: "Poppins", value: "'Poppins', sans-serif" },
  { name: "Roboto Slab", value: "'Roboto Slab', serif" },
  { name: "Oswald", value: "'Oswald', sans-serif" },
  { name: "Lora", value: "'Lora', serif" },
  { name: "Ubuntu", value: "'Ubuntu', sans-serif" },
  { name: "Crimson Text", value: "'Crimson Text', serif" },
  { name: "Titillium Web", value: "'Titillium Web', sans-serif" },
  { name: "Dosis", value: "'Dosis', sans-serif" },
  { name: "Josefin Sans", value: "'Josefin Sans', serif" },
  { name: "Lobster", value: "'Lobster', cursive" },
  { name: "Play", value: "'Play', serif" },
  { name: "Playfair Display", value: "'Playfair Display', serif" },
  { name: "Montserrat", value: "'Montserrat', serif" },

  { name: "Playwrite Austrailia", value: "'Playwrite AU SA', serif" },
  { name: "Rubik Vinyl", value: "'Rubik Vinyl', serif" },
  { name: "Jersey 10", value: "'Jersey 10', serif" },
  { name: "Bebas Neue", value: "'Bebas Neue', serif" },
  { name: "Playwrite VN", value: "'Playwrite VN', serif" },
  { name: "Dancing Script", value: "'Dancing Script', serif" },
  { name: "Pacifico", value: "'Pacifico', serif" },
  { name: "Caveat", value: "'Caveat', serif" },
  { name: "Abril Fatface", value: "'Abril Fatface', serif" },
];

const BackgroundTypes = {
  simpleGradients: "Simple Gradients",
  customGradients: "Custom Gradients",
  customColor: "Custom Color",
};

export const PageSettings = ({ pageData, updatePageData }) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [errors, setErrors] = useState({});

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

  const [fontColor, setFontColor] = useState(pageData.fontColor || "#000000");
  const [showFontColorPicker, setShowFontColorPicker] = useState(false);

  const [fontFamily, setFontFamily] = useState(
    pageData.fontFamily || "'Plus Jakarta Sans', system-ui, sans-serif"
  );

  const [profileImage, setProfileImage] = useState(
    pageData.profileImage || null
  );

  const [formData, setFormData] = useState({
    customerName: pageData.customerName || "",
    customerId: pageData.customerId || "",
    dateOfBirth: pageData.dateOfBirth || "",
    gender: pageData.gender || "",
    customerPhone: pageData.customerPhone || "",
    customerEmail: pageData.customerEmail || "",
    maritalStatus: pageData.maritalStatus || "",
    membershipType: pageData.membershipType || "",
    subscription: pageData.subscription || "",
    membershipStartDate: pageData.membershipStartDate || "",
  });

  const membershipTypes = ["Silver", "Gold", "Platinum"];
  const subscriptionTypes = ["Monthly", "Yearly"];
  const genderOptions = ["Male", "Female", "Other"];
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setErrors({
          ...errors,
          profileImage: "Image size should not exceed 3MB",
        });
        return;
      }
      setErrors({ ...errors, profileImage: null });
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      updatePageData({
        ...pageData,
        profileImage: imageUrl,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    updatePageData({
      ...pageData,
      [name]: value,
    });
  };

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
    updatePageData({
      ...pageData,
      backgroundColor: newBackground,
      fontColor: fontColor,
    });
  }, [
    backgroundType,
    selectedGradient,
    gradientColor1,
    gradientColor2,
    customColor,
    fontColor,
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
        setShowFontColorPicker(false);
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
            <div className="grid grid-cols-3 gap-2">
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

          {/* Font Color Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-900">
              Font Color
            </label>
            <div className="relative color-picker-container">
              <div className="space-y-2">
                <div
                  onClick={() => setShowFontColorPicker(!showFontColorPicker)}
                  className="h-10 rounded-lg border cursor-pointer"
                  style={{ backgroundColor: fontColor }}
                />
                <HexColorInput
                  color={fontColor}
                  onChange={setFontColor}
                  className="w-full px-2 py-1 text-sm border rounded"
                />
              </div>
              {showFontColorPicker && (
                <div className="absolute mt-2 z-20">
                  <HexColorPicker color={fontColor} onChange={setFontColor} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowEditInfo(!showEditInfo)}
        className="px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all w-full flex justify-center items-center gap-2 font-medium"
      >
        <UserCog className="w-5 h-5" />
        Edit Information
      </button>

      {showEditInfo && (
        <div className="mt-4 border border-gray-100 rounded-xl p-6 bg-white shadow-sm space-y-6">
          {/* Profile Image Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">
              Profile Picture
            </h3>
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-primary-light border-2 border-dashed border-primary">
                {profileImage ? (
                  <>
                    <Image
                      src={profileImage}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setProfileImage(null);
                        updatePageData({
                          ...pageData,
                          profileImage: null,
                        });
                      }}
                      className="absolute inset-0 bg-primary/50 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
                    >
                      Change
                    </button>
                  </>
                ) : (
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-colors duration-300">
                    <Upload className="w-6 h-6 text-gray-600" />
                    <span className="mt-2 text-sm text-gray-600">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileImageChange}
                    />
                  </label>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-700">
                  Upload Profile Picture
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Recommended size: 300x300px. Maximum file size: 3MB
                </p>
                {errors.profileImage && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.profileImage}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">
              Basic Information
            </h3>
            <div className="grid grid-cols-1  gap-4">
              <InputField
                label="Customer Name"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
              />
              <InputField
                label="Customer ID"
                name="customerId"
                value={formData.customerId}
                onChange={handleInputChange}
              />
              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
              <InputField
                label="Gender"
                name="gender"
                type="select"
                options={genderOptions}
                value={formData.gender}
                onChange={handleInputChange}
              />
              <InputField
                label="Phone Number"
                name="customerPhone"
                type="tel"
                value={formData.customerPhone}
                onChange={handleInputChange}
              />
              <InputField
                label="Email"
                name="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={handleInputChange}
              />
              <InputField
                label="Marital Status"
                name="maritalStatus"
                type="select"
                options={maritalStatusOptions}
                value={formData.maritalStatus}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Membership Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">
              Membership Details
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <InputField
                label="Membership Type"
                name="membershipType"
                type="select"
                options={membershipTypes}
                value={formData.membershipType}
                onChange={handleInputChange}
              />
              <InputField
                label="Subscription"
                name="subscription"
                type="select"
                options={subscriptionTypes}
                value={formData.subscription}
                onChange={handleInputChange}
              />
              <InputField
                label="Membership Start Date"
                name="membershipStartDate"
                type="date"
                value={formData.membershipStartDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
