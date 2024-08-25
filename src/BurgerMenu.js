import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './BurgerMenu.css'; // Import the CSS file for additional styling

const BurgerMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeSubSubMenu, setActiveSubSubMenu] = useState(null);

  const handleMouseEnter = (menuIndex) => {
    setActiveMenu(menuIndex);
  };

  const handleMouseLeave = (menuIndex) => {
    // Do not clear the menu state unless explicitly requested
  };

  const handleTouchStart = (menuIndex, subMenuIndex, subSubMenuIndex) => {
    setActiveMenu(menuIndex);
    setActiveSubMenu(subMenuIndex);
    setActiveSubSubMenu(subSubMenuIndex);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setActiveMenu(null);
      setActiveSubMenu(null);
      setActiveSubSubMenu(null);
    }, 500);
  };

  return (
    <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
      <a className="menu-item" href="#home">Welcome Message - brief intro to the community/area</a>
      
      <div
        className="menu-item"
        onMouseEnter={() => handleMouseEnter(0)}
        onMouseLeave={() => handleMouseLeave(0)}
        onTouchStart={() => handleTouchStart(0, null, null)}
        onTouchEnd={handleTouchEnd}
      >
        <a href="#local-announcements">Local Announcements / Info</a>
        <ul className={`sub-menu ${activeMenu === 0 ? 'active' : ''}`}>
          <li
            onMouseEnter={() => setActiveSubMenu(0)}
            onMouseLeave={() => setActiveSubMenu(null)}
            onTouchStart={() => handleTouchStart(0, 0, null)}
            onTouchEnd={handleTouchEnd}
          >
            <a href="#school-events">School Events</a>
          </li>
          <li
            onMouseEnter={() => setActiveSubMenu(1)}
            onMouseLeave={() => setActiveSubMenu(null)}
            onTouchStart={() => handleTouchStart(0, 1, null)}
            onTouchEnd={handleTouchEnd}
          >
            <a href="#community-meetings">Community Meetings</a>
          </li>
          <li
            onMouseEnter={() => setActiveSubMenu(2)}
            onMouseLeave={() => setActiveSubMenu(null)}
            onTouchStart={() => handleTouchStart(0, 2, null)}
            onTouchEnd={handleTouchEnd}
          >
            <a href="#government">Government</a>
            <ul className={`sub-sub-menu ${activeSubMenu === 2 ? 'active' : ''}`}>
              <li><a href="#municipal-services">Municipal Services</a></li>
              <li><a href="#contact-info">Contact Info</a></li>
              <li><a href="#public-meetings">Public Meetings</a></li>
              <li><a href="#permits-licensing">Permits and Licensing</a></li>
            </ul>
          </li>
        </ul>
      </div>
      
      <div
        className="menu-item"
        onMouseEnter={() => handleMouseEnter(1)}
        onMouseLeave={() => handleMouseLeave(1)}
        onTouchStart={() => handleTouchStart(1, null, null)}
        onTouchEnd={handleTouchEnd}
      >
        <a href="#business-directory">Business Directory</a>
        <ul className={`sub-menu ${activeMenu === 1 ? 'active' : ''}`}>
          <li><a href="#job-listings">Job Listings</a></li>
        </ul>
      </div>
      
      <a className="menu-item" href="#government-services">Government Services</a>
      <a className="menu-item" href="#weather-conditions">Weather Conditions</a>

      <div
        className="menu-item"
        onMouseEnter={() => handleMouseEnter(2)}
        onMouseLeave={() => handleMouseLeave(2)}
        onTouchStart={() => handleTouchStart(2, null, null)}
        onTouchEnd={handleTouchEnd}
      >
        <a href="#transportation-schedule">Transportation Schedule / Options</a>
        <ul className={`sub-menu ${activeMenu === 2 ? 'active' : ''}`}>
          <li><a href="#silver-bay-shuttle">Silver Bay Shuttle Service</a></li>
          <li><a href="#cadillac-cab">Cadillac Cab</a></li>
        </ul>
      </div>

      <div
        className="menu-item"
        onMouseEnter={() => handleMouseEnter(3)}
        onMouseLeave={() => handleMouseLeave(3)}
        onTouchStart={() => handleTouchStart(3, null, null)}
        onTouchEnd={handleTouchEnd}
      >
        <a href="#events-calendar">Events Calendar</a>
        <ul className={`sub-menu ${activeMenu === 3 ? 'active' : ''}`}>
          <li><a href="#upcoming-events">Upcoming Events</a></li>
          <li
            onMouseEnter={() => setActiveSubMenu(4)}
            onMouseLeave={() => setActiveSubMenu(null)}
            onTouchStart={() => handleTouchStart(3, 4, null)}
            onTouchEnd={handleTouchEnd}
          >
            <a href="#festivals">Festivals</a>
            <ul className={`sub-sub-menu ${activeSubMenu === 4 ? 'active' : ''}`}>
              <li><a href="#bay-days">Bay Days</a></li>
              <li><a href="#music-in-the-park">Music in the Park</a></li>
            </ul>
          </li>
          <li><a href="#things-to-do">Things To Do</a></li>
          <li><a href="#dining-entertainment">Dining / Entertainment</a></li>
          <li><a href="#accommodations">Accommodations</a></li>
          <li
            onMouseEnter={() => setActiveSubMenu(5)}
            onMouseLeave={() => setActiveSubMenu(null)}
            onTouchStart={() => handleTouchStart(3, 5, null)}
            onTouchEnd={handleTouchEnd}
          >
            <a href="#visitor-information">Visitor Information</a>
            <ul className={`sub-sub-menu ${activeSubMenu === 5 ? 'active' : ''}`}>
              <li
                onMouseEnter={() => setActiveSubSubMenu(0)}
                onMouseLeave={() => setActiveSubSubMenu(null)}
                onTouchStart={() => handleTouchStart(3, 5, 0)}
                onTouchEnd={handleTouchEnd}
              >
                <a href="#maps">Maps</a>
                <ul className={`sub-sub-sub-menu ${activeSubSubMenu === 0 ? 'active' : ''}`}>
                  <li><a href="#save-map">Save Your Map / Trip Planner</a></li>
                </ul>
              </li>
              <li><a href="#tips">Tips</a></li>
              <li><a href="#travel-guide">Travel Guide</a></li>
            </ul>
          </li>
          <li><a href="#club-meetings">Club Meetings / Sports Leagues</a></li>
          <li><a href="#garage-sales">Garage Sales</a></li>
          <li><a href="#event-submission">Event Submission</a></li>
        </ul>
      </div>

      <a className="menu-item" href="#real-estate">Real Estate</a>

      <div
        className="menu-item"
        onMouseEnter={() => handleMouseEnter(4)}
        onMouseLeave={() => handleMouseLeave(4)}
        onTouchStart={() => handleTouchStart(4, null, null)}
        onTouchEnd={handleTouchEnd}
      >
        <a href="#classified">Classified</a>
        <ul className={`sub-menu ${activeMenu === 4 ? 'active' : ''}`}>
          <li><a href="#buy-sell-trade">Buy / Sell / Trade</a></li>
          <li><a href="#lost-found">Lost and Found</a></li>
        </ul>
      </div>
    </Menu>
  );
};

export default BurgerMenu;
