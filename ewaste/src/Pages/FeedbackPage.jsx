import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/HomePageComponents/nav";
import Footer from "../Components/HomePageComponents/Footer";
import "./FeedbackPage.css";

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "general",
    subject: "",
    message: "",
    rating: 0,
    device: "",
    attachFile: null
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const feedbackTypes = [
    { id: "general", label: "General Feedback", icon: "fas fa-comment" },
    { id: "bug", label: "Report an Issue", icon: "fas fa-bug" },
    { id: "feature", label: "Feature Request", icon: "fas fa-lightbulb" },
    { id: "question", label: "Ask a Question", icon: "fas fa-question-circle" }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachFile: e.target.files[0]
    });
  };
  
  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    if (formData.feedbackType === "bug" && !formData.device.trim()) {
      newErrors.device = "Device information is required for bug reports";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          feedbackType: "general",
          subject: "",
          message: "",
          rating: 0,
          device: "",
          attachFile: null
        });
        
        // Show success message for 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
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
  
  const formVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      className="feedback-container"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Navbar />
      
      <div className="feedback-content">
        <motion.div
          className="feedback-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>We Value Your Feedback</h2>
          <p>Help us improve our e-waste recycling platform by sharing your thoughts, reporting issues, or suggesting new features.</p>
        </motion.div>
        
        <div className="feedback-layout">
          <motion.div
            className="feedback-form-container"
            initial="hidden"
            animate="visible"
            variants={formVariants}
          >
            {isSubmitted ? (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="success-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Thank You for Your Feedback!</h3>
                <p>We appreciate you taking the time to share your thoughts with us. Your feedback helps us improve our service.</p>
                <motion.button
                  className="new-feedback-btn"
                  onClick={() => setIsSubmitted(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Another Feedback
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="feedback-form">
                <motion.div className="form-group" variants={itemVariants}>
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                    placeholder="Enter your name"
                  />
                  {errors.name && <div className="error-message">{errors.name}</div>}
                </motion.div>
                
                <motion.div className="form-group" variants={itemVariants}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                    placeholder="Enter your email"
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </motion.div>
                
                <motion.div className="form-group" variants={itemVariants}>
                  <label>Feedback Type</label>
                  <div className="feedback-type-options">
                    {feedbackTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`feedback-type-option ${formData.feedbackType === type.id ? "active" : ""}`}
                        onClick={() => setFormData({ ...formData, feedbackType: type.id })}
                      >
                        <i className={type.icon}></i>
                        <span>{type.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div className="form-group" variants={itemVariants}>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? "error" : ""}
                    placeholder="Enter subject"
                  />
                  {errors.subject && <div className="error-message">{errors.subject}</div>}
                </motion.div>
                
                {formData.feedbackType === "bug" && (
                  <motion.div 
                    className="form-group"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="device">Device Information</label>
                    <input
                      type="text"
                      id="device"
                      name="device"
                      value={formData.device}
                      onChange={handleChange}
                      className={errors.device ? "error" : ""}
                      placeholder="Enter your device model, browser, and operating system"
                    />
                    {errors.device && <div className="error-message">{errors.device}</div>}
                  </motion.div>
                )}
                
                <motion.div className="form-group" variants={itemVariants}>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "error" : ""}
                    placeholder="Please describe your feedback, issue, or question in detail"
                    rows="5"
                  ></textarea>
                  {errors.message && <div className="error-message">{errors.message}</div>}
                </motion.div>
                
                {(formData.feedbackType === "general" || formData.feedbackType === "feature") && (
                  <motion.div 
                    className="form-group rating-group"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label>How would you rate our platform?</label>
                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.i
                          key={star}
                          className={`${star <= formData.rating ? "fas" : "far"} fa-star`}
                          onClick={() => handleRatingChange(star)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        ></motion.i>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                <motion.div className="form-group" variants={itemVariants}>
                  <label htmlFor="attachFile">Attach a File (Optional)</label>
                  <div className="file-input-container">
                    <input
                      type="file"
                      id="attachFile"
                      name="attachFile"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    <div className="file-input-label">
                      <i className="fas fa-paperclip"></i>
                      <span>
                        {formData.attachFile
                          ? formData.attachFile.name
                          : "Choose a file (screenshots, documents)"}
                      </span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div className="form-actions" variants={itemVariants}>
                  <motion.button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        <span>Submit Feedback</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            )}
          </motion.div>
          
          <motion.div
            className="feedback-sidebar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>If you prefer to reach us directly, you can use the following contact information:</p>
              
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p>support@ewaste-recycling.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <i className="fas fa-phone-alt"></i>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Address</h4>
                  <p>123 Recycling Way<br />Green City, EC 12345</p>
                </div>
              </div>
            </div>
            
            <div className="faq-section">
              <h3>Frequently Asked Questions</h3>
              
              <div className="faq-item">
                <h4>How long does it take to process my feedback?</h4>
                <p>We typically review and respond to feedback within 1-2 business days.</p>
              </div>
              
              <div className="faq-item">
                <h4>Can I track the status of my reported issue?</h4>
                <p>Yes, if you provide your email, we'll send you updates on the status of your reported issue.</p>
              </div>
              
              <div className="faq-item">
                <h4>How are feature requests evaluated?</h4>
                <p>Our team reviews all feature requests and prioritizes them based on user demand and alignment with our roadmap.</p>
              </div>
            </div>
            
            <div className="social-links">
              <h3>Connect With Us</h3>
              <div className="social-icons">
                <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <i className="fab fa-facebook-f"></i>
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <i className="fab fa-twitter"></i>
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <i className="fab fa-instagram"></i>
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <i className="fab fa-linkedin-in"></i>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="floating-particles">
        {[...Array(15)].map((_, index) => (
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

export default FeedbackPage; 