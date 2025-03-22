/**
 * Firebase Authentication Service
 * 
 * Provides functions for authentication operations:
 * - User registration (signup)
 * - User login
 * - User logout
 * - Password reset
 * - User profile updates
 * - Auth state monitoring
 */

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./firebase.config";
import { useState, useEffect } from "react";

/**
 * Register a new user with email and password
 * @param {string} email User email
 * @param {string} password User password
 * @returns {Promise<UserCredential>} Firebase user credential
 */
export const registerUser = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Registration error:", error);
    throw translateAuthError(error, "registration");
  }
};

/**
 * Log in an existing user
 * @param {string} email User email
 * @param {string} password User password
 * @returns {Promise<UserCredential>} Firebase user credential
 */
export const loginUser = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login error:", error);
    throw translateAuthError(error, "login");
  }
};

/**
 * Log out the current user
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Failed to log out. Please try again.");
  }
};

/**
 * Send password reset email
 * @param {string} email User email
 * @returns {Promise<void>}
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error("Password reset error:", error);
    throw translateAuthError(error, "password-reset");
  }
};

/**
 * Update the current user's profile
 * @param {Object} profileData Profile data (displayName, photoURL)
 * @returns {Promise<void>}
 */
export const updateUserProfile = async (profileData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user found");
    
    await updateProfile(user, profileData);
    return true;
  } catch (error) {
    console.error("Profile update error:", error);
    throw new Error("Failed to update profile. Please try again.");
  }
};

/**
 * Hook to monitor authentication state
 * @returns {Object} Auth state object with currentUser and loading properties
 */
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, 
      (user) => {
        setCurrentUser(user);
        setLoading(false);
      },
      (error) => {
        console.error("Auth state change error:", error);
        setLoading(false);
      }
    );
    
    return unsubscribe;
  }, []);
  
  return { currentUser, loading };
};

/**
 * Translate Firebase auth errors to user-friendly messages
 * @param {Error} error Firebase auth error
 * @param {string} context Context of the error (login, registration, etc.)
 * @returns {Error} Error with user-friendly message
 */
function translateAuthError(error, context) {
  let message = "An error occurred. Please try again.";
  
  // Common error codes
  switch (error.code) {
    case "auth/invalid-email":
      message = "Invalid email address format.";
      break;
    case "auth/user-disabled":
      message = "This account has been disabled.";
      break;
    case "auth/network-request-failed":
      message = "Network error. Please check your internet connection.";
      break;
    case "auth/internal-error":
      message = "Internal server error. Please try again later.";
      break;
    case "auth/invalid-credential":
      message = "Invalid credentials. Please check your email and password.";
      break;
    case "auth/invalid-api-key":
      message = "API key is invalid. Please contact support.";
      break;
  }
  
  // Context-specific error codes
  if (context === "registration") {
    switch (error.code) {
      case "auth/email-already-in-use":
        message = "This email is already registered. Please use a different email.";
        break;
      case "auth/weak-password":
        message = "Password is too weak. Use at least 6 characters.";
        break;
      case "auth/operation-not-allowed":
        message = "Email/password accounts are not enabled for this project.";
        break;
    }
  } else if (context === "login") {
    switch (error.code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        message = "Invalid email or password.";
        break;
      case "auth/too-many-requests":
        message = "Too many unsuccessful login attempts. Please try again later.";
        break;
    }
  } else if (context === "password-reset") {
    switch (error.code) {
      case "auth/user-not-found":
        message = "No account found with this email.";
        break;
    }
  }
  
  return new Error(message);
} 