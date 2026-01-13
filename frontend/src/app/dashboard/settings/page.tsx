'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks';
import { authUtils } from '@/lib/auth';
import { AuthProvider, ToastProvider } from '@/contexts';

function SettingsPageContent() {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // In a real app, you would send this to the API to update user details
      // For now, we'll just simulate the update
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to update profile. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      // In a real app, you would send this to the API to delete the account
      // For now, we'll just logout and clear local storage
      authUtils.removeToken();
      localStorage.removeItem('user');
      window.location.href = '/login';
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to delete account. Please try again.'
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Settings</h1>
          <p className="mt-2 text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            {message.text}
          </div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden">
          <div className="p-6 border-b border-gray-700/50">
            <h2 className="text-lg font-medium bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Profile Information</h2>
            <p className="mt-1 text-sm text-gray-400">
              Update your account details
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-cyan-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isEditing
                      ? 'border-gray-600/50 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-white placeholder-gray-400'
                      : 'border-gray-700/50 bg-gray-800/50 text-gray-300'
                  }`}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-cyan-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isEditing
                      ? 'border-gray-600/50 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-white placeholder-gray-400'
                      : 'border-gray-700/50 bg-gray-800/50 text-gray-300'
                  }`}
                />
              </div>

              {isEditing && (
                <>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-cyan-400 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-600/50 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-white placeholder-gray-400"
                      placeholder="Leave blank to keep current password"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-cyan-400 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-600/50 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-white placeholder-gray-400"
                      placeholder="Re-enter new password"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="mt-8 flex items-center justify-end gap-3">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 border border-gray-600/50 rounded-lg text-cyan-400 bg-gray-700/50 hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                        newPassword: '',
                        confirmPassword: '',
                      });
                      setMessage(null);
                    }}
                    className="px-4 py-2 border border-gray-600/50 rounded-lg text-gray-300 bg-gray-700/50 hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-transparent transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>

        <div className="mt-8 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden">
          <div className="p-6 border-b border-gray-700/50">
            <h2 className="text-lg font-medium bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Account Security</h2>
            <p className="mt-1 text-sm text-gray-400">
              Manage your account security settings
            </p>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-cyan-400">Two-Factor Authentication</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <button
                type="button"
                className="px-4 py-2 border border-gray-600/50 rounded-lg text-cyan-400 bg-gray-700/50 hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-colors"
                disabled
              >
                Setup
              </button>
            </div>
          </div>

          <div className="p-6 border-t border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-cyan-400">Delete Account</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Permanently remove your account and all data
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <AuthProvider>
      <ToastProvider>
        <SettingsPageContent />
      </ToastProvider>
    </AuthProvider>
  );
}