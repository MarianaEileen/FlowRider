import React, { useState } from 'react';
import './Footer.css';

interface FooterLink {
  id: string;
  label: string;
  href: string;
}

//const footerLinks: FooterLink[] = [
  //{ id: 'privacy', label: 'Privacy Policy', href: '#privacy' },
  //{ id: 'terms', label: 'Terms of Service', href: '#terms' },
  //{ id: 'support', label: 'Support', href: '#support' },
  //{ id: 'careers', label: 'Careers', href: '#careers' },
//];

export const Footer: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('');

  return (
    <footer className="footer">
      <div className="footer-logo">
        <a href="#home">FlowRider</a>
      </div>

      {/*<ul className="footer-links">
        {footerLinks.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className={`footer-link ${activeId === item.id ? 'active' : ''}`}
              onClick={() => setActiveId(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>*/}

      <div className="footer-copy">
        &copy; {new Date().getFullYear()} FlowRider. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;