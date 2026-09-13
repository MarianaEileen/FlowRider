import React, { useState } from 'react';
import './Navbar.css';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('home');

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="#home">FlowRider</a>
      </div>

      <ul className="navbar-links">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className={`nav-link ${activeId === item.id ? 'active' : ''}`}
              onClick={() => setActiveId(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Spacer to keep navigation items centered relative to the logo */}
      <div className="navbar-spacer" aria-hidden="true" />
    </nav>
  );
};

export default Navbar;