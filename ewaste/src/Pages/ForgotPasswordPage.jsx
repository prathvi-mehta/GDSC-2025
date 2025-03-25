import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../Components/HomePageComponents/nav';
import Footer from '../Components/HomePageComponents/footer';
import { useAuth } from '../contexts/AuthContext';
import Alert from '../Components/AuthComponents/Alert';
import './LoginPage.css'; // Reusing styles from login page

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    
    try {
      await resetPassword(email);
      setMessage('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="login-container"
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
      
      <div className="login-content">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="login-box"
        >
          <h2>Reset Password</h2>
          <p>Enter your email to receive a password reset link</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <motion.button
              type="submit"
              className="login-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Reset Password'}
            </motion.button>
          </form>

          <div className="login-footer">
            <p>
              <Link to="/login">Back to Login</Link>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default ForgotPasswordPage; 
