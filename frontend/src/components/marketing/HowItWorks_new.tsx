'use client';

const steps = [
  {
    number: '01',
    title: 'Create Account',
    description: 'Sign up in seconds and get immediate access to your personal task sanctuary.',
  },
  {
    number: '02',
    title: 'Add Your Tasks',
    description: 'Capture everything from quick reminders to massive long-term projects easily.',
  },
  {
    number: '03',
    title: 'Stay on Track',
    description: 'Mark items as complete and watch your progress grow as you take control of your time.',
  },
];

export function MarketingWorkflow() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">How it Works</h2>
          <p className="text-xl text-gray-400">
            A simple, 3-step process to transform your productivity and organize your day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector line (Desktop only) */}
          <div className="hidden md:block absolute top-[15%] left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 -z-10"></div>

          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-3xl font-black mb-8 shadow-lg transform group-hover:scale-110 transition-transform">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 group-hover:text-cyan-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-400 font-medium leading-[1.8] max-w-sm mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}