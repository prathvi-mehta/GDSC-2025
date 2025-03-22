import React from 'react';
import { motion } from 'framer-motion';
import GoogleMapComponent from '../MapComponents/GoogleMap';

const RecyclerMapView = ({
  loading,
  locationError,
  recyclers,
  selectedLocation,
  onLocationSelect,
  userLocation,
  requestUserLocation,
  focusedRecycler,
  resetFocusedRecycler
}) => {
  return (
    <div className="map-container">
      {loading ? (
        <div className="map-loading">
          <div className="spinner"></div>
          <p>Loading map...</p>
        </div>
      ) : (
        <>
          {locationError && (
            <div className="location-error-banner">
              <i className="fas fa-exclamation-triangle"></i>
              <p>{locationError}</p>
              <motion.button 
                className="retry-location-btn"
                onClick={requestUserLocation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-location-arrow"></i> Share My Location
              </motion.button>
            </div>
          )}
          
          {focusedRecycler && (
            <div className="focused-recycler-banner">
              <p>Showing: {focusedRecycler.name}</p>
              <motion.button 
                className="show-all-btn"
                onClick={resetFocusedRecycler}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-th-list"></i> Show All Recyclers
              </motion.button>
            </div>
          )}
          
          <GoogleMapComponent
            dropPoints={recyclers}
            selectedLocation={selectedLocation}
            onLocationSelect={onLocationSelect}
            userLocation={userLocation}
            focusedRecycler={focusedRecycler}
          />
        </>
      )}
    </div>
  );
};

export default RecyclerMapView; 