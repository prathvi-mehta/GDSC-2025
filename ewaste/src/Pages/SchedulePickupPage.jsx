import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Components/HomePageComponents/nav";
import Footer from "../Components/HomePageComponents/Footer";
import "./SchedulePickupPage.css";

const SchedulePickupPage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    date: "",
    timeSlot: "",
    deviceType: location.state?.deviceType || "",
    additionalInfo: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  useEffect(() => {
    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    
    const dateInput = document.getElementById('pickup-date');
    if (dateInput) {
      dateInput.min = minDate;
    }
    
    // Animation for the page
    window.scrollTo(0, 0);
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          zipCode: "",
          date: "",
          timeSlot: "",
          deviceType: "",
          additionalInfo: ""
        });
        setCurrentStep(1);
      }, 5000);
    }, 2000);
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
  
  const formVariants = {
    hidden: {
      opacity: 0,
      x: -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const timeSlots = [
    "09:00 AM - 11:00 AM",
    "11:00 AM - 01:00 PM",
    "01:00 PM - 03:00 PM",
    "03:00 PM - 05:00 PM",
    "05:00 PM - 07:00 PM"
  ];
  
  const deviceTypes = [
    "Smartphone",
    "Laptop",
    "Desktop Computer",
    "Tablet",
    "Television",
    "Printer",
    "Gaming Console",
    "Other"
  ];
  
  const renderStepIndicator = () => {
    return (
      <div className="step-indicator">
        {[1, 2, 3].map((step) => (
          <motion.div
            key={step}
            className={`step ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: currentStep === step ? 1.1 : 1,
              backgroundColor: currentStep === step 
                ? 'var(--accent-color)' 
                : currentStep > step 
                  ? 'var(--accent-color)' 
                  : 'rgba(255, 255, 255, 0.2)'
            }}
            transition={{ duration: 0.3 }}
          >
            {currentStep > step ? (
              <i className="fas fa-check"></i>
            ) : (
              step
            )}
            <span className="step-label">
              {step === 1 ? 'Personal Info' : step === 2 ? 'Pickup Details' : 'Confirmation'}
            </span>
          </motion.div>
        ))}
        <div className="step-connector">
          <div 
            className="step-progress" 
            style={{ width: `${(currentStep - 1) * 50}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  const renderStep1 = () => {
    return (
      <motion.div
        className="form-step"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={formVariants}
      >
        <h3>Personal Information</h3>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter your street address"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Enter your city"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="zipCode">ZIP Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              placeholder="Enter your ZIP code"
            />
          </div>
        </div>
        
        <div className="form-buttons">
          <motion.button
            type="button"
            className="next-btn"
            onClick={nextStep}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.zipCode}
          >
            Next <i className="fas fa-arrow-right"></i>
          </motion.button>
        </div>
      </motion.div>
    );
  };
  
  const renderStep2 = () => {
    return (
      <motion.div
        className="form-step"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={formVariants}
      >
        <h3>Pickup Details</h3>
        
        <div className="form-group">
          <label htmlFor="deviceType">Device Type</label>
          <select
            id="deviceType"
            name="deviceType"
            value={formData.deviceType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select device type</option>
            {deviceTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              type="date"
              id="pickup-date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="timeSlot">Preferred Time</label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select time slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="additionalInfo">Additional Information</label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Any special instructions or details about your device"
            rows="4"
          ></textarea>
        </div>
        
        <div className="form-buttons">
          <motion.button
            type="button"
            className="back-btn"
            onClick={prevStep}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-arrow-left"></i> Back
          </motion.button>
          
          <motion.button
            type="button"
            className="next-btn"
            onClick={nextStep}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!formData.deviceType || !formData.date || !formData.timeSlot}
          >
            Next <i className="fas fa-arrow-right"></i>
          </motion.button>
        </div>
      </motion.div>
    );
  };
  
  const renderStep3 = () => {
    return (
      <motion.div
        className="form-step"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={formVariants}
      >
        <h3>Confirm Your Pickup</h3>
        
        <div className="confirmation-details">
          <div className="confirmation-section">
            <h4><i className="fas fa-user"></i> Personal Information</h4>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Address:</strong> {formData.address}, {formData.city}, {formData.zipCode}</p>
          </div>
          
          <div className="confirmation-section">
            <h4><i className="fas fa-calendar-alt"></i> Pickup Details</h4>
            <p><strong>Device Type:</strong> {formData.deviceType}</p>
            <p><strong>Date:</strong> {formData.date}</p>
            <p><strong>Time Slot:</strong> {formData.timeSlot}</p>
            {formData.additionalInfo && (
              <p><strong>Additional Info:</strong> {formData.additionalInfo}</p>
            )}
          </div>
        </div>
        
        <div className="terms-checkbox">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            I agree to the <a href="#" className="terms-link">terms and conditions</a>
          </label>
        </div>
        
        <div className="form-buttons">
          <motion.button
            type="button"
            className="back-btn"
            onClick={prevStep}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-arrow-left"></i> Back
          </motion.button>
          
          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner-small"></div> Processing...
              </>
            ) : (
              <>
                Schedule Pickup <i className="fas fa-check"></i>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    );
  };
  
  const renderSuccessMessage = () => {
    return (
      <motion.div
        className="success-message"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h3>Pickup Scheduled Successfully!</h3>
        <p>We've sent a confirmation email to <strong>{formData.email}</strong></p>
        <p>Our team will arrive on <strong>{formData.date}</strong> between <strong>{formData.timeSlot}</strong></p>
        
        <div className="success-actions">
          <Link to="/track-device" className="track-link">
            <motion.button
              className="track-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-truck"></i> Track Your Pickup
            </motion.button>
          </Link>
          
          <Link to="/" className="home-link">
            <motion.button
              className="home-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-home"></i> Back to Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  };
  
  return (
    <motion.div
      className="schedule-pickup-container"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Navbar />
      
      <div className="pickup-content">
        <motion.div
          className="pickup-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Schedule E-Waste Pickup</h2>
          <p>Let us pick up your electronic waste directly from your doorstep</p>
        </motion.div>
        
        <motion.div
          className="pickup-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {!isSuccess ? (
            <form onSubmit={handleSubmit}>
              {renderStepIndicator()}
              
              <div className="form-container">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
              </div>
            </form>
          ) : (
            renderSuccessMessage()
          )}
        </motion.div>
        
        <motion.div
          className="pickup-features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-truck"></i>
            </div>
            <h3>Free Pickup</h3>
            <p>We offer free pickup services for all electronic waste</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Secure Handling</h3>
            <p>Your data will be securely wiped from all devices</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <h3>Eco-Friendly</h3>
            <p>All e-waste is recycled using environmentally friendly methods</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-gift"></i>
            </div>
            <h3>Earn Rewards</h3>
            <p>Get reward points for every device you recycle with us</p>
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

export default SchedulePickupPage; 