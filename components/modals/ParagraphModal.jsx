// components/modals/ParagraphModal.jsx
"use client";

import { useEffect, useState } from "react";
import { X, Pilcrow } from "lucide-react";

export const ParagraphModal = ({
  isOpen,
  onClose,
  onSubmit,
  editData = null,
}) => {
  const [formData, setFormData] = useState({
    text: editData?.text || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && editData) {
      setFormData(editData);
    } else if (!isOpen) {
      setFormData({ text: "" });
    }
  }, [isOpen, editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    const newErrors = {};
    if (!formData.text.trim()) {
      newErrors.text = "Paragraph text is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
    setFormData({ text: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 " onClick={onClose} />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Pilcrow className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xl font-bold">
                {editData ? "Edit Paragraph" : "Add Paragraph"}
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
                Paragraph Text *
              </label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ text: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-32"
                placeholder="Enter paragraph text"
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
                {editData ? "Save Changes" : "Add Paragraph"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
