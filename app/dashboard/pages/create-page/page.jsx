"use client";

import { useState } from "react";
import { Upload, X, Plus, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const InputField = ({
  label,
  name,
  type = "text",
  required = true,
  options = [],
  error,
  ...props
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "select" ? (
        <select
          name={name}
          required={required}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
          {...props}
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
          required={required}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          {...props}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

const FormSection = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  );
};

export default function CreatePagePage() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const membershipTypes = ["Silver", "Gold", "Platinum"];
  const subscriptionTypes = ["Monthly", "Yearly"];
  const genderOptions = ["Male", "Female", "Other"];
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Add file validation here (size, type, etc.)
      if (file.size > 3 * 1024 * 1024) {
        setErrors({
          ...errors,
          profileImage: "Image size should not exceed 3MB",
        });
        return;
      }
      setErrors({ ...errors, profileImage: null });
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      // API call simulation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // successful page creation with a dummy ID simulation
      const createdPageId = Math.floor(Math.random() * 1000);

      //TODO: Show success message using toast notification (you can add a toast library)
      console.log("Page created successfully:", { ...data, profileImage });

      // Redirect to edit page
      router.push(`/dashboard/pages/${createdPageId}/edit`);
    } catch (error) {
      setErrors({
        submit: "Failed to create page. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Page</h1>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the basic information to create your digital business card
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Profile Image Upload */}
        <FormSection title="Profile Picture">
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
                    onClick={() => setProfileImage(null)}
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
        </FormSection>

        {/* Basic Information */}
        <FormSection title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Customer Name"
              name="customerName"
              placeholder="Enter full name"
            />
            <InputField
              label="Customer ID"
              name="customerId"
              placeholder="Enter customer ID"
            />
            <InputField label="Date of Birth" name="dateOfBirth" type="date" />
            <InputField
                label="Gender"
                name="gender"
                type="select"
                options={genderOptions}
              />
              <InputField
                label="Phone Number"
                name="customerPhone"
                type="tel"
                placeholder="+1 (234) 567-8900"
            />
            <InputField
              label="Email"
              name="customerEmail"
              type="email"
              placeholder="example@email.com"
            />
            <InputField
              label="Marital Status"
              name="maritalStatus"
              type="select"
              options={maritalStatusOptions}
            />
          </div>
        </FormSection>

        {/* Membership Details */}
        <FormSection title="Membership Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Membership Type"
              name="membershipType"
              type="select"
              options={membershipTypes}
            />
            <InputField
              label="Subscription"
              name="subscription"
              type="select"
              options={subscriptionTypes}
            />
            <InputField
              label="Membership Start Date"
              name="membershipStartDate"
              type="date"
            />
          </div>
        </FormSection>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Page"
            )}
          </button>
        </div>

        {errors.submit && (
          <p className="text-sm text-red-500 text-center">{errors.submit}</p>
        )}
      </form>
    </div>
  );
}
