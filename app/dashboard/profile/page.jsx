"use client"

// app/dashboard/profile/page.jsx
import Image from "next/image";
import { useState } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    profileImage: "/user.png",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    dateOfBirth: "1990-01-01",
    timeZone: "GMT+0",
    twoStepAuth: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save the updated profile information
    console.log("Profile saved:", profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
      <div className="flex items-center mb-4">
        <Image
          src={profile.profileImage}
          alt="Profile"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover"
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setProfile({
                  ...profile,
                  profileImage: URL.createObjectURL(file),
                });
              }
            }}
            className="ml-4"
          />
        )}
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={profile.dateOfBirth}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time Zone
          </label>
          <input
            type="text"
            name="timeZone"
            value={profile.timeZone}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="twoStepAuth"
            checked={profile.twoStepAuth}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Enable 2-Step Authentication
          </label>
        </div>
        {isEditing && (
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSave}
              className="btn-primary py-2 px-4 rounded-md"
            >
              Save
            </button>
            <button
              onClick={handleEditToggle}
              className="btn-danger py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        )}
        {!isEditing && (
          <button
            onClick={handleEditToggle}
            className="btn-primary py-2 px-4 rounded-md mt-4"
          >
            Edit Profile
          </button>
        )}
        <div className="pt-10 flex justify-evenly items-center">
          <button className="btn-secondary py-2 px-4 rounded-md">
            Reset Password
          </button>
          <button className="btn-danger py-2 px-4 rounded-md">
            Delete Account
          </button>
        </div>
        
      </div>
    </div>
  );
}
