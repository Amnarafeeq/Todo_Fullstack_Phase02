'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import Link from 'next/link';

export default function LandingPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (mounted && !loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [mounted, loading, isAuthenticated, router]);

  // If loading or authenticated (and mounted), show a minimal loader or nothing to prevent content flicker
  // The middleware handle server-side redirect, so this is the fallback
  if (!mounted || (loading && !isAuthenticated) || isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#42aec9] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#42aec9] to-[#2f6978] rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xl font-bold text-[#2f6978]">Todo<span className="text-[#42aec9]">Pro</span></span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-[#2f6978] hover:text-[#42aec9] font-medium transition-colors">
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 bg-gradient-to-r from-[#42aec9] to-[#2f6978] text-white font-medium rounded-lg hover:from-[#2f6978] hover:to-[#1f4a58] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-[#2f6978] to-[#42aec9] bg-clip-text text-transparent mb-6">
              Boost Your Productivity
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform chaos into clarity with our intelligent task management system.
              Focus on what matters and achieve more every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-[#42aec9] to-[#2f6978] text-white font-bold rounded-xl hover:from-[#2f6978] hover:to-[#1f4a58] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
              >
                Start Free Trial
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-white text-[#2f6978] font-bold rounded-xl border-2 border-[#42aec9]/30 hover:bg-[#42aec9]/10 transition-all duration-300 hover:-translate-y-1 text-lg shadow-sm hover:shadow-md"
              >
                Live Demo
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 lg:mt-24 relative max-w-5xl mx-auto">
            <div className="rounded-3xl border border-gray-200/70 shadow-2xl overflow-hidden bg-white aspect-video">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-white flex-col p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#42aec9]/20 to-[#2f6978]/20 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <svg className="w-12 h-12 text-[#2f6978]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Preview</h3>
                <p className="text-gray-600 max-w-md">Experience our beautiful, intuitive interface designed for maximum productivity</p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#42aec9]/10 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#2f6978]/10 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#2f6978] mb-4">
              Powerful Features for <span className="text-[#42aec9]">Maximum Productivity</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to stay organized, focused, and ahead of your goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#42aec9]/20 to-[#2f6978]/20 rounded-2xl flex items-center justify-center mb-6 text-[#2f6978] shadow-inner group-hover:shadow-lg">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#2f6978] mb-3">Smart Task Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Intuitive task creation with priorities, categories, and deadlines.
                Organize your workload effortlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#42aec9]/20 to-[#2f6978]/20 rounded-2xl flex items-center justify-center mb-6 text-[#2f6978] shadow-inner group-hover:shadow-lg">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#2f6978] mb-3">Progress Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Visual analytics and productivity reports to track your progress
                and identify improvement areas.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#42aec9]/20 to-[#2f6978]/20 rounded-2xl flex items-center justify-center mb-6 text-[#2f6978] shadow-inner group-hover:shadow-lg">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#2f6978] mb-3">Productivity Boost</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced focus modes and time management tools to help you
                accomplish more in less time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#2f6978] mb-4">
              How It <span className="text-[#42aec9]">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and transform your productivity forever
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#42aec9]/30 to-[#2f6978]/30 -z-10 transform -translate-y-1/2"></div>

            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#42aec9] to-[#2f6978] rounded-full flex items-center justify-center text-white text-3xl font-black mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-bold text-[#2f6978] mb-4 group-hover:text-[#42aec9] transition-colors">
                Create Account
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                Sign up in seconds and get immediate access to your personalized productivity dashboard.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#42aec9] to-[#2f6978] rounded-full flex items-center justify-center text-white text-3xl font-black mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-bold text-[#2f6978] mb-4 group-hover:text-[#42aec9] transition-colors">
                Add Your Tasks
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                Organize your work and personal tasks with smart categorization and priority settings.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#42aec9] to-[#2f6978] rounded-full flex items-center justify-center text-white text-3xl font-black mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-bold text-[#2f6978] mb-4 group-hover:text-[#42aec9] transition-colors">
                Achieve More
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                Stay focused, track progress, and accomplish your goals with our intuitive tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-[#2f6978] to-[#1f4a58] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">
                Join thousands who have <span className="text-[#42aec9] underline decoration-4 underline-offset-8">transformed</span> their productivity
              </h2>
              <p className="text-xl text-gray-200 mb-12">
                Experience the difference that intelligent task management makes in your daily routine.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#42aec9] flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Increased Focus</h4>
                    <p className="text-gray-300">Minimize distractions with our clean, focused interface.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#42aec9] flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Better Organization</h4>
                    <p className="text-gray-300">Keep all your tasks in one place with smart categorization.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#42aec9] flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Time Savings</h4>
                    <p className="text-gray-300">Reduce time spent organizing tasks by up to 60%.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-[#42aec9]/20 rounded-3xl rotate-6 absolute inset-0 -z-10 opacity-30 blur-3xl"></div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-12 rounded-3xl shadow-2xl relative">
                <div className="space-y-6">
                  <div className="h-6 w-full bg-white/20 rounded-lg animate-pulse"></div>
                  <div className="h-6 w-3/4 bg-white/20 rounded-lg animate-pulse delay-75"></div>
                  <div className="h-6 w-full bg-white/20 rounded-lg animate-pulse delay-150"></div>
                  <div className="h-6 w-2/3 bg-white/20 rounded-lg animate-pulse delay-300"></div>
                  <div className="pt-8 flex justify-center">
                    <div className="w-24 h-24 rounded-full border-4 border-[#42aec9] flex items-center justify-center animate-bounce">
                      <svg className="w-12 h-12 text-[#42aec9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#2f6978] mb-6">
            Ready to Transform Your <span className="text-[#42aec9]">Productivity?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who have revolutionized their workflow with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-[#42aec9] to-[#2f6978] text-white font-bold rounded-xl hover:from-[#2f6978] hover:to-[#1f4a58] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
            >
              Start Your Free Trial
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-white text-[#2f6978] font-bold rounded-xl border-2 border-[#42aec9]/30 hover:bg-[#42aec9]/10 transition-all duration-300 hover:-translate-y-1 text-lg shadow-sm hover:shadow-md"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#42aec9] to-[#2f6978] rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-2xl font-black text-[#2f6978]">Todo<span className="text-[#42aec9]">Pro</span></span>
            </div>

            <nav className="flex gap-8 text-sm font-bold text-gray-600 uppercase tracking-widest">
              <Link href="/" className="hover:text-[#42aec9] transition-colors">Home</Link>
              <Link href="/login" className="hover:text-[#42aec9] transition-colors">Login</Link>
              <Link href="/register" className="hover:text-[#42aec9] transition-colors">Register</Link>
            </nav>

            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#42aec9] hover:text-white transition-all shadow-sm hover:shadow-md">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#42aec9] hover:text-white transition-all shadow-sm hover:shadow-md">
                <span className="sr-only">Github</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </button>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-500 font-medium tracking-tight">
              © {new Date().getFullYear()} Todo<span className="text-[#42aec9]">Pro</span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}