'use client'

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Lock, Smartphone, AlertTriangle } from "lucide-react";

export default function ProfilePage() {
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [profile, setProfile] = useState({
    profileImage: "/user.jpg",
    name: "Farijul Tanzil",
    email: "farijultanzil@gmail.com",
    phone: "+8801611899118",
    dateOfBirth: "1998-07-02",
    timeZone: "GMT+0",
    twoStepAuth: false,
  });
  const [imageError, setImageError] = useState("");

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Reset any previous errors
      setImageError("");

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setImageError("Please select an image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Image size should be less than 5MB");
        return;
      }

      // Create a preview URL
      const imageUrl = URL.createObjectURL(file);

      // Update profile with new image
      setProfile((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));

      // Here you would typically upload the image to your server
      // For now, we'll just log the file
      console.log("Image file to upload:", file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleTwoFactorToggle = () => {
    if (!profile.twoStepAuth) {
      setShowTwoFactorSetup(true);
    } else {
      setProfile({ ...profile, twoStepAuth: false });
    }
  };

  const handleSave = () => {
    console.log("Profile saved:", profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6 bg-surface">
      {/* Tabs */}
      <div className="flex space-x-1 bg-neutral-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors
            ${
              activeTab === "profile"
                ? "bg-primary text-white"
                : "text-text-secondary hover:bg-neutral-200"
            }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors
            ${
              activeTab === "security"
                ? "bg-primary text-white"
                : "text-text-secondary hover:bg-neutral-200"
            }`}
        >
          Security
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-text-primary">
                Profile Information
              </h2>
              <p className="text-text-secondary mt-1">
                Manage your personal information and preferences
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Image
                  src={profile.profileImage}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-primary-light"
                />
                {isEditing && (
                  <>
                    <button
                      onClick={handleImageClick}
                      className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>
              {imageError && (
                <p className="text-secondary-dark text-sm">{imageError}</p>
              )}
              {isEditing && (
                <p className="text-text-secondary text-sm">
                  Click the camera icon to update your profile picture
                </p>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 rounded-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-neutral-50 disabled:text-text-secondary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  className="w-full px-3 py-2 rounded-md border border-neutral-200 bg-neutral-50 text-text-secondary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 rounded-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-neutral-50 disabled:text-text-secondary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 rounded-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-neutral-50 disabled:text-text-secondary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Time Zone
                </label>
                <input
                  type="text"
                  name="timeZone"
                  value={profile.timeZone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 rounded-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-neutral-50 disabled:text-text-secondary"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-md border border-neutral-200 text-text-primary hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-text-primary">
                Security Settings
              </h2>
              <p className="text-text-secondary mt-1">
                Manage your account security and authentication methods
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-text-primary">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button
                  onClick={handleTwoFactorToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${profile.twoStepAuth ? "bg-accent" : "bg-neutral-200"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${
                        profile.twoStepAuth ? "translate-x-6" : "translate-x-1"
                      }`}
                  />
                </button>
              </div>

              {showTwoFactorSetup && (
                <div className="space-y-4 border border-neutral-200 rounded-lg p-6 bg-neutral-50">
                  <div className="flex items-center space-x-2 text-text-primary">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">
                      Set up 2FA with Authenticator App
                    </h3>
                  </div>

                  <ol className="space-y-4 ml-6 list-decimal text-text-primary">
                    <li>
                      Download an authenticator app like Google Authenticator
                    </li>
                    <li>Scan this QR code with your authenticator app</li>
                    <li>Enter the 6-digit code from your authenticator app</li>
                  </ol>

                  <div className="flex justify-center p-4">
                    <div className="w-48 h-48 bg-surface rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-200">
                      <Lock className="h-12 w-12 text-neutral-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="w-full px-3 py-2 rounded-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-primary-light rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-text-primary">
                      Save these backup codes in a secure place in case you lose
                      access to your device
                    </p>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowTwoFactorSetup(false)}
                      className="px-4 py-2 rounded-md border border-neutral-200 text-text-primary hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setProfile({ ...profile, twoStepAuth: true });
                        setShowTwoFactorSetup(false);
                      }}
                      className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4 pt-6">
                <button className="w-full px-4 py-2 rounded-md border border-neutral-200 text-text-primary hover:bg-neutral-50 transition-colors">
                  Change Password
                </button>
                <button className="w-full px-4 py-2 rounded-md bg-secondary hover:bg-secondary-dark text-white transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
