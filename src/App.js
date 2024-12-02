import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Kiosk from './Kiosk';
import AboutPage from './AboutPage';
import BusinessDirectory from './BusinessDirectory';
import Automotive from './Automotive';
import Bowling from './Bowling';
import BuildingContractor from './BuildingContractor';
import BusinessServices from './BusinessServices';
import Churches from './Churches';
import Coffee from './Coffee';
import EventsAndRentals from './EventsAndRentals';
import Financial from './Financial';
import GasStations from './GasStations';
import Government from './Government';
import Groceries from './Groceries';
import HairAndBeauty from './HairAndBeauty';
import Hardware from './Hardware';
import Healthcare from './Healthcare';
import Legal from './Legal';
import Liquor from './Liquor';
import Organizations from './Organizations';
import RealEstate from './RealEstate';
import Recreation from './Recreation';
import SportingGoods from './SportingGoods';
//import useInactivityTimer from './useInactivityTimer'; // Adjust the import path as needed
  

import './App.css';

function App() {
  //useInactivityTimer('/kiosk/1', 60*1000); // Redirect after 1 minute of inactivity

  return ( 
    <Router basename="/kiosk">
      <Routes> 
        <Route path="/welcome" element={<HomePage />} />
        <Route path="/:id" element={<Kiosk />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/businessDirectory" element={<BusinessDirectory />} />
        <Route path="/automotive-services" element={<Automotive />} />
        <Route path="/bowling" element={<Bowling />} />
        <Route path="/building-contractor" element={<BuildingContractor />} />
        <Route path="/business-services" element={<BusinessServices />} />
        <Route path="/churches" element={<Churches />} />
        <Route path="/coffee" element={<Coffee />} />
        <Route path="/events-rentals" element={<EventsAndRentals />} />
        <Route path="/financial" element={<Financial />} />
        <Route path="/gas-stations" element={<GasStations />} />
        <Route path="/government" element={<Government />} />
        <Route path="/groceries" element={<Groceries />} />
        <Route path="/hair-beauty" element={<HairAndBeauty />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/healthcare" element={<Healthcare />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/liquor" element={<Liquor />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/real-estate" element={<RealEstate />} />
        <Route path="/recreation" element={<Recreation />} />
        <Route path="/sporting-goods" element={<SportingGoods />} />
        <Route path="*" element={<Kiosk />} />  {/* Fallback Route */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
