// components/modals/HeadingModal.jsx
"use client";

import { useEffect, useState } from "react";
import { X, Heading } from "lucide-react";

export const HeadingModal = ({
  isOpen,
  onClose,
  onSubmit,
  editData = null,
}) => {
  const [formData, setFormData] = useState({
    type: editData?.type || "h1",
    text: editData?.text || "",
  });

  const [errors, setErrors] = useState({});

  const headingTypes = ["h1", "h2", "h3", "h4", "h5", "h6"];

  useEffect(() => {
    if (isOpen && editData) {
      setFormData({
        type: editData.type || "h1",
        text: editData.text || "",
      });
    } else if (!isOpen) {
      setFormData({ type: "h1", text: "" }); 
    }
  }, [isOpen, editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    const newErrors = {};
    if (!formData.text.trim()) {
      newErrors.text = "Heading text is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
    setFormData({ type: "h1", text: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Heading className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xl font-bold">
                {editData ? "Edit Heading" : "Add Heading"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heading Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                {headingTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heading Text *
              </label>
              <input
                type="text"
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Enter heading text"
              />
              {errors.text && (
                <p className="mt-1 text-sm text-red-500">{errors.text}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                {editData ? "Save Changes" : "Add Heading"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
