'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import AppProviders from '@/components/AppProviders';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Root Layout Component
// Wraps the entire application with providers and global layout
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`
        ${inter.className}
        bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100
        min-h-screen flex flex-col
      `}>
        <AppProviders>
          <main className="flex-1">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}