/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#E0E7FF',  // Soft lavender
          DEFAULT: '#818CF8', // Bright indigo
          dark: '#6366F1',   // Deep indigo
        },
        secondary: {
          light: '#FDE7F3',  // Light pink
          DEFAULT: '#EC4899', // Vibrant pink
          dark: '#DB2777',   // Deep pink
        },
        accent: {
          light: '#ECFDF5',  // Mint green
          DEFAULT: '#10B981', // Emerald
          dark: '#059669',   // Deep emerald
        },
        neutral: {
          50: '#F8FAFC',    // Lightest gray
          100: '#F1F5F9',   // Very light gray
          200: '#E2E8F0',   // Light gray
          300: '#CBD5E1',   // Medium light gray
          400: '#94A3B8',   // Medium gray
          500: '#64748B',   // Gray
          600: '#475569',   // Dark gray
          700: '#334155',   // Darker gray
          800: '#1E293B',   // Almost black
        },
        background: '#F8FAFC',  // Very light grayish blue
        surface: '#FFFFFF',
        text: {
          primary: '#334155',   // Dark slate
          secondary: '#64748B'  // Medium slate
        }
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'], // Changed from Inter to Plus Jakarta Sans
      },
    },
  },
  plugins: [],
};
