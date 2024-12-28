// components/modals/ImageModal.jsx
"use client";

import { useEffect, useState } from "react";
import { X, Image as LucideImage, Upload } from "lucide-react";
import Image from "next/image";

export const ImageModal = ({ isOpen, onClose, onSubmit, editData = null }) => {
  const [formData, setFormData] = useState({
    imageUrl: "",
    alt: "",
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && editData) {
      setFormData({
        imageUrl: editData.imageUrl || "",
        alt: editData.alt || "",
      });
      // Set preview if there's an existing image URL
      if (editData.imageUrl && typeof editData.imageUrl === "string") {
        setPreview(editData.imageUrl);
      }
    } else if (!isOpen) {
      setFormData({ imageUrl: "", alt: "" });
      setPreview(null);
    }
  }, [isOpen, editData]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors({
          ...errors,
          image: "Image size should not exceed 2MB",
        });
        return;
      }

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFormData({ ...formData, imageUrl: file });
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      setErrors({ image: "Please select an image" });
      return;
    }

    onSubmit(formData);
    setFormData({ imageUrl: "", alt: "" });
    setPreview(null);
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
                <LucideImage className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xl font-bold">
                {editData ? "Edit Image" : "Add Image"}
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
            {/* Image Upload */}
            <div>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  {preview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        Image size should not exceed 2MB
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">{errors.image}</p>
              )}
            </div>

            {/* Alt Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alt Text
              </label>
              <input
                type="text"
                value={formData.alt}
                onChange={(e) =>
                  setFormData({ ...formData, alt: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Enter image description (optional)"
              />
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
                {editData ? "Save Changes" : "Add Image"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
