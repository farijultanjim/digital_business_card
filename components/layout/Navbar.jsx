'use client'

import Link from "next/link";
import { useState } from "react"; // We'll use this temporarily for demo
import { User } from "lucide-react"; // Import User icon from lucide-react

const navigationLinks = [
  {
    name: "Features",
    href: "/features",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "FAQ",
    href: "/faq",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const Navbar = () => {
  // This is a temporary state for demonstration
  // In a real app, you'd get this from your auth context/provider
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container-desktop flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          Cardify
        </Link>

        {/* Nav Links and Login/Dashboard Button */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-text-secondary hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Conditional rendering based on auth state */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="btn-primary">
                Dashboard
              </Link>
              <Link href="/profile" className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <User className="w-6 h-6 text-primary cursor-pointer" />
              </Link>
            </div>
          ) : (
            <Link href="/login" className="btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
