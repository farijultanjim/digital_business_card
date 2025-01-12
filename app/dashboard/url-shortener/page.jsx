'use client'

import React, { useState } from "react";
import { Copy, ExternalLink, Plus, CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const sampleLinks = [
  {
    originalUrl:
      "https://www.example.com/very/long/url/that/needs/shortening/1",
    shortUrl: "cardify.com/abc123",
    clicks: 145,
    createdAt: "2024-01-05",
  },
  {
    originalUrl: "https://www.example.com/another/very/long/url/example/2",
    shortUrl: "cardify.com/def456",
    clicks: 89,
    createdAt: "2024-01-08",
  },
  {
    originalUrl: "https://www.example.com/third/example/url/3",
    shortUrl: "cardify.com/ghi789",
    clicks: 234,
    createdAt: "2024-01-10",
  },
  {
    originalUrl:
      "https://www.example.com/very/long/url/that/needs/shortening/1",
    shortUrl: "cardify.com/abc123",
    clicks: 145,
    createdAt: "2024-01-05",
  },
  
];

const UrlShortenerDesign1 = () => {
  const router = useRouter();
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(text);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section with Search */}
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">URL Shortener</h1>
          <button
            onClick={() => router.push("/dashboard/url-shortener/create")}
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create Short Link</span>
          </button>
        </div>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 gap-4">
        {sampleLinks.map((link, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col space-y-2">
              {/* Short URL and Copy Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-primary">
                    {link.shortUrl}
                  </span>
                  <button
                    onClick={() => handleCopy(link.shortUrl)}
                    className={`p-2 rounded-lg transition-all ${
                      copiedId === link.shortUrl
                        ? "bg-green-100 text-green-600"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    {copiedId === link.shortUrl ? (
                      <CheckCheck className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-500">
                    Created: {link.createdAt}
                  </div>
                  <div className="px-4 py-1 bg-primary-light text-primary-dark rounded-full text-sm font-medium">
                    {link.clicks} clicks
                  </div>
                </div>
              </div>

              {/* Original URL */}
              <div className="flex items-center justify-between gap-4 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 flex-1">
                  <span className="truncate text-gray-600 text-sm">
                    {link.originalUrl}
                  </span>
                </div>
                <a
                  href={link.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-gray-600" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sampleLinks.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <div className="text-gray-500 mb-4">No shortened URLs yet</div>
          <button
            onClick={() => router.push("/create-short-link")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-light text-primary-dark hover:bg-primary/25 hover:text-primary rounded-lg transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create your first short link</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlShortenerDesign1;
