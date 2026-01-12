'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import { useToast } from '@/contexts';

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register({ name, email, password });
      showToast('Account created successfully!', 'success');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">Create Account</h1>
          <p className="text-gray-400 text-base">
            Get started with TaskFlow today
          </p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div
            className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm shadow-sm"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-cyan-400 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 hover:border-cyan-500/50 shadow-sm text-white placeholder-gray-400"
              placeholder="Enter your full name"
              disabled={isLoading}
              aria-describedby="name-error"
            />
            {/* Error placeholder - will show validation errors */}
            <p
              id="name-error"
              className="mt-1 text-sm text-red-400"
              aria-live="polite"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-cyan-400 mb-1"
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
              className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 hover:border-cyan-500/50 shadow-sm text-white placeholder-gray-400"
              placeholder="you@example.com"
              disabled={isLoading}
              aria-describedby="email-error"
            />
            {/* Error placeholder - will show validation errors */}
            <p
              id="email-error"
              className="mt-1 text-sm text-red-400"
              aria-live="polite"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-cyan-400 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 hover:border-cyan-500/50 shadow-sm text-white placeholder-gray-400"
              placeholder="Create a strong password"
              disabled={isLoading}
              aria-describedby="password-hint password-error"
            />
            <p
              id="password-hint"
              className="mt-1 text-xs text-gray-400"
            >
              Must be at least 8 characters
            </p>
            {/* Error placeholder - will show validation errors */}
            <p
              id="password-error"
              className="mt-1 text-sm text-red-400"
              aria-live="polite"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-cyan-400 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 hover:border-cyan-500/50 shadow-sm text-white placeholder-gray-400"
              placeholder="Confirm your password"
              disabled={isLoading}
              aria-describedby="confirm-password-error"
            />
            {/* Error placeholder - will show validation errors */}
            <p
              id="confirm-password-error"
              className="mt-1 text-sm text-red-400"
              aria-live="polite"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2.5">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Creating account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors hover:underline"
            tabIndex={isLoading ? -1 : 0}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}