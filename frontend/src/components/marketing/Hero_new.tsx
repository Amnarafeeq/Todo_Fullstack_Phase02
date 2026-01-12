'use client';

import Link from 'next/link';

export function MarketingHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-300">Trusted by 10,000+ professionals worldwide</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Transform Your <span className="text-cyan-400 italic">Workflow</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The ultimate productivity platform designed to streamline your tasks, boost efficiency, and achieve more with less effort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-bold rounded-xl hover:from-cyan-300 hover:to-blue-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Get Started for Free
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-gray-600/50 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              Live Demo
            </Link>
          </div>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden bg-gray-800/50 backdrop-blur-sm">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 flex-col p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                <svg className="w-12 h-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-400 font-medium tracking-widest uppercase text-sm">Dashboard Preview</p>
            </div>
          </div>
          {/* Decorative accents */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
      </div>
    </section>
  );
}