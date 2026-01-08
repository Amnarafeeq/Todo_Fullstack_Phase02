'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';

export default function LoginPage() {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200/60 backdrop-blur-sm">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-[#42aec9] to-[#2f6978] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-[#2f6978] mb-3">Welcome Back</h1>
        <p className="text-gray-600 text-base">
          Sign in to your account to continue
        </p>
      </div>

      {/* Error Message Display */}
      {error && (
        <div
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm shadow-sm"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-[#2f6978] mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 rounded-xl border border-gray-200/70 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#42aec9]/50 focus:border-[#42aec9] transition-all duration-300 hover:border-[#42aec9]/50 shadow-sm"
            placeholder="you@example.com"
            disabled={isLoading}
            aria-describedby="email-error"
          />
          {/* Error placeholder - will show validation errors */}
          <p
            id="email-error"
            className="mt-1 text-sm text-red-600"
            aria-live="polite"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-[#2f6978]"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-[#42aec9] hover:text-[#2f6978] font-medium hover:underline transition-colors"
              tabIndex={isLoading ? -1 : 0}
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-4 rounded-xl border border-gray-200/70 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#42aec9]/50 focus:border-[#42aec9] transition-all duration-300 hover:border-[#42aec9]/50 shadow-sm"
            placeholder="Enter your password"
            disabled={isLoading}
            aria-describedby="password-error"
          />
          {/* Error placeholder - will show validation errors */}
          <p
            id="password-error"
            className="mt-1 text-sm text-red-600"
            aria-live="polite"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-[#42aec9] to-[#2f6978] text-white font-semibold rounded-xl hover:from-[#2f6978] hover:to-[#1f4a58] focus:outline-none focus:ring-2 focus:ring-[#42aec9]/50 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2.5">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Signing in...</span>
            </div>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      {/* Footer Navigation */}
      <div className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link
          href="/register"
          className="font-semibold text-[#42aec9] hover:text-[#2f6978] transition-colors hover:underline"
          tabIndex={isLoading ? -1 : 0}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
