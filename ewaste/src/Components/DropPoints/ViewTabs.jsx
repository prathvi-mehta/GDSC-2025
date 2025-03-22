import React from "react";
import { motion } from "framer-motion";

const ViewTabs = ({ activeTab, onTabChange }) => {
  const tabVariants = {
    inactive: {
      opacity: 0.7,
      y: 5
    },
    active: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="view-tabs">
      <motion.button
        className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
        onClick={() => onTabChange('list')}
        variants={tabVariants}
        animate={activeTab === 'list' ? 'active' : 'inactive'}
      >
        <i className="fas fa-list"></i> List View
      </motion.button>
      
      <motion.button
        className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`}
        onClick={() => onTabChange('map')}
        variants={tabVariants}
        animate={activeTab === 'map' ? 'active' : 'inactive'}
      >
        <i className="fas fa-map-marked-alt"></i> Map View
      </motion.button>
    </div>
  );
};

export default ViewTabs; 