import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBarcode, FaMapMarkerAlt, FaBook, FaCalendarAlt, FaGift } from 'react-icons/fa';
import UserProfile from '../AuthComponents/UserProfile';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServices = () => {
    setShowServices(!showServices);
  };

  const serviceItems = [
    { path: '/schedule-pickup', icon: <FaCalendarAlt />, text: 'Schedule Pickup' },
    { path: '/drop-points', icon: <FaMapMarkerAlt />, text: 'Drop Points' },
    { path: '/track-device', icon: <FaBarcode />, text: 'Track Device' },
    { path: '/rewards', icon: <FaGift />, text: 'Rewards' },
    { path: '/instructions', icon: <FaBook />, text: 'Instructions' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <i className="fas fa-recycle logo-icon"></i>
          <span className="logo-text">E-Waste</span>
        </Link>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <div className="services-dropdown" onClick={toggleServices}>
            <div className="services-link">
              <i className="fas fa-cog"></i>
              <span>Services</span>
              <i className={`fas fa-chevron-${showServices ? 'up' : 'down'}`}></i>
            </div>
            <div className={`services-menu ${showServices ? 'active' : ''}`}>
              {serviceItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`service-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link to="/drop-points" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <FaMapMarkerAlt />
            <span>Drop Points</span>
          </Link>

          <Link to="/instructions" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <FaBook />
            <span>Instructions</span>
          </Link>

          <div className="scanner-button-container">
            <Link to="/scanner" className="scanner-button" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-barcode"></i>
              <span>Scan Device</span>
            </Link>
          </div>
          
          <div className="mobile-auth-buttons auth-buttons">
            <UserProfile />
          </div>
        </div>

        <div className="auth-buttons desktop-auth">
          <UserProfile />
        </div>

        <button className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <motion.div 
        className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="close-menu" onClick={toggleMenu}></div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          
          <div className="services-dropdown">
            <div className="services-link" onClick={() => setShowServices(!showServices)}>
              <span>Services</span>
              <i className={`fas fa-chevron-${showServices ? 'up' : 'down'}`}></i>
            </div>
            
            <div className={`services-menu ${showServices ? 'active' : ''}`}>
              {serviceItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`service-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link 
            to="/drop-points" 
            className={`nav-link ${location.pathname === '/drop-points' ? 'active' : ''}`}
          >
            <i className="fas fa-map-marker-alt"></i>
            Drop Points
          </Link>

          <div className="auth-buttons">
            <UserProfile />
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
