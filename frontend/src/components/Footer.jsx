import React from "react";
import { FaEnvelope, FaWhatsapp, FaDiscord } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>
            <a href="mailto:yusufauliarahmansyah07@gmail.com" className="footer-link">
              <FaEnvelope /> yusufauliarahmansyah07@gmail.com
            </a>
          </p>
          <p>
            <a href="https://wa.me/6289503196491" target="_blank" rel="noopener noreferrer" className="footer-link">
              <FaWhatsapp /> 089503196491
            </a>
          </p>
        </div>
        <div className="footer-community">
          <h4>Our Community</h4>
          <p>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <FaDiscord /> Join Discord
            </a>
          </p>
        </div>
      </div>
      <p>&copy; 2024 by Ucup Wank</p>
    </footer>
  );
};

export default Footer;
