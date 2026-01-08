/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New color palette
        primary: {
          50: '#f0f7f9',
          100: '#e0eff3',
          200: '#c0e0e8',
          300: '#9fd1dd',
          400: '#7fc2d2',
          500: '#2f6978', // New primary color
          600: '#2a5d6b',
          700: '#25515e',
          800: '#1f4551',
          900: '#1a3944',
        },
        secondary: {
          50: '#eef7fb',
          100: '#ddf0f7',
          200: '#b6e0ee',
          300: '#8fd0e5',
          400: '#69c1dc',
          500: '#42aec9', // New secondary color
          600: '#3a9bb5',
          700: '#3288a1',
          800: '#2a758d',
          900: '#226279',
        },
        // Neutral grays for text and backgrounds
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'soft': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'medium': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}
