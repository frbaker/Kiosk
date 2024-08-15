import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Kiosk from './Kiosk';
import AboutPage from './AboutPage';
  
import './App.css';

function App() {
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
