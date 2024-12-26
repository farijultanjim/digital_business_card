import { useState } from "react";
import { X, MessagesSquare } from "lucide-react";
import { HexColorPicker } from "react-colorful";

export const SocialLinksModal = ({ isOpen, onClose, onSubmit }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [formData, setFormData] = useState({
    iconColor: "#000000",
    iconSize: "medium",
    email: "",
    phone: "",
    telegram: "",
    whatsapp: "",
    facebook: "",
    messenger: "",
    instagram: "",
    twitter: "",
    tiktok: "",
    youtube: "",
    linkedin: "",
    spotify: "",
    pinterest: "",
    snapchat: "",
    twitch: "",
    discord: "",
    thread: "",
    reddit: "",
    address: "",
  });

  const iconSizes = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  const socialInputs = [
    { key: "email", label: "Email", prefix: "" },
    { key: "phone", label: "Phone Number", prefix: "" },
    { key: "telegram", label: "Telegram", prefix: "t.me/" },
    { key: "whatsapp", label: "WhatsApp", prefix: "wa.me/" },
    { key: "facebook", label: "Facebook", prefix: "facebook.com/" },
    { key: "messenger", label: "Messenger", prefix: "m.me/" },
    { key: "instagram", label: "Instagram", prefix: "instagram.com/" },
    { key: "twitter", label: "Twitter", prefix: "x.com/" },
    { key: "tiktok", label: "TikTok", prefix: "tiktok.com/@" },
    { key: "youtube", label: "YouTube", prefix: "youtube.com/" },
    { key: "linkedin", label: "LinkedIn", prefix: "linkedin.com/" },
    { key: "spotify", label: "Spotify", prefix: "open.spotify.com/artist/" },
    { key: "pinterest", label: "Pinterest", prefix: "pinterest.com/" },
    { key: "snapchat", label: "Snapchat", prefix: "snapchat.com/add/" },
    { key: "twitch", label: "Twitch", prefix: "twitch.tv/" },
    { key: "discord", label: "Discord", prefix: "discord.gg/" },
    { key: "thread", label: "Thread", prefix: "threads.net/@" },
    { key: "reddit", label: "Reddit", prefix: "reddit.com/" },
    { key: "address", label: "Address", prefix: "" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );
    onSubmit(filteredData);
    onClose();
  };

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-xl p-8 m-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MessagesSquare className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Social Links
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Color and Size Controls */}
          <div className="space-y-6">
            {/* Icon Color Picker */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon Color
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="w-12 h-12 rounded-lg border shadow-sm transition-shadow hover:shadow-md"
                  style={{ backgroundColor: formData.iconColor }}
                />
                <span className="text-sm font-mono">{formData.iconColor}</span>
              </div>
              {showColorPicker && (
                <div className="absolute mt-2 z-10 bg-white p-2 rounded-lg shadow-xl">
                  <HexColorPicker
                    color={formData.iconColor}
                    onChange={(color) => handleInputChange("iconColor", color)}
                  />
                </div>
              )}
            </div>

            {/* Icon Size Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon Size
              </label>
              <select
                value={formData.iconSize}
                onChange={(e) => handleInputChange("iconSize", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
              >
                {iconSizes.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Social Input Fields */}
          <div className="space-y-4">
            {socialInputs.map(({ key, label, prefix }) => (
              <div key={key} className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {label}
                </label>
                <div className="flex">
                  {prefix && (
                    <div className="bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg px-3 flex items-center min-w-fit">
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {prefix}
                      </span>
                    </div>
                  )}
                  <input
                    type={key === "email" ? "email" : "text"}
                    value={formData[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className={`flex-1 px-4 py-2.5 border border-gray-200 
                      focus:border-primary focus:ring-2 focus:ring-primary/20 
                      transition-all group-hover:border-gray-300
                      ${prefix ? "rounded-r-lg" : "rounded-lg"}`}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
