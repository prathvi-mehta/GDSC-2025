/**
 * Firebase Configuration
 * 
 * This file initializes Firebase and exports the necessary services
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgU--rN28d-581Iyg9hKBOYzFcfOaLxhA",
  authDomain: "fir-452812.firebaseapp.com",
  projectId: "firebase-452812",
  storageBucket: "firebase-452812.firebasestorage.app",
  messagingSenderId: "97143471138",
  appId: "1:97143471138:web:85ef0068c4f932cb0a5e7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export initialized services
export { auth };
export default app;