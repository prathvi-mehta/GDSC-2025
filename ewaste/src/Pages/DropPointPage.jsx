import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/HomePageComponents/nav";
import Footer from "../Components/HomePageComponents/Footer";
import RecyclerListView from "../Components/DropPoints/RecyclerListView";
import RecyclerMapView from "../Components/DropPoints/RecyclerMapView";
import InfoSection from "../Components/DropPoints/InfoSection";
import AlternativeOptions from "../Components/DropPoints/AlternativeOptions";
import SearchBar from "../Components/DropPoints/SearchBar";
import ViewTabs from "../Components/DropPoints/ViewTabs";
import LocationStatus from "../Components/DropPoints/LocationStatus";
import { generateRandomLocations, defaultRecyclers } from "../utils/recyclerGenerator";
import { getUserLocation } from "../utils/locationUtils";
import "./DropPointPage.css";

const DropPointPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [focusedRecycler, setFocusedRecycler] = useState(null);
  
  // Use the user's location to generate random drop points or fallback to default locations
  const dropPoints = useMemo(() => {
    if (userLocation && userLocation.lat && userLocation.lng) {
      // Generate random locations around the user's location
      return generateRandomLocations(userLocation.lat, userLocation.lng, 10, 5);
    }
    
    // Default locations if user location is not available
    return defaultRecyclers;
  }, [userLocation]);
  
  // Filter drop points based on search query
  const filteredDropPoints = useMemo(() => {
    if (!searchQuery) return dropPoints;
    
    const query = searchQuery.toLowerCase();
    return dropPoints.filter(
      (point) =>
        point.name.toLowerCase().includes(query) ||
        point.address.toLowerCase().includes(query) ||
        point.acceptedItems.some((item) => item.toLowerCase().includes(query))
    );
  }, [dropPoints, searchQuery]);
  
  // Function to request user location
  const requestUserLocation = () => {
    setLoading(true);
    setLocationError(null);
    
    getUserLocation(
      (location) => {
        setUserLocation(location);
        setLoading(false);
        setLocationError(null);
      },
      (error) => {
        setLocationError(error);
        setLoading(false);
      }
    );
  };
  
  // Request location on initial load
  useEffect(() => {
    requestUserLocation();
    
    // Check if we have a device type from scanner
    if (location.state?.deviceType) {
      setSearchQuery(location.state.deviceType);
    }
  }, [location.state]);
  
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setFocusedRecycler(location);
    setActiveTab("map");
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "map") {
      setFocusedRecycler(null);
    }
  };
  
  const resetSearch = () => {
    setSearchQuery("");
  };
  
  const resetFocusedRecycler = () => {
    setFocusedRecycler(null);
  };
  
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };
  
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
    <motion.div
      className="drop-points-container"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Navbar />
      
      <div className="drop-points-content">
        <motion.div
          className="drop-points-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>E-Waste Drop-off Locations</h2>
          <p>Find the nearest e-waste collection points in your area</p>
          
          {/* Location status indicator */}
          <LocationStatus 
            userLocation={userLocation}
            requestUserLocation={requestUserLocation}
            loading={loading}
          />
        </motion.div>
        
        <motion.div
          className="drop-points-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="search-filter-bar">
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              resetSearch={resetSearch}
            />
            
            <ViewTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>
          
          <div className="drop-points-view">
            {activeTab === 'list' ? (
              <RecyclerListView 
                loading={loading}
                locationError={locationError}
                recyclers={filteredDropPoints}
                onRecyclerSelect={handleLocationSelect}
                resetSearch={resetSearch}
              />
            ) : (
              <RecyclerMapView 
                loading={loading}
                locationError={locationError}
                recyclers={filteredDropPoints}
                selectedLocation={selectedLocation}
                onLocationSelect={handleLocationSelect}
                userLocation={userLocation}
                requestUserLocation={requestUserLocation}
                focusedRecycler={focusedRecycler}
                resetFocusedRecycler={resetFocusedRecycler}
              />
            )}
          </div>
          
          <InfoSection />
        </motion.div>
        
        <AlternativeOptions />
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default DropPointPage; 