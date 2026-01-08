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
    <div className="w-full max-w-md mx-auto p-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200/60 backdrop-blur-sm">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-[#42aec9] to-[#2f6978] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-[#2f6978] mb-3">Create Account</h1>
        <p className="text-gray-600 text-base">
          Get started with Todo App today
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

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-[#2f6978] mb-1"
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
            className="w-full px-4 py-4 rounded-xl border border-gray-200/70 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#42aec9]/50 focus:border-[#42aec9] transition-all duration-300 hover:border-[#42aec9]/50 shadow-sm"
            placeholder="Enter your full name"
            disabled={isLoading}
            aria-describedby="name-error"
          />
          {/* Error placeholder - will show validation errors */}
          <p
            id="name-error"
            className="mt-1 text-sm text-red-600"
            aria-live="polite"
          />
        </div>

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
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-[#2f6978] mb-1"
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
            className="w-full px-4 py-4 rounded-xl border border-gray-200/70 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#42aec9]/50 focus:border-[#42aec9] transition-all duration-300 hover:border-[#42aec9]/50 shadow-sm"
            placeholder="Create a strong password"
            disabled={isLoading}
            aria-describedby="password-hint password-error"
          />
          <p
            id="password-hint"
            className="mt-1 text-xs text-gray-500"
          >
            Must be at least 8 characters
          </p>
          {/* Error placeholder - will show validation errors */}
          <p
            id="password-error"
            className="mt-1 text-sm text-red-600"
            aria-live="polite"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold text-[#2f6978] mb-1"
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
            className="w-full px-4 py-4 rounded-xl border border-gray-200/70 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#42aec9]/50 focus:border-[#42aec9] transition-all duration-300 hover:border-[#42aec9]/50 shadow-sm"
            placeholder="Confirm your password"
            disabled={isLoading}
            aria-describedby="confirm-password-error"
          />
          {/* Error placeholder - will show validation errors */}
          <p
            id="confirm-password-error"
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
              <span>Creating account...</span>
            </div>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      {/* Footer Navigation */}
      <div className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold text-[#42aec9] hover:text-[#2f6978] transition-colors hover:underline"
          tabIndex={isLoading ? -1 : 0}
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
