import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="about" id="about">
      <motion.div 
        className="about-image"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="image-grid">
          <div className="image-item main-image">
            <img 
              src="https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="E-Waste Recycling Process" 
            />
          </div>
          <div className="image-item small-image top">
            <img 
              src="https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="E-Waste Components" 
            />
          </div>
          <div className="image-item small-image bottom">
            <img 
              src="https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Recycling Center" 
            />
          </div>
        </div>
        
        <motion.div 
          className="stats-card"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: false }}
        >
          <div className="stat">
            <span className="stat-number">50M+</span>
            <span className="stat-label">Tons Recycled</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">100+</span>
            <span className="stat-label">Partners</span>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="about-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
      >
        <h2>About <span className="highlight">Us</span></h2>
        <p>
          We are committed to reducing electronic waste by promoting responsible 
          recycling and disposal. Our mission is to create a sustainable future 
          by ensuring that old and unused electronics are properly handled and recycled.
        </p>
        <p>
          With the rapid advancement of technology, electronic devices quickly become obsolete,
          leading to a growing e-waste crisis. We provide innovative solutions to address this
          challenge while recovering valuable materials.
        </p>
        
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="feature-list"
        >
          <motion.li variants={listItem}>
            <div className="icon-container">
              <i className="fas fa-certificate"></i>
            </div>
            <div className="feature-text">
              <h4>Certified E-Waste Recycling</h4>
              <p>All our processes follow international standards</p>
            </div>
          </motion.li>
          
          <motion.li variants={listItem}>
            <div className="icon-container">
              <i className="fas fa-leaf"></i>
            </div>
            <div className="feature-text">
              <h4>Environmentally Friendly</h4>
              <p>Zero landfill policy for all electronic components</p>
            </div>
          </motion.li>
          
          <motion.li variants={listItem}>
            <div className="icon-container">
              <i className="fas fa-shield-alt"></i>
            </div>
            <div className="feature-text">
              <h4>Secure Data Destruction</h4>
              <p>Complete wiping of all sensitive information</p>
            </div>
          </motion.li>
          
          <motion.li variants={listItem}>
            <div className="icon-container">
              <i className="fas fa-truck"></i>
            </div>
            <div className="feature-text">
              <h4>Free Pickup Services</h4>
              <p>Convenient collection from your location</p>
            </div>
          </motion.li>
        </motion.ul>
        
        <motion.button 
          className="primary-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </motion.div>
    </section>
  );
};

export default About;
