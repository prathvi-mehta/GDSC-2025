import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBarcode, FaMapMarkerAlt, FaBook, FaCalendarAlt, FaGift, FaCog, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import UserProfile from '../AuthComponents/UserProfile';
import './navbar-fixed.css';

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

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setShowServices(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (showServices && !isMenuOpen) {
      setShowServices(false);
    }
  };

  const toggleServices = (e) => {
    e.stopPropagation();
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

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-auth-buttons">
            <UserProfile />
          </div>
          
          <div className="services-dropdown">
            <div className="services-link" onClick={toggleServices}>
              <FaCog />
              <span>Services</span>
              {showServices ? <FaChevronUp /> : <FaChevronDown />}
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
              <FaBarcode />
              <span>Scan Device</span>
            </Link>
          </div>
        </div>

        <div className="auth-buttons">
          <UserProfile />
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger-icon ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
