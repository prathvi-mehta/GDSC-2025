import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../Components/HomePageComponents/nav";
import Footer from "../Components/HomePageComponents/footer";
import "./Awarenesspage.css";

const AwarenessPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  const awarenessData = [
    {
      title: "What is E-Waste?",
      content: "Electronic waste, or e-waste, refers to discarded electronic devices and equipment. This includes computers, smartphones, televisions, and other electronic items that are no longer in use.",
      icon: "💻"
    },
    {
      title: "Environmental Impact",
      content: "E-waste contains hazardous materials like lead, mercury, and cadmium that can harm the environment and human health if not properly disposed of.",
      icon: "🌍"
    },
    {
      title: "Recycling Benefits",
      content: "Proper e-waste recycling helps recover valuable materials, reduces environmental pollution, and conserves natural resources.",
      icon: "♻️"
    },
    {
      title: "How to Recycle",
      content: "Learn about proper e-waste disposal methods, local recycling centers, and how to prepare your devices for recycling.",
      icon: "📱"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="awareness-container"
    >
      <Navbar />
      
      <div className="awareness-hero">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          E-Waste Awareness
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Learn about the importance of proper e-waste management
        </motion.p>
      </div>

      <div className="awareness-grid">
        {awarenessData.map((item, index) => (
          <motion.div
            key={index}
            className="awareness-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="card-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </motion.div>
        ))}
      </div>

      <div className="awareness-stats">
        <div className="stat-item" data-aos="fade-right">
          <h2>50M+</h2>
          <p>Tons of E-Waste Generated Annually</p>
        </div>
        <div className="stat-item" data-aos="fade-up">
          <h2>20%</h2>
          <p>Properly Recycled</p>
        </div>
        <div className="stat-item" data-aos="fade-left">
          <h2>100+</h2>
          <p>Harmful Chemicals in E-Waste</p>
        </div>
      </div>

      <div className="awareness-cta">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cta-button"
        >
          Start Recycling Today
        </motion.button>
      </div>

      <Footer />
    </motion.div>
  );
};

export default AwarenessPage;
