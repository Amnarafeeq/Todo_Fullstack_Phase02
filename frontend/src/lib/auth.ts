import Cookies from 'js-cookie';

/**
 * Auth utilities for token management
 */

const TOKEN_KEY = 'auth_token';

export const authUtils = {
  /**
   * Get JWT token
   */
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return Cookies.get(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Set JWT token
   */
  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
    Cookies.set(TOKEN_KEY, token, { expires: 7, path: '/' }); // 7 days
  },

  /**
   * Remove JWT token
   */
  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    Cookies.remove(TOKEN_KEY, { path: '/' });
  },

  /**
   * Check if user is authenticated (has token)
   */
  isAuthenticated: (): boolean => {
    return !!authUtils.getToken();
  }
};
