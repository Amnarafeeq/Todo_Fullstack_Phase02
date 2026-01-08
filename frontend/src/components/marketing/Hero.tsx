'use client';

import Link from 'next/link';

export function MarketingHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#2f6978] mb-6">
            Master Your Day, <span className="text-[#42aec9] italic">One Task</span> at a Time.
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The ultimate full-stack todo application designed to help you stay productive,
            organized, and focused on what matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-[#42aec9] to-[#2f6978] text-white font-bold rounded-xl hover:from-[#2f6978] hover:to-[#1f4a58] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Get Started for Free
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-white text-[#2f6978] font-bold rounded-xl border-2 border-[#42aec9]/30 hover:bg-[#42aec9] hover:text-white transition-all hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="rounded-3xl border border-gray-200/70 shadow-2xl overflow-hidden bg-white aspect-[16/10] md:aspect-[21/9]">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-white flex-col p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#42aec9]/20 to-[#2f6978]/20 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                <svg className="w-12 h-12 text-[#2f6978]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium tracking-widest uppercase text-sm">Dashboard Preview</p>
            </div>
          </div>
          {/* Decorative accents */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#42aec9]/10 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#2f6978]/10 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
      </div>
    </section>
  );
}
