import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/HomePageComponents/nav";
import Footer from "../Components/HomePageComponents/footer";
import "./ScannerPage.css";

const ScannerPage = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Generate particles for background effect
  const particles = Array.from({ length: 15 }, (_, index) => ({
    id: index,
    size: Math.random() * 10 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10
  }));

  useEffect(() => {
    return () => {
      // Clean up video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraPermission(true);
        setScanning(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraPermission(false);
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setScanning(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image data and convert to file
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured-image.png", { type: "image/png" });
          handleImageAnalysis([file]);
        }
      }, "image/png");
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    console.log('Files selected:', files.length, files.map(f => `${f.name} (${f.type}, ${f.size} bytes)`));
    if (files.length > 0 && files.length <= 3) {
      setUploadedImages(files);
    } else if (files.length > 3) {
      alert("You can upload a maximum of 3 images");
    }
  };

  const handleImageAnalysis = async (imagesToAnalyze) => {
    // Display processing state
    setResult({ status: "processing" });
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      
      // Add each image to the form data
      imagesToAnalyze.forEach((file, index) => {
        console.log(`Adding file to FormData: ${file.name}, type: ${file.type}, size: ${file.size} bytes`);
        formData.append('images', file);
      });
      
      console.log(`Sending ${imagesToAnalyze.length} images to the server for analysis...`);
      
<<<<<<< HEAD
      // Use local server URL for development, production URL for production
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiUrl = isDevelopment 
        ? 'http://localhost:5000/analyze' 
        : 'https://api-wvjpfafopq-uc.a.run.app/analyze';
      
      console.log('Using API URL:', apiUrl);
      
      console.log('Starting fetch request to API...');
=======
      // Send to API endpoint with full URL and updated error handling
      const apiUrl = 'https://us-central1-firebase-452812.cloudfunctions.net/api/analyze';
      console.log('Using API URL:', apiUrl);
      
>>>>>>> bdf707c (..)
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        mode: 'cors'
      });
      
      console.log('Server response received. Status:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error response:', errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }
      
      console.log('Response is OK, parsing JSON...');
      const data = await response.json();
      console.log('Analysis results received');
      
      // Set results
      setResult({
        status: "complete",
        data: data
      });
      
      // Stop the scanner if using camera
      if (scanning) {
        stopScanner();
      }
      
    } catch (error) {
      logNetworkError(error, 'image analysis');
      
      // Show error message with more details
      setResult({
        status: "error",
        message: `Failed to analyze images: ${error.message || "Connection error"}. Please check your internet connection and try again.`
      });
      
      // Stop the scanner if using camera
      if (scanning) {
        stopScanner();
      }
    } finally {
      setIsUploading(false);
      setUploadedImages([]);
    }
  };

  const processUploadedImages = () => {
    if (uploadedImages.length > 0) {
      handleImageAnalysis(uploadedImages);
    }
  };
  
  // Helper function for debugging
  const logNetworkError = (error, context) => {
    console.error(`Error in ${context}:`, error);
    console.error(`Error stack:`, error.stack);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Function to render result data from Gemini API
  const renderResultData = (data) => {
    // Add safety check for missing data structure
    if (!data || !data.device || !data.sustainability || !data.safety || 
        !data.disposal || !data.value) {
      return (
        <div className="result-container">
          <h3>Scan Results</h3>
          <div className="result-card">
            <div className="error-message">
              <i className="fas fa-exclamation-triangle"></i>
              <p>The analysis result is incomplete or in an unexpected format. Please try scanning again.</p>
              <pre style={{ textAlign: 'left', fontSize: '0.8rem', maxHeight: '200px', overflow: 'auto' }}>
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      );
    }
    
    // Helper function to render a list of items 
    const renderList = (items, emptyMessage = "None specified") => {
      if (!Array.isArray(items) || items.length === 0) {
        return <p className="empty-list">{emptyMessage}</p>;
      }
      return (
        <ul className="result-list">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    };
    
    // Choose icon based on device type
    const getDeviceIcon = () => {
      const deviceType = data.device?.type?.toLowerCase() || '';
      
      if (deviceType.includes('phone') || deviceType.includes('iphone')) 
        return "fas fa-mobile-alt";
      if (deviceType.includes('tablet') || deviceType.includes('ipad')) 
        return "fas fa-tablet-alt";
      if (deviceType.includes('laptop')) 
        return "fas fa-laptop";
      if (deviceType.includes('desktop') || deviceType.includes('computer')) 
        return "fas fa-desktop";
      if (deviceType.includes('monitor') || deviceType.includes('display')) 
        return "fas fa-tv";
      if (deviceType.includes('printer')) 
        return "fas fa-print";
      if (deviceType.includes('camera')) 
        return "fas fa-camera";
      if (deviceType.includes('router') || deviceType.includes('modem')) 
        return "fas fa-wifi";
      if (deviceType.includes('battery')) 
        return "fas fa-battery-full";
      if (deviceType.includes('circuit') || deviceType.includes('board')) 
        return "fas fa-microchip";
      if (deviceType.includes('keyboard')) 
        return "fas fa-keyboard";
      if (deviceType.includes('mouse')) 
        return "fas fa-mouse";
      if (deviceType.includes('speaker') || deviceType.includes('audio')) 
        return "fas fa-volume-up";
      
      // Default icon
      return "fas fa-hdd";
    };
    
    // Calculate recyclability score color
    const getScoreColor = (score) => {
      if (score >= 80) return "#4CAF50"; // Green
      if (score >= 60) return "#8BC34A"; // Light green
      if (score >= 40) return "#FFC107"; // Amber
      if (score >= 20) return "#FF9800"; // Orange
      return "#F44336"; // Red
    };
    
    const scoreColor = getScoreColor(data.sustainability?.recyclability_score || 0);

    // Navigate to schedule pickup page
    const navigateToSchedulePickup = () => {
      window.location.href = "/schedule-pickup";
    };
    
    return (
      <div className="result-container">
        <h3>E-Waste Analysis Results</h3>
        
        {/* Device Information Section */}
        <div className="result-card">
          <div className="result-header">
            <div className="result-icon">
              <i className={getDeviceIcon()}></i>
            </div>
            <div className="device-info">
              <h4>{data.device.type || "Unknown Device"}</h4>
              {data.device.manufacturer && 
                <p className="manufacturer">{data.device.manufacturer}</p>
              }
              {data.device.model && 
                <p className="model-info">{data.device.model}</p>
              }
              {data.device.year_estimate && 
                <p className="year-info">Circa {data.device.year_estimate}</p>
              }
            </div>
          </div>
          
          {/* Specifications */}
          {data.device.specifications && data.device.specifications.length > 0 && (
            <div className="specs-section">
              <h5>Specifications</h5>
              {renderList(data.device.specifications)}
            </div>
          )}
        </div>
        
        {/* Sustainability Section with Score Circle */}
        <div className="result-card">
          <div className="sustainability-header">
            <div className="score-circle" style={{ 
              background: `conic-gradient(${scoreColor} ${data.sustainability?.recyclability_score || 0}%, #e0e0e0 0)` 
            }}>
              <div className="score-inner">
                <span className="score-text">{data.sustainability?.recyclability_score || 0}%</span>
                <span className="score-label">Recyclable</span>
              </div>
            </div>
            
            <div className="sustainability-details">
              <h4>Sustainability Assessment</h4>
              <div className="rating-item">
                <span className="rating-label">Complexity:</span>
                <div className="rating-value">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-circle ${i < (data.sustainability?.complexity_rating || 0) ? 'active' : ''}`}
                    ></i>
                  ))}
                  <span className="rating-text">
                    {data.sustainability?.complexity_rating === 1 ? 'Simple' : 
                     data.sustainability?.complexity_rating === 5 ? 'Complex' : ''}
                  </span>
                </div>
              </div>
              
              {data.sustainability?.environmental_impact && (
                <div className="rating-item">
                  <span className="rating-label">Environmental Impact:</span>
                  <div className="rating-value">
                    <span className="impact-score">{data.sustainability.environmental_impact.score}/10</span>
                    <p className="impact-explanation">{data.sustainability.environmental_impact.explanation}</p>
                  </div>
                </div>
              )}

              {data.sustainability?.carbon_footprint_savings && (
                <div className="carbon-savings">
                  <i className="fas fa-leaf"></i>
                  <span>{data.sustainability.carbon_footprint_savings}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="materials-section">
            <h5>Recoverable Materials</h5>
            {renderList(data.sustainability?.recyclable_components)}
          </div>
        </div>
        
        {/* Safety Information */}
        <div className="result-card">
          <div className="card-header">
            <i className="fas fa-exclamation-triangle safety-icon"></i>
            <h4>Safety Information</h4>
          </div>
          
          <div className="safety-grid">
            <div className="safety-column">
              <h5>Hazardous Components</h5>
              {renderList(data.safety?.hazardous_materials, "No hazardous components detected")}
            </div>
            
            <div className="safety-column">
              <h5>Health Risks</h5>
              {renderList(data.safety?.health_risks, "No significant health risks identified")}
            </div>
          </div>
          
          <div className="handling-section">
            <h5>Handling Precautions</h5>
            {renderList(data.safety?.handling_instructions)}
          </div>
          
          <div className="regulations-section">
            <h5>Regulatory Requirements</h5>
            {renderList(data.safety?.regulatory_requirements)}
          </div>
        </div>
        
        {/* Disposal Guidelines */}
        <div className="result-card">
          <div className="card-header">
            <i className="fas fa-recycle disposal-icon"></i>
            <h4>Disposal Guidelines</h4>
          </div>
          
          {data.value?.recommended_methods && (
            <div className="recommended-method">
              <p><strong>Recommended Approach:</strong> {data.value.recommended_methods.join(', ')}</p>
            </div>
          )}
          
          <div className="disposal-section">
            <h5>Required Tools</h5>
            {renderList(data.disposal?.required_tools, "No special tools required")}
          </div>
          
          <div className="disposal-section">
            <h5>Disassembly Steps</h5>
            {data.disposal?.preparation_steps && data.disposal.preparation_steps.length > 0 ? (
              <ol className="steps-list">
                {data.disposal.preparation_steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            ) : (
              <p className="empty-list">No disassembly steps provided</p>
            )}
          </div>
          
          <div className="certifications-section">
            <h5>Recommended Certifications</h5>
            {renderList(data.disposal?.certifications)}
          </div>
          
          <div className="regional-section">
            <h5>Regional Guidelines</h5>
            <div className="region-tabs">
              <div className="region-tab">
                <h6><i className="fas fa-globe-europe"></i> European Union</h6>
                <p>{data.disposal?.regional_guidelines?.EU || "Information not available"}</p>
              </div>
              <div className="region-tab">
                <h6><i className="fas fa-flag-usa"></i> United States</h6>
                <p>{data.disposal?.regional_guidelines?.US || "Information not available"}</p>
              </div>
              <div className="region-tab">
                <h6><i className="fas fa-globe-asia"></i> Asia</h6>
                <p>{data.disposal?.regional_guidelines?.Asia || "Information not available"}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Value Recovery */}
        <div className="result-card">
          <div className="card-header">
            <i className="fas fa-gem value-icon"></i>
            <h4>Resource Recovery Value</h4>
            {data.value?.estimated_recycling_value && (
              <div className="value-badge">
                {data.value.estimated_recycling_value}
              </div>
            )}
          </div>
          
          {/* Price Estimates Section */}
          {data.value?.price_estimates && (
            <div className="price-estimates-section">
              <div className="price-table">
                <div className="price-row">
                  <div className="price-label">
                    <i className="fas fa-recycle"></i>
                    <span>Recycling Value:</span>
                  </div>
                  <div className="price-value">{data.value.price_estimates.recycling_value || "N/A"}</div>
                </div>
                <div className="price-row">
                  <div className="price-label">
                    <i className="fas fa-store"></i>
                    <span>Resale Value:</span>
                  </div>
                  <div className="price-value">{data.value.price_estimates.resale_value || "N/A"}</div>
                </div>
                <div className="price-row">
                  <div className="price-label">
                    <i className="fas fa-coins"></i>
                    <span>Raw Materials Value:</span>
                  </div>
                  <div className="price-value">{data.value.price_estimates.raw_materials_value || "N/A"}</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="value-grid">
            <div className="value-column">
              <h5>Reusable Components</h5>
              {renderList(data.value?.valuable_components)}
            </div>
            
            <div className="value-column">
              <h5>Valuable Materials</h5>
              {renderList(data.value?.valuable_materials)}
            </div>
          </div>
          
          {data.value?.data_security_required && (
            <div className="data-security-section">
              <h5><i className="fas fa-shield-alt"></i> Data Security Required</h5>
              <p>{data.value.data_wiping_procedure || "Standard data wiping procedures recommended."}</p>
            </div>
          )}
        </div>

        {/* Schedule Pickup Button */}
        <div className="schedule-pickup-container">
          <div className="pickup-promo">
            <h3>Ready to Responsibly Recycle Your Device?</h3>
            <p>Our team will pick up your e-waste and ensure it's recycled properly, following all safety guidelines.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="schedule-btn"
              onClick={navigateToSchedulePickup}
            >
              <i className="fas fa-truck"></i> Schedule a Pickup Today
            </motion.button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="scanner-container"
    >
      <Navbar />
      
      <div className="scanner-particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: Math.random() * 0.5 + 0.3,
              scale: Math.random() * 0.6 + 0.5
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [null, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
          />
        ))}
      </div>
      
      <div className="scanner-content">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="scanner-box"
        >
          <h2>E-Waste Scanner</h2>
          <p>Scan your electronic waste to identify recyclable components</p>
          
          <div className="scanner-view">
            {scanning ? (
              <>
                <div className="video-container">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline
                    onLoadedMetadata={() => {
                      videoRef.current.play();
                    }}
                  />
                  <div className="scan-overlay">
                    <div className="scan-line"></div>
                  </div>
                </div>
                <div className="scanner-controls">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="capture-btn"
                    onClick={captureImage}
                  >
                    <i className="fas fa-camera"></i> Capture
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="stop-btn"
                    onClick={stopScanner}
                  >
                    <i className="fas fa-times"></i> Cancel
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="start-scan">
                {result && result.status === "complete" ? (
                  <>
                    {renderResultData(result.data)}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="scan-btn"
                      onClick={() => {
                        setResult(null);
                        startScanner();
                      }}
                    >
                      <i className="fas fa-camera"></i> Scan Again
                    </motion.button>
                  </>
                ) : result && result.status === "processing" ? (
                  <div className="processing">
                    <div className="spinner"></div>
                    <p>Analyzing your e-waste...</p>
                  </div>
                ) : result && result.status === "error" ? (
                  <div className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    <p>{result.message}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="retry-btn"
                      onClick={() => {
                        setResult(null);
                      }}
                    >
                      <i className="fas fa-redo"></i> Try Again
                    </motion.button>
                  </div>
                ) : (
                  <>
                    <div className="scanner-options">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="scan-btn"
                        onClick={startScanner}
                      >
                        <i className="fas fa-camera"></i> Use Camera
                      </motion.button>
                      <span className="separator">or</span>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        style={{ display: 'none' }} 
                        accept="image/*" 
                        multiple 
                        capture="environment"
                        onChange={handleFileUpload}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="upload-btn"
                        onClick={handleBrowseClick}
                      >
                        <i className="fas fa-upload"></i> Upload Photos
                      </motion.button>
                    </div>
                    
                    {uploadedImages.length > 0 && (
                      <div className="uploaded-preview">
                        <p>{uploadedImages.length} image{uploadedImages.length > 1 ? 's' : ''} selected</p>
                        <div className="thumbnail-container">
                          {uploadedImages.map((file, index) => (
                            <div key={index} className="thumbnail">
                              <img src={URL.createObjectURL(file)} alt={`Uploaded ${index + 1}`} />
                            </div>
                          ))}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="analyze-btn"
                          onClick={processUploadedImages}
                          disabled={isUploading}
                        >
                          <i className="fas fa-search"></i> Analyze Images
                        </motion.button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <Footer />
    </motion.div>
  );
};

export default ScannerPage; 
