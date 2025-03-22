/**
 * Authentication Context
 * 
 * Provides authentication state and functions to the entire application
 * Wraps the application to make auth data accessible to all components
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  resetPassword as resetPasswordService,
  updateUserProfile as updateProfileService,
  useAuth as useFirebaseAuth 
} from '../firebase/auth.service';
import { auth } from '../firebase/firebase.config';

// Log auth state for debugging
console.log('AuthContext: Auth object initialized', { auth });

// Create the auth context
const AuthContext = createContext(null);

/**
 * Authentication Provider Component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Provider component
 */
export const AuthProvider = ({ children }) => {
  // Get auth state from custom hook
  const { currentUser, loading: authLoading } = useFirebaseAuth();
  
  // Local state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // Clear notifications after delay
  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        setError(null);
        setMessage('');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error, message]);

  /**
   * Sign up a new user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - Promise that resolves with user credentials
   */
  const signup = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await registerUser(email, password);
      setMessage('Account created successfully!');
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Log in an existing user
   * @param {string} email - User email
   * @param {string} password - User password
   */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await loginUser(email, password);
      setMessage('Login successful!');
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Log out the current user
   */
  const logout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await logoutUser();
      setMessage('Logged out successfully');
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send password reset email
   * @param {string} email - User email
   */
  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      await resetPasswordService(email);
      setMessage('Password reset email sent. Please check your inbox.');
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update user profile data
   * @param {Object} profileData - Profile data to update
   */
  const updateUserProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    
    try {
      await updateProfileService(profileData);
      setMessage('Profile updated successfully');
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Value object for context provider
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    loading: loading || authLoading,
    error,
    message,
    clearError: () => setError(null),
    clearMessage: () => setMessage('')
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook for using auth context
 * @returns {Object} Auth context values
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 