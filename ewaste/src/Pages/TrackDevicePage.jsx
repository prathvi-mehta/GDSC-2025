import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/HomePageComponents/nav";
import Footer from "../Components/HomePageComponents/footer";
import "./TrackDevicePage.css";

const TrackDevicePage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);
  const [error, setError] = useState("");
  
  // Mock tracking data
  const mockTrackingData = {
    "TR123456": {
      id: "TR123456",
      deviceType: "Smartphone",
      brand: "Apple",
      model: "iPhone 11",
      status: "In Transit",
      estimatedCompletion: "2023-09-15",
      currentLocation: "Recycling Facility",
      steps: [
        {
          step: "Pickup Scheduled",
          date: "2023-09-01",
          time: "10:30 AM",
          completed: true,
          description: "Pickup scheduled from your location"
        },
        {
          step: "Pickup Completed",
          date: "2023-09-03",
          time: "11:45 AM",
          completed: true,
          description: "Device picked up by our courier"
        },
        {
          step: "Arrived at Sorting Center",
          date: "2023-09-05",
          time: "09:15 AM",
          completed: true,
          description: "Device arrived at our sorting facility"
        },
        {
          step: "In Transit to Recycling Facility",
          date: "2023-09-07",
          time: "02:30 PM",
          completed: true,
          description: "Device is being transported to recycling facility"
        },
        {
          step: "Processing at Recycling Facility",
          date: "2023-09-10",
          time: "08:00 AM",
          completed: false,
          description: "Device is being processed for recycling"
        },
        {
          step: "Recycling Complete",
          date: "",
          time: "",
          completed: false,
          description: "Device has been successfully recycled"
        },
        {
          step: "Certificate Issued",
          date: "",
          time: "",
          completed: false,
          description: "Recycling certificate issued"
        }
      ]
    },
    "TR789012": {
      id: "TR789012",
      deviceType: "Laptop",
      brand: "Dell",
      model: "XPS 15",
      status: "Processing",
      estimatedCompletion: "2023-09-20",
      currentLocation: "Sorting Center",
      steps: [
        {
          step: "Pickup Scheduled",
          date: "2023-09-02",
          time: "09:00 AM",
          completed: true,
          description: "Pickup scheduled from your location"
        },
        {
          step: "Pickup Completed",
          date: "2023-09-04",
          time: "10:15 AM",
          completed: true,
          description: "Device picked up by our courier"
        },
        {
          step: "Arrived at Sorting Center",
          date: "2023-09-06",
          time: "11:30 AM",
          completed: true,
          description: "Device arrived at our sorting facility"
        },
        {
          step: "In Transit to Recycling Facility",
          date: "",
          time: "",
          completed: false,
          description: "Device is being transported to recycling facility"
        },
        {
          step: "Processing at Recycling Facility",
          date: "",
          time: "",
          completed: false,
          description: "Device is being processed for recycling"
        },
        {
          step: "Recycling Complete",
          date: "",
          time: "",
          completed: false,
          description: "Device has been successfully recycled"
        },
        {
          step: "Certificate Issued",
          date: "",
          time: "",
          completed: false,
          description: "Recycling certificate issued"
        }
      ]
    },
    "TR345678": {
      id: "TR345678",
      deviceType: "Television",
      brand: "Samsung",
      model: "QLED 55\"",
      status: "Completed",
      estimatedCompletion: "2023-08-25",
      currentLocation: "Recycling Complete",
      steps: [
        {
          step: "Pickup Scheduled",
          date: "2023-08-10",
          time: "02:00 PM",
          completed: true,
          description: "Pickup scheduled from your location"
        },
        {
          step: "Pickup Completed",
          date: "2023-08-12",
          time: "03:30 PM",
          completed: true,
          description: "Device picked up by our courier"
        },
        {
          step: "Arrived at Sorting Center",
          date: "2023-08-14",
          time: "10:45 AM",
          completed: true,
          description: "Device arrived at our sorting facility"
        },
        {
          step: "In Transit to Recycling Facility",
          date: "2023-08-16",
          time: "09:15 AM",
          completed: true,
          description: "Device is being transported to recycling facility"
        },
        {
          step: "Processing at Recycling Facility",
          date: "2023-08-18",
          time: "11:00 AM",
          completed: true,
          description: "Device is being processed for recycling"
        },
        {
          step: "Recycling Complete",
          date: "2023-08-22",
          time: "04:30 PM",
          completed: true,
          description: "Device has been successfully recycled"
        },
        {
          step: "Certificate Issued",
          date: "2023-08-25",
          time: "01:15 PM",
          completed: true,
          description: "Recycling certificate issued"
        }
      ]
    }
  };
  
  const handleTrack = (e) => {
    e.preventDefault();
    
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID");
      return;
    }
    
    setIsTracking(true);
    setError("");
    
    // Simulate API call
    setTimeout(() => {
      const result = mockTrackingData[trackingId];
      
      if (result) {
        setTrackingResult(result);
        setError("");
      } else {
        setTrackingResult(null);
        setError("No tracking information found for this ID. Please check and try again.");
      }
      
      setIsTracking(false);
    }, 1500);
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#4CAF50";
      case "In Transit":
        return "#2196F3";
      case "Processing":
        return "#FF9800";
      default:
        return "#9E9E9E";
    }
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
  
  const renderTrackingResult = () => {
    if (!trackingResult) return null;
    
    const completedSteps = trackingResult.steps.filter(step => step.completed).length;
    const totalSteps = trackingResult.steps.length;
    const progressPercentage = (completedSteps / totalSteps) * 100;
    
    return (
      <motion.div
        className="tracking-result"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="result-header">
          <div className="device-info">
            <h3>{trackingResult.deviceType}</h3>
            <p>{trackingResult.brand} {trackingResult.model}</p>
            <p className="tracking-id">Tracking ID: {trackingResult.id}</p>
          </div>
          
          <div className="status-info">
            <div 
              className="status-badge"
              style={{ backgroundColor: `${getStatusColor(trackingResult.status)}20`, color: getStatusColor(trackingResult.status), borderColor: `${getStatusColor(trackingResult.status)}50` }}
            >
              {trackingResult.status}
            </div>
            <p className="location">
              <i className="fas fa-map-marker-alt"></i> {trackingResult.currentLocation}
            </p>
            {trackingResult.status !== "Completed" && (
              <p className="estimated-date">
                <i className="far fa-calendar-alt"></i> Est. completion: {trackingResult.estimatedCompletion}
              </p>
            )}
          </div>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${progressPercentage}%`, backgroundColor: getStatusColor(trackingResult.status) }}
            ></div>
          </div>
          <div className="progress-text">
            {completedSteps} of {totalSteps} steps completed
          </div>
        </div>
        
        <div className="tracking-timeline">
          {trackingResult.steps.map((step, index) => (
            <div 
              key={index} 
              className={`timeline-item ${step.completed ? 'completed' : ''}`}
            >
              <div className="timeline-marker">
                {step.completed ? (
                  <i className="fas fa-check"></i>
                ) : (
                  <span></span>
                )}
              </div>
              
              <div className="timeline-content">
                <div className="timeline-header">
                  <h4>{step.step}</h4>
                  {step.completed && (
                    <div className="timeline-date">
                      <span>{step.date}</span>
                      <span>{step.time}</span>
                    </div>
                  )}
                </div>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="tracking-actions">
          <motion.button
            className="action-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
          >
            <i className="fas fa-print"></i> Print Details
          </motion.button>
          
          {trackingResult.status === "Completed" && (
            <motion.button
              className="action-btn certificate-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-certificate"></i> Download Certificate
            </motion.button>
          )}
          
          <motion.button
            className="action-btn contact-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-headset"></i> Contact Support
          </motion.button>
        </div>
      </motion.div>
    );
  };
  
  const renderExampleIds = () => {
    return (
      <div className="example-ids">
        <p>Try these example tracking IDs:</p>
        <div className="example-buttons">
          {Object.keys(mockTrackingData).map((id) => (
            <motion.button
              key={id}
              className="example-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTrackingId(id)}
            >
              {id}
            </motion.button>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <motion.div
      className="track-device-container"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Navbar />
      
      <div className="track-device-content">
        <motion.div
          className="track-device-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Track Your E-Waste</h2>
          <p>Monitor the recycling progress of your electronic devices</p>
        </motion.div>
        
        <motion.div
          className="track-device-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="tracking-form-container">
            <form onSubmit={handleTrack} className="tracking-form">
              <div className="form-group">
                <label htmlFor="tracking-id">Enter Tracking ID</label>
                <div className="input-group">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    id="tracking-id"
                    placeholder="e.g. TR123456"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="error-message">{error}</div>}
              </div>
              
              <motion.button
                type="submit"
                className="track-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isTracking}
              >
                {isTracking ? (
                  <>
                    <div className="spinner-small"></div> Tracking...
                  </>
                ) : (
                  <>
                    <i className="fas fa-search"></i> Track Device
                  </>
                )}
              </motion.button>
            </form>
            
            {!trackingResult && renderExampleIds()}
          </div>
          
          {renderTrackingResult()}
        </motion.div>
        
        <motion.div
          className="tracking-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3>How Tracking Works</h3>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-qrcode"></i>
              </div>
              <h4>Get Your Tracking ID</h4>
              <p>Receive a unique tracking ID when you schedule a pickup or drop off your device</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-search"></i>
              </div>
              <h4>Enter Your ID</h4>
              <p>Enter your tracking ID on this page to see the current status of your device</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-route"></i>
              </div>
              <h4>Track Progress</h4>
              <p>Follow your device through each step of the recycling process</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <h4>Get Certificate</h4>
              <p>Download your recycling certificate once the process is complete</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="floating-particles">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="particle"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
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
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`
            }}
          />
        ))}
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default TrackDevicePage; 
