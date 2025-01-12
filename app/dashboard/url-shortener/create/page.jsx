"use client";

import React, { useState } from "react";
import { Scissors, Check, Copy, ChevronDown } from "lucide-react";

const CreateShortUrlPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("cardify.com");

  const domains = [
    "cardify.com",
    "short.ly",
    "tiny.url",
    "bit.do",
    "shrt.link",
  ];

  const handleShorten = () => {
    // Generate shortened URL using selected domain and custom alias
    if (customAlias) {
      setShortenedUrl(`${selectedDomain}/${customAlias}`);
    } else {
      // Fallback to random string if no custom alias
      const randomString = Math.random().toString(36).substring(7);
      setShortenedUrl(`${selectedDomain}/${randomString}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAliasChange = (e) => {
    const value = e.target.value;
    if (value.length <= 24) {
      setCustomAlias(value);
    }
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center px-4 ">
      <div className="w-full max-w-2xl space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <Scissors className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-800">
            Shorten a long URL
          </h1>
        </div>

        {/* Main Input */}
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="Enter long link here"
            value={longUrl}
            required
            onChange={(e) => setLongUrl(e.target.value)}
            className="flex-1 px-6 py-4 rounded-lg border border-primary placeholder:text-primary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <button
            onClick={handleShorten}
            className="px-8 py-4 font-semibold rounded-lg bg-primary hover:bg-primary/80 active:bg-primary-dark transition-colors text-white"
          >
            Shorten
          </button>
        </div>

        {/* Custom URL Section */}
        <div className="flex items-center gap-2 bg-primary-light/50 p-2 rounded-lg">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <span className="text-gray-700">{selectedDomain}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {domains.map((domain) => (
                  <button
                    key={domain}
                    onClick={() => {
                      setSelectedDomain(domain);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {domain}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-gray-400">/</span>

          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="custom-alias"
              value={customAlias}
              onChange={handleAliasChange}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 placeholder:text-primary/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary">
              {customAlias.length}/24
            </span>
          </div>
        </div>

        {/* Result Section */}
        <div className="flex gap-2">
          <input
            type="text"
            value={shortenedUrl}
            readOnly
            placeholder="Your shortened URL will appear here"
            className="flex-1 px-6 py-4 rounded-lg bg-primary-light placeholder:text-primary-dark border-gray-200 "
          />
          <button
            onClick={handleCopy}
            className="px-8 py-4 font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-all flex items-center gap-2"
          >
            {isCopied ? (
              <>
                <Check className="w-5 h-5 text-accent" />
                <span className="text-accent">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 text-primary-dark" />
                <span className="text-primary-dark">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateShortUrlPage;
