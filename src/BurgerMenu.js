import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './BurgerMenu.css'; // Import the CSS file for additional styling if needed

const BurgerMenu = () => {
  return (
    <Menu>
      <a className="menu-item" href="/kiosk/1">Home</a>
      <a className="menu-item" href="/about">About</a>
      <a className="menu-item" href="/services">Services</a>
      <a className="menu-item" href="/contact">Contact</a>
    </Menu>
  );
};

export default BurgerMenu;
