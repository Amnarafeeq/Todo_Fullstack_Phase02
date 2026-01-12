import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientOnlyProviders from '@/components/ClientOnlyProviders';
import { Header } from '@/components/Header';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Metadata for SEO
export const metadata: Metadata = {
  title: 'TaskFlow - Organize Your Life',
  description: 'A modern, elegant task management application to help you stay organized and productive.',
  keywords: ['todo', 'tasks', 'productivity', 'organization'],
};

// Root Layout Component
// Wraps the entire application with providers and global layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`
        ${inter.className}
        bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100
        min-h-screen flex flex-col
      `}>
        {/* Wrap with client-only providers for state management */}
        <ClientOnlyProviders>
          {/* Header - Visible on all pages */}
          <Header />

          {/* Main Content Area */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-gray-700/50 py-6 mt-auto bg-gray-900/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
              </p>
            </div>
          </footer>
        </ClientOnlyProviders>
      </body>
    </html>
  );
}