// app/dashboard/pages/page.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Plus,
  MoreVertical,
  Archive,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

export default function PagesPage() {
  const [activeMenu, setActiveMenu] = useState(null);

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    setActiveMenu(null);
  };

  const handleAction = (action, pageId) => {
    switch (action) {
      case "edit":
        window.location.href = `/dashboard/pages/${pageId}/edit`;
        break;
      case "archive":
        console.log(`Archiving page with ID: ${pageId}`);
        break;
      case "delete":
        console.log(`Deleting page with ID: ${pageId}`);
        break;
      case "view":
        console.log(`Viewing page with ID: ${pageId}`);
        break;
      default:
        break;
    }
    setActiveMenu(null);
  };

  // Your existing pages data
  const pages = [
    {
      id: 1,
      name: "Farijul Tanzil",
      image: "/user.jpg",
      isActive: true,
      expiryDate: "2025-08-31",
    },
    // ... other pages
  ];

  return (
    <div className="p-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pages</h1>
        <Link
          href="/dashboard/pages/create-page"
          className="btn-primary flex items-center gap-2 py-2"
        >
          <Plus className="w-4 h-4" />
          Create New Page
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.map((page) => (
              <tr key={page.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <Image
                        src={page.image}
                        alt={page.name}
                        height={40}
                        width={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {page.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      page.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {page.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {page.expiryDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveMenu(activeMenu === page.id ? null : page.id)
                      }
                      className="p-2 hover:bg-primary-light rounded-full transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Dropdown Menu */}
                    {activeMenu === page.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={handleClickOutside}
                        />
                        <div className="absolute left-0  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                          <div className="py-1" role="menu">
                            <button
                              onClick={() => handleAction("view", page.id)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            >
                              <ExternalLink className="w-4 h-4 mr-3" />
                              View Page
                            </button>
                            <button
                              onClick={() => handleAction("edit", page.id)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            >
                              <Edit className="w-4 h-4 mr-3" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleAction("archive", page.id)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            >
                              <Archive className="w-4 h-4 mr-3" />
                              Archive
                            </button>
                            <button
                              onClick={() => handleAction("delete", page.id)}
                              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                            >
                              <Trash2 className="w-4 h-4 mr-3" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
