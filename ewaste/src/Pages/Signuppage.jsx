import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/HomePageComponents/nav";
import Footer from "../Components/HomePageComponents/Footer";
import { useAuth } from '../contexts/AuthContext';
import Alert from '../Components/AuthComponents/Alert';
import "./SignupPage.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();
  const { signup, currentUser, updateUserProfile } = useAuth();
  
  useEffect(() => {
    // If user is already logged in, redirect to homepage
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    // Validate password strength
    if (formData.password.length < 6) {
      return setError('Password should be at least 6 characters');
    }
    
    setLoading(true);
    
    try {
      // Create user with email and password
      const userCredential = await signup(formData.email, formData.password);
      
      // Update user profile with display name
      if (userCredential?.user) {
        await updateUserProfile({ displayName: formData.name });
      }
      
      setMessage('Account created successfully!');
      // Navigate after a short delay to show success message
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="signup-container"
    >
      <Navbar />
      
      {/* Alert component for showing messages */}
      {(error || message) && (
        <Alert 
          error={error} 
          message={message} 
          onClose={() => {
            setError('');
            setMessage('');
          }}
        />
      )}
      
      <div className="signup-content">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="signup-box"
        >
          <h2>Create Account</h2>
          <p>Join our e-waste recycling community</p>
          
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                disabled={loading}
              />
            </div>

            <motion.button
              type="submit"
              className="signup-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default SignUpPage;
