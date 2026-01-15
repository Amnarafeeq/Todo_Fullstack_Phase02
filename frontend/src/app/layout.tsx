import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientOnlyProviders from '@/components/ClientOnlyProviders';

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
        <ClientOnlyProviders>
          <main className="flex-1">
            {children}
          </main>
        </ClientOnlyProviders>
      </body>
    </html>
  );
}