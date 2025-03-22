import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-text">
          <h2>About <span>Us</span></h2>
          <p>
            We are dedicated to promoting responsible e-waste recycling and 
            management. Our mission is to ensure that electronic waste is 
            disposed of safely, reducing its environmental impact.
          </p>
          <p>
            Join us in making the world a cleaner and greener place by 
            recycling your old electronics responsibly.
          </p>
        </div>
        <div className="about-image">
          <img src="about-us.png" alt="About Us" />
        </div>
      </div>
    </section>
  );
};

export default About;
