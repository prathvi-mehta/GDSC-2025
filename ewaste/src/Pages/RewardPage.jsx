import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/HomePageComponents/nav";
import Footer from "../Components/HomePageComponents/Footer";
import "./RewardPage.css";

const RewardPage = () => {
  const [points, setPoints] = useState(1250);
  const [activeTab, setActiveTab] = useState("rewards");
  const [showConfetti, setShowConfetti] = useState(false);
  const [redeemModal, setRedeemModal] = useState(null);
  const [history, setHistory] = useState([
    {
      id: 1,
      date: "2023-05-15",
      action: "Recycled Smartphone",
      points: 200,
      status: "Completed"
    },
    {
      id: 2,
      date: "2023-06-02",
      action: "Recycled Laptop",
      points: 500,
      status: "Completed"
    },
    {
      id: 3,
      date: "2023-07-10",
      action: "Recycled Tablet",
      points: 300,
      status: "Completed"
    },
    {
      id: 4,
      date: "2023-08-05",
      action: "Referred a Friend",
      points: 250,
      status: "Completed"
    }
  ]);
  
  const rewards = [
    {
      id: 1,
      title: "$10 Gift Card",
      description: "Redeem for a $10 gift card to your favorite store",
      points: 500,
      image: "gift-card.jpg",
      category: "Gift Cards"
    },
    {
      id: 2,
      title: "Plant a Tree",
      description: "We'll plant a tree in your name to help the environment",
      points: 300,
      image: "tree.jpg",
      category: "Environmental"
    },
    {
      id: 3,
      title: "$25 Gift Card",
      description: "Redeem for a $25 gift card to your favorite store",
      points: 1000,
      image: "gift-card-premium.jpg",
      category: "Gift Cards"
    },
    {
      id: 4,
      title: "Eco-Friendly Water Bottle",
      description: "Get a reusable water bottle made from recycled materials",
      points: 800,
      image: "water-bottle.jpg",
      category: "Merchandise"
    },
    {
      id: 5,
      title: "Free Pickup Service",
      description: "Get a free pickup for your next e-waste recycling",
      points: 600,
      image: "pickup.jpg",
      category: "Services"
    },
    {
      id: 6,
      title: "Donate to Environmental Charity",
      description: "Donate your points to support environmental initiatives",
      points: 400,
      image: "charity.jpg",
      category: "Environmental"
    }
  ];
  
  const tiers = [
    {
      name: "Recycler",
      points: 0,
      benefits: ["Basic rewards", "Email updates"],
      color: "#4CAF50"
    },
    {
      name: "Eco Warrior",
      points: 1000,
      benefits: ["10% bonus points", "Early access to new rewards", "Special events invitations"],
      color: "#2196F3"
    },
    {
      name: "Sustainability Champion",
      points: 5000,
      benefits: ["25% bonus points", "Exclusive rewards", "Priority pickup service", "Annual sustainability report"],
      color: "#9C27B0"
    }
  ];
  
  const getCurrentTier = () => {
    for (let i = tiers.length - 1; i >= 0; i--) {
      if (points >= tiers[i].points) {
        return tiers[i];
      }
    }
    return tiers[0];
  };
  
  const getNextTier = () => {
    const currentTierIndex = tiers.findIndex(tier => tier.name === getCurrentTier().name);
    if (currentTierIndex < tiers.length - 1) {
      return tiers[currentTierIndex + 1];
    }
    return null;
  };
  
  const handleRedeem = (reward) => {
    if (points >= reward.points) {
      setRedeemModal(reward);
    }
  };
  
  const confirmRedeem = () => {
    setPoints(points - redeemModal.points);
    
    // Add to history
    const newHistoryItem = {
      id: history.length + 1,
      date: new Date().toISOString().split('T')[0],
      action: `Redeemed ${redeemModal.title}`,
      points: -redeemModal.points,
      status: "Completed"
    };
    
    setHistory([newHistoryItem, ...history]);
    setRedeemModal(null);
    
    // Show confetti
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
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
  
  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  
  const renderConfetti = () => {
    return (
      <div className="confetti-container">
        {[...Array(50)].map((_, index) => (
          <div
            key={index}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`
            }}
          ></div>
        ))}
      </div>
    );
  };
  
  const renderRewards = () => {
    return (
      <div className="rewards-grid">
        {rewards.map((reward) => (
          <motion.div
            key={reward.id}
            className="reward-card"
            whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="reward-image">
              <div className="reward-category">{reward.category}</div>
            </div>
            <div className="reward-content">
              <h3>{reward.title}</h3>
              <p>{reward.description}</p>
              <div className="reward-points">
                <i className="fas fa-star"></i> {reward.points} points
              </div>
              <motion.button
                className={`redeem-btn ${points < reward.points ? 'disabled' : ''}`}
                whileHover={points >= reward.points ? { scale: 1.05 } : {}}
                whileTap={points >= reward.points ? { scale: 0.95 } : {}}
                onClick={() => handleRedeem(reward)}
                disabled={points < reward.points}
              >
                {points < reward.points ? (
                  <>
                    <i className="fas fa-lock"></i> Locked
                  </>
                ) : (
                  <>
                    <i className="fas fa-gift"></i> Redeem
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };
  
  const renderHistory = () => {
    return (
      <div className="history-container">
        <div className="history-list">
          {history.map((item) => (
            <motion.div
              key={item.id}
              className="history-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="history-date">
                <i className="far fa-calendar-alt"></i> {item.date}
              </div>
              <div className="history-action">
                {item.action}
              </div>
              <div className={`history-points ${item.points < 0 ? 'negative' : 'positive'}`}>
                {item.points > 0 ? '+' : ''}{item.points}
              </div>
              <div className="history-status">
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderTiers = () => {
    return (
      <div className="tiers-container">
        <div className="current-tier-info">
          <h3>Your Current Tier</h3>
          <div className="tier-card current" style={{ borderColor: currentTier.color }}>
            <div className="tier-header" style={{ backgroundColor: currentTier.color }}>
              <h4>{currentTier.name}</h4>
            </div>
            <div className="tier-content">
              <div className="tier-points">
                <i className="fas fa-star"></i> {currentTier.points}+ points
              </div>
              <ul className="tier-benefits">
                {currentTier.benefits.map((benefit, index) => (
                  <li key={index}>
                    <i className="fas fa-check"></i> {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {nextTier && (
          <div className="next-tier-info">
            <h3>Next Tier</h3>
            <div className="tier-card next" style={{ borderColor: nextTier.color }}>
              <div className="tier-header" style={{ backgroundColor: nextTier.color }}>
                <h4>{nextTier.name}</h4>
              </div>
              <div className="tier-content">
                <div className="tier-points">
                  <i className="fas fa-star"></i> {nextTier.points}+ points
                </div>
                <div className="points-needed">
                  <span>{nextTier.points - points} more points needed</span>
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ 
                        width: `${Math.min(100, (points / nextTier.points) * 100)}%`,
                        backgroundColor: nextTier.color
                      }}
                    ></div>
                  </div>
                </div>
                <ul className="tier-benefits">
                  {nextTier.benefits.map((benefit, index) => (
                    <li key={index}>
                      <i className="fas fa-check"></i> {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        <div className="all-tiers">
          <h3>All Tiers</h3>
          <div className="tiers-grid">
            {tiers.map((tier, index) => (
              <div 
                key={index} 
                className={`tier-card ${tier.name === currentTier.name ? 'current' : ''}`}
                style={{ borderColor: tier.color }}
              >
                <div className="tier-header" style={{ backgroundColor: tier.color }}>
                  <h4>{tier.name}</h4>
                </div>
                <div className="tier-content">
                  <div className="tier-points">
                    <i className="fas fa-star"></i> {tier.points}+ points
                  </div>
                  <ul className="tier-benefits">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i}>
                        <i className="fas fa-check"></i> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <motion.div
      className="rewards-container"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Navbar />
      
      {showConfetti && renderConfetti()}
      
      <div className="rewards-content">
        <motion.div
          className="rewards-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>E-Waste Rewards Program</h2>
          <p>Earn points for recycling e-waste and redeem for exciting rewards</p>
        </motion.div>
        
        <motion.div
          className="points-summary"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="points-card">
            <div className="points-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="points-info">
              <h3>Your Points</h3>
              <div className="points-value">{points}</div>
              <div className="tier-label">
                <span className="tier-name" style={{ color: currentTier.color }}>
                  {currentTier.name}
                </span> tier
              </div>
            </div>
          </div>
          
          <div className="points-actions">
            <motion.button
              className="action-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/scanner'}
            >
              <i className="fas fa-qrcode"></i> Scan Device
            </motion.button>
            
            <motion.button
              className="action-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/schedule-pickup'}
            >
              <i className="fas fa-truck"></i> Schedule Pickup
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div
          className="rewards-tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            className={`tab-btn ${activeTab === 'rewards' ? 'active' : ''}`}
            onClick={() => setActiveTab('rewards')}
            variants={tabVariants}
            animate={activeTab === 'rewards' ? 'active' : 'inactive'}
          >
            <i className="fas fa-gift"></i> Rewards
          </motion.button>
          
          <motion.button
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
            variants={tabVariants}
            animate={activeTab === 'history' ? 'active' : 'inactive'}
          >
            <i className="fas fa-history"></i> History
          </motion.button>
          
          <motion.button
            className={`tab-btn ${activeTab === 'tiers' ? 'active' : ''}`}
            onClick={() => setActiveTab('tiers')}
            variants={tabVariants}
            animate={activeTab === 'tiers' ? 'active' : 'inactive'}
          >
            <i className="fas fa-trophy"></i> Tiers
          </motion.button>
        </motion.div>
        
        <motion.div
          className="rewards-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {activeTab === 'rewards' && renderRewards()}
          {activeTab === 'history' && renderHistory()}
          {activeTab === 'tiers' && renderTiers()}
        </motion.div>
        
        <motion.div
          className="how-it-works"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3>How It Works</h3>
          
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-recycle"></i>
              </div>
              <h4>Recycle E-Waste</h4>
              <p>Drop off your e-waste at collection points or schedule a pickup</p>
            </div>
            
            <div className="step-connector">
              <i className="fas fa-chevron-right"></i>
            </div>
            
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-star"></i>
              </div>
              <h4>Earn Points</h4>
              <p>Get points based on the type and quantity of e-waste recycled</p>
            </div>
            
            <div className="step-connector">
              <i className="fas fa-chevron-right"></i>
            </div>
            
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-gift"></i>
              </div>
              <h4>Redeem Rewards</h4>
              <p>Use your points to claim rewards or support environmental causes</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {redeemModal && (
        <div className="modal-overlay">
          <motion.div
            className="redeem-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-header">
              <h3>Redeem Reward</h3>
              <button className="close-btn" onClick={() => setRedeemModal(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-content">
              <h4>{redeemModal.title}</h4>
              <p>{redeemModal.description}</p>
              <div className="modal-points">
                <i className="fas fa-star"></i> {redeemModal.points} points
              </div>
              <p className="confirmation-text">
                Are you sure you want to redeem this reward?
              </p>
            </div>
            
            <div className="modal-actions">
              <motion.button
                className="cancel-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRedeemModal(null)}
              >
                Cancel
              </motion.button>
              
              <motion.button
                className="confirm-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={confirmRedeem}
              >
                Confirm Redemption
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
      
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

export default RewardPage; 