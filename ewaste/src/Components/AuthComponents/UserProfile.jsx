import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AuthStyles.css';
import './UserProfile.css';

/**
 * User profile component with dropdown menu
 * @returns {JSX.Element} The user profile component
 */
const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Get first letter of user's name or email for avatar
  const getInitial = () => {
    if (!currentUser) return '';
    
    if (currentUser.displayName) {
      return currentUser.displayName.charAt(0).toUpperCase();
    }
    
    return currentUser.email.charAt(0).toUpperCase();
  };

  // Handle clicking outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // If not logged in, show login and signup links
  if (!currentUser) {
    return (
      <div className="auth-buttons-container">
        <Link to="/login" className="nav-link login-link">
          Login
        </Link>
        <Link to="/signup" className="nav-link signup-link">
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="user-profile" ref={menuRef}>
      <div 
        className="user-avatar" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User profile menu"
      >
        {getInitial()}
      </div>
      
      {isOpen && (
        <div className="user-menu">
          <div className="user-menu-item">
            <i className="fas fa-user"></i>
            <span>{currentUser.displayName || currentUser.email}</span>
          </div>
          
          <Link to="/profile" className="user-menu-item" onClick={() => setIsOpen(false)}>
            <i className="fas fa-cog"></i>
            <span>Profile Settings</span>
          </Link>
          
          <Link to="/my-collections" className="user-menu-item" onClick={() => setIsOpen(false)}>
            <i className="fas fa-box"></i>
            <span>My Collections</span>
          </Link>
          
          <div className="user-menu-item logout" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile; 