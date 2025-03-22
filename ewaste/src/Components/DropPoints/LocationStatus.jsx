import React from "react";
import { motion } from "framer-motion";

const LocationStatus = ({ userLocation, requestUserLocation, loading }) => {
  return (
    <div className="location-status">
      {userLocation ? (
        <div className="location-badge">
          <i className="fas fa-map-marker-alt"></i> Using your current location
        </div>
      ) : (
        <motion.button 
          className="share-location-btn"
          onClick={requestUserLocation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          <i className="fas fa-location-arrow"></i> 
          {loading ? "Detecting location..." : "Share My Location"}
        </motion.button>
      )}
    </div>
  );
};

export default LocationStatus; 