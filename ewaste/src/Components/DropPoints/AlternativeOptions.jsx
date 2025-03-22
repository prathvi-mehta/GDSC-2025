import React from 'react';
import { motion } from 'framer-motion';

const AlternativeOptions = () => {
  return (
    <motion.div
      className="alternative-options"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h3>Other Recycling Options</h3>
      
      <div className="options-grid">
        <div className="option-card">
          <div className="option-icon">
            <i className="fas fa-store"></i>
          </div>
          <h4>Retailer Take-Back</h4>
          <p>Many electronics retailers offer take-back programs for old devices when you purchase new ones.</p>
          <button className="option-btn">Find Retailers</button>
        </div>
        
        <div className="option-card">
          <div className="option-icon">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <h4>Collection Events</h4>
          <p>Special e-waste collection events are regularly organized in communities throughout the year.</p>
          <button className="option-btn">Upcoming Events</button>
        </div>
        
        <div className="option-card">
          <div className="option-icon">
            <i className="fas fa-box"></i>
          </div>
          <h4>Mail-In Programs</h4>
          <p>Various manufacturers offer mail-in recycling programs for their products at no cost to you.</p>
          <button className="option-btn">Mail-In Options</button>
        </div>
      </div>
    </motion.div>
  );
};

export default AlternativeOptions; 