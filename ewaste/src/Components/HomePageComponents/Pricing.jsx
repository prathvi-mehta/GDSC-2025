import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Pricing.css";

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("monthly");

  const pricingPlans = [
    {
      title: "Basic",
      monthlyPrice: "₹499",
      yearlyPrice: "₹4999",
      features: [
        "Up to 5kg E-Waste Collection",
        "Basic Recycling Service",
        "Standard Pickup",
        "Email Support",
        "Basic Documentation"
      ],
      icon: "fas fa-leaf",
      color: "#4CAF50",
      image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Professional",
      monthlyPrice: "₹999",
      yearlyPrice: "₹9999",
      features: [
        "Up to 15kg E-Waste Collection",
        "Advanced Recycling Service",
        "Priority Pickup",
        "24/7 Phone Support",
        "Detailed Documentation",
        "Certificate of Recycling",
        "Data Destruction Service"
      ],
      icon: "fas fa-star",
      color: "#2196F3",
      popular: true,
      image: "https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Enterprise",
      monthlyPrice: "₹1999",
      yearlyPrice: "₹19999",
      features: [
        "Unlimited E-Waste Collection",
        "Premium Recycling Service",
        "Same Day Pickup",
        "Dedicated Support Team",
        "Comprehensive Documentation",
        "Premium Certificate",
        "Secure Data Destruction",
        "Environmental Impact Report"
      ],
      icon: "fas fa-building",
      color: "#9C27B0",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-background">
        <div className="pricing-shape shape1"></div>
        <div className="pricing-shape shape2"></div>
      </div>
      
      <div className="pricing-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeIn}
          className="pricing-header"
        >
          <h2>Choose Your <span className="highlight">Recycling Plan</span></h2>
          <p>Select the perfect plan for your e-waste recycling needs</p>
          
          <motion.div 
            className="pricing-tabs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: false }}
          >
            <button 
              className={`tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
              onClick={() => setActiveTab('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`tab-btn ${activeTab === 'yearly' ? 'active' : ''}`}
              onClick={() => setActiveTab('yearly')}
            >
              Yearly <span className="discount">Save 15%</span>
            </button>
          </motion.div>
        </motion.div>

        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`pricing-card ${plan.popular ? "popular" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)" }}
            >
              {plan.popular && (
                <div className="popular-badge" style={{ backgroundColor: plan.color }}>
                  Most Popular
                </div>
              )}
              
              <div className="card-image">
                <img src={plan.image} alt={plan.title} />
                <div className="image-overlay" style={{ backgroundColor: `${plan.color}33` }}></div>
              </div>
              
              <div className="card-header">
                <div className="plan-icon" style={{ backgroundColor: `${plan.color}22`, color: plan.color }}>
                  <i className={plan.icon}></i>
                </div>
                <h3>{plan.title}</h3>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="price"
                  >
                    <span className="amount">
                      {activeTab === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="period">/{activeTab === 'monthly' ? 'month' : 'year'}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    viewport={{ once: false }}
                  >
                    <span className="check-icon" style={{ color: plan.color }}>
                      <i className="fas fa-check-circle"></i>
                    </span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
              
              <motion.button
                className="select-plan-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  backgroundColor: plan.color,
                  boxShadow: `0 4px 15px ${plan.color}66`
                }}
              >
                Select Plan
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pricing-footer"
        >
          <div className="footer-content">
            <div className="footer-text">
              <h3>Need a custom plan?</h3>
              <p>Contact us for special requirements tailored to your business needs</p>
            </div>
            <motion.button
              className="contact-btn"
              whileHover={{ scale: 1.05, backgroundColor: "#2e7d32" }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-envelope"></i> Contact Sales
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
