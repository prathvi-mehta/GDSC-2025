import React from "react";
import { motion } from "framer-motion";
import "./Hero.css"; // Make sure to create this CSS file

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Sustainable <span className="highlight shimmer">E-Waste</span> Management
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Recycle, reduce, and reuse electronics to build a greener future for our planet.
        </motion.p>
        
        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button 
            className="primary-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
          
          <motion.button 
            className="secondary-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Involved
          </motion.button>
        </motion.div>
      </div>
      
      <motion.div 
        className="hero-image"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="image-container">
          <img 
            src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="E-Waste Recycling" 
            className="main-image"
          />
          
          <motion.div 
            className="floating-icon icon-1"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/3003/3003984.png" alt="Recycle Icon" />
          </motion.div>
          
          <motion.div 
            className="floating-icon icon-2"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/2371/2371201.png" alt="Electronics Icon" />
          </motion.div>
          
          <motion.div 
            className="floating-icon icon-3"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/3163/3163478.png" alt="Earth Icon" />
          </motion.div>
        </div>
      </motion.div>
      
      <div className="hero-particles">
        {[...Array(15)].map((_, index) => (
          <motion.div
            key={index}
            className="particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.3,
              scale: Math.random() * 0.6 + 0.5
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [null, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
