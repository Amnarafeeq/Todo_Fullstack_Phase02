'use client';

const benefits = [
  {
    title: 'Productivity Boost',
    text: 'Spend less time planning and more time doing. Our optimized UI flow eliminates distractions.',
  },
  {
    title: 'Device Sync',
    text: 'Accsess your tasks anywhere, anytime. Your data is synced in real-time across all your devices.',
  },
  {
    title: 'Absolute Focus',
    text: 'Minimalist interface designed specifically to reduce cognitive load and help you focus.',
  },
];

export function MarketingBenefits() {
  return (
    <section className="bg-gradient-to-br from-[#2f6978] to-[#1f4a58] py-24 text-white overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Built for <span className="text-[#42aec9] underline decoration-4 underline-offset-8">modern</span> teams and individuals.
            </h2>
            <p className="text-xl text-gray-200 mb-12">
              Whether you are a solo developer or managing a growing team,
              our todo application provides the structure you need without the bloat.
            </p>
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#42aec9] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                    <p className="text-gray-300 font-medium leading-relaxed">{benefit.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-[#42aec9]/20 rounded-3xl rotate-6 absolute inset-0 -z-10 opacity-50 blur-3xl"></div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-12 rounded-3xl shadow-2xl relative">
              <div className="space-y-4">
                <div className="h-12 w-full bg-white/10 rounded-xl animate-pulse"></div>
                <div className="h-12 w-3/4 bg-white/10 rounded-xl animate-pulse delay-75"></div>
                <div className="h-12 w-full bg-white/10 rounded-xl animate-pulse delay-150"></div>
                <div className="pt-8 flex justify-center">
                   <div className="w-20 h-20 rounded-full border-4 border-[#42aec9] flex items-center justify-center animate-bounce">
                      <svg className="w-10 h-10 text-[#42aec9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
