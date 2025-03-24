import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../Components/HomePageComponents/nav";
import Hero from "../Components/HomePageComponents/Hero";
import About from "../Components/HomePageComponents/About";
import Services from "../Components/HomePageComponents/Service";
import Contact from "../Components/HomePageComponents/Contact";
import Footer from "../Components/HomePageComponents/Footer";
import "./HomePage.css";

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });

    // Prevent XSS by sanitizing any user input
    const sanitizeInput = (input) => {
      return input.replace(/[&<>"']/g, (match) => {
        const entities = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;'
        };
        return entities[match];
      });
    };

    // Apply sanitization to any user input fields
    const userInputs = document.querySelectorAll('input, textarea');
    userInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        e.target.value = sanitizeInput(e.target.value);
      });
    });
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="homepage-container"
    >
      <Navbar />
      
      <div data-aos="fade-up">
        <Hero />
      </div>

      <div data-aos="fade-up" data-aos-delay="200">
        <About />
      </div>
      
      <div data-aos="fade-up" data-aos-delay="300">
        <Services />
      </div>
      
      <div data-aos="fade-up" data-aos-delay="500">
        <Contact />
      </div>
      
      <div data-aos="fade-up" data-aos-delay="600">
        <Footer />
      </div>
    </motion.div>
  );
};

export default HomePage;
