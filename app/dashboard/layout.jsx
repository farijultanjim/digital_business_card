// app/dashboard/layout.jsx
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header - hidden on desktop */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 lg:hidden">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="text-xl font-bold text-primary">Cardify</div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-primary-light focus:outline-none"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex min-h-screen lg:h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container-desktop py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
