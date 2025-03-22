import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../Components/HomePageComponents/nav";
import Footer from "../Components/HomePageComponents/Footer";
import "./InstructionsPage.css";

const InstructionsPage = () => {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [isScrolling, setIsScrolling] = useState(false);
  
  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: "fas fa-rocket"
    },
    {
      id: "scanning",
      title: "Scanning E-Waste",
      icon: "fas fa-qrcode"
    },
    {
      id: "scheduling",
      title: "Scheduling Pickup",
      icon: "fas fa-truck"
    },
    {
      id: "drop-points",
      title: "Finding Drop Points",
      icon: "fas fa-map-marker-alt"
    },
    {
      id: "tracking",
      title: "Tracking Your Device",
      icon: "fas fa-route"
    },
    {
      id: "rewards",
      title: "Earning Rewards",
      icon: "fas fa-gift"
    }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;
      
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      );
      
      const currentPosition = window.scrollY + 200;
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= currentPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling, sections]);
  
  const scrollToSection = (sectionId) => {
    setIsScrolling(true);
    setActiveSection(sectionId);
    
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth"
      });
      
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
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
  
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <motion.div
      className="instructions-container"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Navbar />
      
      <div className="instructions-content">
        <motion.div
          className="instructions-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>How to Use Our Platform</h2>
          <p>Follow these simple steps to recycle your e-waste and earn rewards</p>
        </motion.div>
        
        <div className="instructions-layout">
          <motion.div
            className="sidebar"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="sidebar-content">
              <h3>Quick Navigation</h3>
              <ul className="nav-list">
                {sections.map((section) => (
                  <motion.li
                    key={section.id}
                    className={activeSection === section.id ? "active" : ""}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(section.id)}
                  >
                    <i className={section.icon}></i>
                    <span>{section.title}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="help-box">
                <h4>Need Help?</h4>
                <p>Our support team is available to assist you with any questions.</p>
                <Link to="/feedback" className="help-link">
                  <motion.button
                    className="help-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-headset"></i> Contact Support
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
          
          <div className="main-content">
            <motion.section
              id="getting-started"
              className="instruction-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <div className="section-header">
                <div className="section-icon">
                  <i className="fas fa-rocket"></i>
                </div>
                <h3>Getting Started</h3>
              </div>
              
              <div className="section-content">
                <p>Welcome to our e-waste recycling platform! Here's how to get started:</p>
                
                <div className="steps-container">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Create an Account</h4>
                      <p>Sign up for a free account to access all features and track your recycling history.</p>
                      <Link to="/signup">
                        <motion.button
                          className="action-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Create Account
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Explore the Dashboard</h4>
                      <p>After logging in, you'll see your dashboard with options for scanning, scheduling pickups, and tracking your devices.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Learn About E-Waste</h4>
                      <p>Visit our Awareness page to understand the importance of proper e-waste disposal.</p>
                      <Link to="/awareness">
                        <motion.button
                          className="action-btn secondary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Learn More
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="tip-box">
                  <div className="tip-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <div className="tip-content">
                    <h4>Pro Tip</h4>
                    <p>Complete your profile to receive personalized recycling recommendations based on your location and device types.</p>
                  </div>
                </div>
              </div>
            </motion.section>
            
            <motion.section
              id="scanning"
              className="instruction-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <div className="section-header">
                <div className="section-icon">
                  <i className="fas fa-qrcode"></i>
                </div>
                <h3>Scanning E-Waste</h3>
              </div>
              
              <div className="section-content">
                <p>Our scanner helps identify your electronic devices and provides recycling information:</p>
                
                <div className="steps-container">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Access the Scanner</h4>
                      <p>Click on the Scanner button in the navigation bar to open the scanner page.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Allow Camera Access</h4>
                      <p>When prompted, allow camera access so the scanner can identify your device.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Position Your Device</h4>
                      <p>Place your electronic device in the frame and click "Capture" to analyze it.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>View Results</h4>
                      <p>The scanner will identify the device type and provide recycling options, including materials, hazardous components, and disposal instructions.</p>
                    </div>
                  </div>
                </div>
                
                <div className="demo-container">
                  <div className="demo-image">
                    <div className="placeholder-image scanner-demo">
                      <i className="fas fa-camera"></i>
                    </div>
                  </div>
                  <div className="demo-content">
                    <h4>Scanner Demo</h4>
                    <p>The scanner uses image recognition to identify electronic devices and provide recycling information. It works with most common electronic items including phones, laptops, tablets, and small appliances.</p>
                    <Link to="/scanner">
                      <motion.button
                        className="action-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Try Scanner
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.section>
            
            <motion.section
              id="scheduling"
              className="instruction-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <div className="section-header">
                <div className="section-icon">
                  <i className="fas fa-truck"></i>
                </div>
                <h3>Scheduling Pickup</h3>
              </div>
              
              <div className="section-content">
                <p>We offer convenient pickup services for your e-waste:</p>
                
                <div className="steps-container">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Navigate to Schedule Pickup</h4>
                      <p>After scanning your device or from the main menu, select "Schedule Pickup".</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Enter Your Information</h4>
                      <p>Provide your contact details and address for the pickup.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Select Date and Time</h4>
                      <p>Choose a convenient date and time slot for the pickup.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>Confirm and Track</h4>
                      <p>Confirm your pickup request and receive a tracking ID to monitor the status.</p>
                    </div>
                  </div>
                </div>
                
                <div className="feature-box">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                    <h4>Flexible Scheduling</h4>
                    <p>Choose from multiple time slots that fit your schedule</p>
                  </div>
                  
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-dollar-sign"></i>
                    </div>
                    <h4>Free Service</h4>
                    <p>Pickup service is provided free of charge</p>
                  </div>
                  
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <h4>Secure Handling</h4>
                    <p>Your devices are handled securely with data protection</p>
                  </div>
                </div>
                
                <Link to="/schedule-pickup">
                  <motion.button
                    className="action-btn full-width"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Schedule a Pickup Now
                  </motion.button>
                </Link>
              </div>
            </motion.section>
            
            <motion.section
              id="drop-points"
              className="instruction-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <div className="section-header">
                <div className="section-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h3>Finding Drop Points</h3>
              </div>
              
              <div className="section-content">
                <p>If you prefer to drop off your e-waste yourself, you can find nearby collection points:</p>
                
                <div className="steps-container">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Access Drop Points Page</h4>
                      <p>Navigate to the "Drop Points" section from the main menu or after scanning a device.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Search Your Location</h4>
                      <p>Enter your address or allow location access to find nearby drop-off points.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>View Available Locations</h4>
                      <p>Browse the list or map view of collection points with details about accepted items and operating hours.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>Get Directions</h4>
                      <p>Select a location and get directions to navigate there.</p>
                    </div>
                  </div>
                </div>
                
                <div className="map-preview">
                  <div className="map-placeholder">
                    <i className="fas fa-map-marked-alt"></i>
                  </div>
                  <div className="map-overlay">
                    <Link to="/drop-points">
                      <motion.button
                        className="action-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Find Drop Points
                      </motion.button>
                    </Link>
                  </div>
                </div>
                
                <div className="tip-box">
                  <div className="tip-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <div className="tip-content">
                    <h4>Pro Tip</h4>
                    <p>Call ahead to confirm operating hours and specific items accepted at each location, as these may vary.</p>
                  </div>
                </div>
              </div>
            </motion.section>
            
            <motion.section
              id="tracking"
              className="instruction-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <div className="section-header">
                <div className="section-icon">
                  <i className="fas fa-route"></i>
                </div>
                <h3>Tracking Your Device</h3>
              </div>
              
              <div className="section-content">
                <p>Monitor the recycling progress of your electronic devices:</p>
                
                <div className="steps-container">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Get Your Tracking ID</h4>
                      <p>After scheduling a pickup or dropping off your device, you'll receive a unique tracking ID.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Visit the Tracking Page</h4>
                      <p>Navigate to the "Track Device" section from the main menu.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Enter Your Tracking ID</h4>
                      <p>Input your tracking ID in the search field and click "Track".</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>View Progress</h4>
                      <p>See the current status, location, and estimated completion date for your device recycling.</p>
                    </div>
                  </div>
                </div>
                
                <div className="tracking-preview">
                  <div className="tracking-stages">
                    <div className="stage completed">
                      <div className="stage-marker">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="stage-label">Pickup</div>
                    </div>
                    <div className="stage-connector completed"></div>
                    <div className="stage completed">
                      <div className="stage-marker">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="stage-label">Sorting</div>
                    </div>
                    <div className="stage-connector active"></div>
                    <div className="stage active">
                      <div className="stage-marker">
                        <div className="pulse"></div>
                      </div>
                      <div className="stage-label">Processing</div>
                    </div>
                    <div className="stage-connector"></div>
                    <div className="stage">
                      <div className="stage-marker"></div>
                      <div className="stage-label">Recycling</div>
                    </div>
                    <div className="stage-connector"></div>
                    <div className="stage">
                      <div className="stage-marker"></div>
                      <div className="stage-label">Complete</div>
                    </div>
                  </div>
                  
                  <Link to="/track-device">
                    <motion.button
                      className="action-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Track Your Device
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.section>
            
            <motion.section
              id="rewards"
              className="instruction-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <div className="section-header">
                <div className="section-icon">
                  <i className="fas fa-gift"></i>
                </div>
                <h3>Earning Rewards</h3>
              </div>
              
              <div className="section-content">
                <p>Get rewarded for your contribution to e-waste recycling:</p>
                
                <div className="steps-container">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Recycle Devices</h4>
                      <p>Earn points for each device you recycle through our platform.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Track Your Points</h4>
                      <p>Visit the Rewards page to see your accumulated points and current tier level.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Browse Rewards</h4>
                      <p>Explore available rewards including gift cards, eco-friendly products, and charitable donations.</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>Redeem Points</h4>
                      <p>Select a reward and confirm redemption to use your points.</p>
                    </div>
                  </div>
                </div>
                
                <div className="rewards-preview">
                  <div className="rewards-tiers">
                    <div className="tier-card">
                      <div className="tier-header" style={{ backgroundColor: "#4CAF50" }}>
                        <h4>Recycler</h4>
                      </div>
                      <div className="tier-content">
                        <p>0+ points</p>
                        <ul>
                          <li>Basic rewards</li>
                          <li>Email updates</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="tier-card">
                      <div className="tier-header" style={{ backgroundColor: "#2196F3" }}>
                        <h4>Eco Warrior</h4>
                      </div>
                      <div className="tier-content">
                        <p>1000+ points</p>
                        <ul>
                          <li>10% bonus points</li>
                          <li>Early access to rewards</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="tier-card">
                      <div className="tier-header" style={{ backgroundColor: "#9C27B0" }}>
                        <h4>Champion</h4>
                      </div>
                      <div className="tier-content">
                        <p>5000+ points</p>
                        <ul>
                          <li>25% bonus points</li>
                          <li>Exclusive rewards</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/rewards">
                    <motion.button
                      className="action-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Rewards Program
                    </motion.button>
                  </Link>
                </div>
                
                <div className="tip-box">
                  <div className="tip-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <div className="tip-content">
                    <h4>Pro Tip</h4>
                    <p>Refer friends to earn additional points and help spread awareness about proper e-waste recycling.</p>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
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

export default InstructionsPage; 