// components/dashboard/Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  QrCode,
  FileText,
  BarChart2,
  UserCircle,
  Building2,
  CreditCard,
  X,
} from "lucide-react";

const sidebarLinks = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "QR Codes",
    icon: QrCode,
    href: "/dashboard/qrcode",
  },
  {
    label: "Pages",
    icon: FileText,
    href: "/dashboard/pages",
  },
  {
    label: "Analytics",
    icon: BarChart2,
    href: "/dashboard/analytics",
  },
  {
    label: "Profile",
    icon: UserCircle,
    href: "/dashboard/profile",
  },
  {
    label: "Organization",
    icon: Building2,
    href: "/dashboard/organization",
  },
  {
    label: "Billing",
    icon: CreditCard,
    href: "/dashboard/billing",
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const isLinkActive = (href) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/dashboard/overview";
    }
    return pathname === href;
  };

  return (
    <>
      {/* Backdrop for mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[280px] bg-white border-r border-gray-200 
                   lg:static lg:translate-x-0
                   transform transition-transform duration-200 ease-in-out
                   ${
                     isOpen
                       ? "translate-x-0"
                       : "-translate-x-full lg:translate-x-0"
                   }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and close button */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
            <Link href="/dashboard" className="text-xl font-bold text-primary">
              Cardify
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-primary-light rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 overflow-y-auto">
            <ul className="space-y-2">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = isLinkActive(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-primary-light hover:text-primary"
                      }`}
                      onClick={() => {
                        // Close sidebar on mobile when a link is clicked
                        if (window.innerWidth < 1024) {
                          onClose();
                        }
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
