import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Kiosk from './Kiosk';
import AboutPage from './AboutPage';
//import useInactivityTimer from './useInactivityTimer'; // Adjust the import path as needed
  

import './App.css';

function App() {
  //useInactivityTimer('/kiosk/1', 60*1000); // Redirect after 1 minute of inactivity

  return ( 
    <Router>
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/kiosk/:id" element={<Kiosk />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
