/**
 * Alert Component
 * 
 * Displays success messages and error alerts
 * Used in authentication forms and other places that need user feedback
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Alert.css';

/**
 * Reusable alert component for showing messages and errors
 * @param {Object} props - Component props
 * @param {string} props.message - Success message to display
 * @param {string} props.error - Error message to display
 * @param {Function} props.onClose - Function to call when closing the alert
 * @returns {JSX.Element|null} Alert component or null if no messages
 */
const Alert = ({ message, error, onClose }) => {
  // Don't render if there's no message or error
  if (!message && !error) {
    return null;
  }

  // Animation variants for the alert
  const alertVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <AnimatePresence>
      {(message || error) && (
        <motion.div 
          className={`alert ${error ? 'alert-error' : 'alert-success'}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={alertVariants}
        >
          <div className="alert-content">
            <span className="alert-icon">
              {error ? 
                <i className="fas fa-exclamation-circle"></i> : 
                <i className="fas fa-check-circle"></i>
              }
            </span>
            <p>{error || message}</p>
          </div>
          
          {onClose && (
            <button className="alert-close" onClick={onClose} aria-label="Close">
              <i className="fas fa-times"></i>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert; 