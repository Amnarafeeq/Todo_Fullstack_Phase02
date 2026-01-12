'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/Sidebar';

/**
 * Dashboard Layout
 *
 * Wraps all dashboard pages with sidebar navigation and responsive design.
 * Provides a professional SaaS-style layout with:
 * - Collapsible sidebar for navigation
 * - Mobile-responsive hamburger menu
 * - Consistent header and content area
 */
interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pathname={pathname}
      />

      {/* Main Content Wrapper */}
      <div className="lg:pl-64">
        {/* Mobile Sidebar Toggle - Positioned for accessibility when global header is present */}
        <div className="lg:hidden p-4 flex items-center bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 sticky top-16 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            aria-label="Open navigation menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>Navigation Menu</span>
          </button>
        </div>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}