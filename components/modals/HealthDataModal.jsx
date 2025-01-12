// components/modals/HealthDataModal.jsx
"use client";

import { useEffect, useState } from "react";
import { X, Stethoscope, Plus, Image as ImageIcon } from "lucide-react";

export const HealthDataModal = ({ isOpen, onClose, onSubmit, editData = null }) => {
  const [records, setRecords] = useState([
    {
      id: Date.now(),
      name: "",
      type: "prescription",
      image: null,
      date: "",
    },
  ]);

  useEffect(() => {
    if (isOpen && editData) {
      // Check if editData has records array and use it
      if (editData.records && Array.isArray(editData.records)) {
        setRecords(editData.records);
      }
    } else if (!isOpen) {
      // Reset form when modal closes
      setRecords([
        {
          id: Date.now(),
          name: "",
          type: "prescription",
          image: null,
          date: "",
        },
      ]);
    }
  }, [isOpen, editData]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateFileSize = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    return file.size <= maxSize;
  };

  const handleDrop = (id, e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && validateFileSize(file)) {
      handleChange(id, "image", file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAddRecord = () => {
    setRecords([
      ...records,
      {
        id: Date.now(),
        name: "",
        type: "prescription",
        image: null,
        date: "",
      },
    ]);
  };

  const handleRemoveRecord = (id) => {
    if (records.length === 1) return; // Keep at least one record
    setRecords(records.filter((record) => record.id !== id));
  };

  const handleChange = (id, field, value) => {
    setRecords(
      records.map((record) =>
        record.id === id ? { ...record, [field]: value } : record
      )
    );
  };

  const handleImageChange = async (id, e) => {
    const file = e.target.files[0];
    if (file && validateFileSize(file)) {
      handleChange(id, "image", file);
    } else {
      setErrors((prev) => ({
        ...prev,
        [`image-${id}`]: "File size should be less than 5MB",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate
    const newErrors = {};
    records.forEach((record) => {
      if (!record.name.trim()) {
        newErrors[`name-${record.id}`] = "Name is required";
      }
      if (!record.date) {
        newErrors[`date-${record.id}`] = "Date is required";
      }
      if (!record.image) {
        newErrors[`image-${record.id}`] = "Image is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      onSubmit(records);
      setRecords([
        {
          id: Date.now(),
          name: "",
          type: "prescription",
          image: null,
          date: "",
        },
      ]);
      onClose();
    } catch (error) {
      console.error("Error submitting health data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 m-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xl font-bold">
                {editData ? "Edit Health Data" : "Add Health Data"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {records.map((record, index) => (
              <div
                key={record.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Record #{index + 1}</h3>
                  {records.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRecord(record.id)}
                      className="text-red-500 hover:text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={record.name}
                      onChange={(e) =>
                        handleChange(record.id, "name", e.target.value)
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Enter name"
                    />
                    {errors[`name-${index}`] && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors[`name-${index}`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={record.type}
                      onChange={(e) =>
                        handleChange(record.id, "type", e.target.value)
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="prescription">Prescription</option>
                      <option value="report">Report</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={record.date}
                      onChange={(e) =>
                        handleChange(record.id, "date", e.target.value)
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    {errors[`date-${index}`] && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors[`date-${index}`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload{" "}
                      {record.type === "prescription"
                        ? "Prescription"
                        : "Report"}{" "}
                      *
                    </label>
                    <div
                      onDrop={(e) => handleDrop(record.id, e)}
                      onDragOver={handleDragOver}
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg"
                    >
                      <div className="space-y-2 text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="white rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={(e) => handleImageChange(record.id, e)}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                        {record.image && (
                          <p className="text-sm text-green-500">
                            File selected: {record.image.name}
                          </p>
                        )}
                      </div>
                    </div>
                    {errors[`image-${index}`] && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors[`image-${index}`]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddRecord}
              className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-primary hover:border-primary flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Another Record
            </button>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 bg-primary text-white rounded-lg transition-colors ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary/90"
                }`}
              >
                {editData ? "Save Changes" : "Add Health Data"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
