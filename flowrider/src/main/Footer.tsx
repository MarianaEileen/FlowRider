import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <a href="#home">FlowRider</a>
      </div>

      <div className="footer-copy">
        &copy; {new Date().getFullYear()} FlowRider. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
