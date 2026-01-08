import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider, ToastProvider } from '@/contexts';
import { Header } from '@/components/Header';
import { TasksProvider } from '@/contexts/TasksContext';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Todo App - Organize Your Life',
  description: 'A modern, elegant todo application to help you stay organized and productive.',
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
        bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900
        min-h-screen flex flex-col
      `}>
        {/* Wrap with providers for state management */}
        <AuthProvider>
          <ToastProvider>
            <TasksProvider>
              {/* Header - Visible on all pages */}
              <Header />

              {/* Main Content Area */}
              <main className="flex-1">
                {children}
              </main>

              {/* Footer */}
              <footer className="border-t border-gray-200/50 py-6 mt-auto bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <p className="text-center text-sm text-gray-600">
                    &copy; {new Date().getFullYear()} Todo App. All rights reserved.
                  </p>
                </div>
              </footer>
            </TasksProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
