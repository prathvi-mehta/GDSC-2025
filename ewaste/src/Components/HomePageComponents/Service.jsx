import React from "react";
import { motion } from "framer-motion";
import "./Service.css";

const Services = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const services = [
    {
      id: 1,
      title: "E-Waste Recycling",
      description: "We provide safe and eco-friendly recycling of electronic waste to reduce environmental impact and recover valuable materials.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fas fa-recycle"
    },
    {
      id: 2,
      title: "Data Destruction",
      description: "Secure data destruction ensures your personal and business information remains confidential when disposing of electronic devices.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fas fa-shield-alt"
    },
    {
      id: 3,
      title: "Pickup & Disposal",
      description: "Convenient e-waste pickup services from your location for responsible disposal, making recycling hassle-free for you.",
      image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fas fa-truck"
    },
    {
      id: 4,
      title: "Corporate Solutions",
      description: "Tailored e-waste management programs for businesses of all sizes, including IT asset disposition and compliance reporting.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fas fa-building"
    }
  ];

  return (
    <section className="services" id="services">
      <motion.div
        className="services-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
      >
        <h2>Our <span className="highlight">Services</span></h2>
        <p className="section-subtitle">
          Comprehensive e-waste management solutions for individuals and businesses
        </p>
      </motion.div>

      <motion.div 
        className="services-container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        {services.map((service) => (
          <motion.div 
            className="service-card"
            key={service.id}
            variants={fadeIn}
            whileHover={{ 
              y: -10,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)"
            }}
          >
            <div className="service-image-container">
              <img src={service.image} alt={service.title} />
              <div className="service-overlay">
                <i className={service.icon}></i>
              </div>
            </div>
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <motion.button 
                className="service-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="services-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: false }}
      >
        <h3>Need a custom solution for your e-waste?</h3>
        <p>We offer tailored services to meet your specific requirements</p>
        <motion.button 
          className="cta-button"
          whileHover={{ scale: 1.05, backgroundColor: "#2e7d32" }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Services;
