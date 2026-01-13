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
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/25">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Task<span className="text-cyan-400">Flow</span></span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-200 hover:text-cyan-400 font-medium transition-colors duration-300">
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-bold rounded-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 lg:pt-32 lg:pb-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">Trusted by 10,000+ professionals worldwide</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6 leading-tight">
              Transform Your <span className="text-cyan-400 italic">Workflow</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              The ultimate productivity platform designed to streamline your tasks, boost efficiency, and achieve more with less effort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-bold rounded-xl hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:-translate-y-1 text-lg"
              >
                Start Free Trial
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-gray-600/50 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 hover:-translate-y-1 text-lg shadow-lg hover:shadow-xl"
              >
                Live Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Powerful Dashboard</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Experience our intuitive interface designed for maximum productivity</p>
          </div>

          <div className="rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden bg-gray-800/50 backdrop-blur-sm">
            {/* Simulated Dashboard Header */}
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 flex justify-between items-center border-b border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-white font-bold">TaskFlow</span>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-5 5v-5zM9 7H4l5-5v5z" />
                  </svg>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full border border-cyan-400/30"></div>
              </div>
            </div>

            {/* Simulated Dashboard Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Stats Cards */}
                <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Total Tasks</p>
                      <p className="text-lg font-bold text-white">24</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400/20 to-orange-500/20">
                      <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Pending</p>
                      <p className="text-lg font-bold text-white">8</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-400/20 to-emerald-500/20">
                      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Completed</p>
                      <p className="text-lg font-bold text-white">16</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-red-400/20 to-pink-500/20">
                      <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">High Priority</p>
                      <p className="text-lg font-bold text-white">5</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Task List */}
              <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl border border-gray-600/50 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-white text-sm">Recent Tasks</h3>
                  <span className="text-xs text-cyan-400">View all</span>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-600/30 hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 ${item % 2 === 0 ? 'border-cyan-400 bg-cyan-400/20' : 'border-gray-500'} flex items-center justify-center`}>
                          {item % 2 === 0 && (
                            <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-white truncate max-w-[140px]">
                          {item === 1 ? 'Complete project proposal' :
                           item === 2 ? 'Team meeting preparation' :
                           item === 3 ? 'Review quarterly reports' :
                           'Update documentation'}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item === 1 ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        item === 2 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        item === 3 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {item === 1 ? 'high' : item === 2 ? 'medium' : item === 3 ? 'high' : 'low'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Powerful Features for <span className="text-cyan-400">Maximum Productivity</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to stay organized, focused, and ahead of your goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group-hover:border-cyan-400/30">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 shadow-lg group-hover:shadow-2xl group-hover:shadow-cyan-500/20 transition-all duration-300">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Smart Task Management</h3>
                <p className="text-gray-400 leading-relaxed">
                  Intuitive task creation with priorities, categories, and deadlines. Organize your workload effortlessly with AI-powered suggestions.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group-hover:border-blue-400/30">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-300">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Advanced Analytics</h3>
                <p className="text-gray-400 leading-relaxed">
                  Visual analytics and productivity reports to track your progress and identify improvement areas with actionable insights.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group-hover:border-purple-400/30">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-300">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">AI-Powered Insights</h3>
                <p className="text-gray-400 leading-relaxed">
                  Intelligent recommendations and automation to help you prioritize tasks and optimize your workflow for peak performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Loved by <span className="text-cyan-400">Professionals</span>
            </h2>
            <p className="text-xl text-gray-400">Join thousands who have transformed their productivity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">John Doe</h4>
                  <p className="text-sm text-gray-400">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"TaskFlow has revolutionized how our team manages projects. We've increased our productivity by 40%!"</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">AS</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">Alice Smith</h4>
                  <p className="text-sm text-gray-400">CEO, TechCorp</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"The analytics dashboard gives us insights we never had before. Game-changer for our business."</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">MR</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">Mike Roberts</h4>
                  <p className="text-sm text-gray-400">Freelancer</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"As a freelancer, TaskFlow helps me manage multiple clients efficiently. Worth every penny!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Ready to Transform Your <span className="text-cyan-400">Workflow?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who have revolutionized their productivity with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-bold rounded-xl hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:-translate-y-1 text-lg"
            >
              Start Your Free Trial
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-gray-600/50 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 hover:-translate-y-1 text-lg shadow-lg hover:shadow-xl"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}