import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import './BusinessDirectory.css';

function BusinessDirectory() {
	const navigate = useNavigate();
	const servicesContainerRef = useRef(null);
	const mainTimerRef = useRef(null);
	const countdownTimerRef = useRef(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [countdown, setCountdown] = useState(10);
  
	useEffect(() => {
	  const handleClickOutside = (event) => {
		if (
		  servicesContainerRef.current &&
		  !servicesContainerRef.current.contains(event.target)
		) {
		  navigate("/1");
		}
	  };
  
	  document.addEventListener("mousedown", handleClickOutside);
  
	  const startCountdown = () => {
		setIsModalVisible(true); // Show the modal
		setCountdown(10); // Reset countdown to 10
  
		clearInterval(countdownTimerRef.current); // Clear any existing countdown timer
		countdownTimerRef.current = setInterval(() => {
		  setCountdown((prevCountdown) => {
			if (prevCountdown <= 1) {
			  clearInterval(countdownTimerRef.current); // Clear countdown timer
			  navigate("/1"); // Navigate to /1 when countdown reaches 0
			  return 0;
			}
			return prevCountdown - 1;
		  });
		}, 1000); // Decrement countdown every second
	  };
  
	  const resetMainTimer = () => {
		clearTimeout(mainTimerRef.current);
		clearInterval(countdownTimerRef.current);
		setIsModalVisible(false); // Hide the modal
		setCountdown(10); // Reset countdown
		mainTimerRef.current = setTimeout(startCountdown, 14000); // Restart the main timer
	  };
  
	  mainTimerRef.current = setTimeout(startCountdown, 14000); // Trigger the countdown modal after 14 seconds
  
	  return () => {
		document.removeEventListener("mousedown", handleClickOutside);
		clearTimeout(mainTimerRef.current);
		clearInterval(countdownTimerRef.current);
	  };
	}, [navigate]);
  
	const handleStillLooking = () => {
	  clearTimeout(mainTimerRef.current);
	  clearInterval(countdownTimerRef.current);
	  setIsModalVisible(false); // Hide the modal
	  setCountdown(10); // Reset countdown
	  mainTimerRef.current = setTimeout(() => {
		setIsModalVisible(true);
		setCountdown(10); // Reset countdown
		countdownTimerRef.current = setInterval(() => {
		  setCountdown((prevCountdown) => {
			if (prevCountdown <= 1) {
			  clearInterval(countdownTimerRef.current); // Clear countdown timer
			  navigate("/1"); // Navigate to /1 when countdown reaches 0
			  return 0;
			}
			return prevCountdown - 1;
		  });
		}, 1000);
	  }, 14000); // Restart the main timer
	};
  
  return (
    <div className="businessDirectoryContent">
      <div ref={servicesContainerRef} className="businessDirectoryContainer">
        <h1>Silver Bay area Business Directory</h1>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
			<li><Link to="/automotive-services/">Automotive</Link></li>
			<li><Link to="/bowling/">Bowling</Link></li>
			<li><Link to="/building-contractor/">Building Contractor</Link></li>
			<li><Link to="/business-services/">Business Services</Link></li>
			<li><Link to="/churches/">Churches</Link></li>
			<li><Link to="/coffee/">Coffee</Link></li>
			<li><Link to="/events-rentals/">Events and Rentals</Link></li>
			<li><Link to="/financial/">Financial</Link></li>
			<li><Link to="/gas-stations/">Gas Stations</Link></li>
			<li><Link to="/government/">Government</Link></li>
			<li><Link to="/groceries/">Groceries</Link></li>
			<li><Link to="/hair-beauty/">Hair and Beauty</Link></li>
			<li><Link to="/hardware/">Hardware</Link></li>
			<li><Link to="/healthcare/">Healthcare</Link></li>
			<li><Link to="/legal/">Legal</Link></li>
			<li><Link to="/liquor/">Liquor</Link></li>
			<li><Link to="/organizations/">Organizations</Link></li>
			<li><Link to="/real-estate/">Real Estate</Link></li>
			<li><Link to="/recreation/">Recreation</Link></li>
			<li><Link to="/sporting-goods/">Sporting Goods</Link></li>
			</ul>

			<p><Link to="/1">Return to Kiosk</Link></p>
       {/* Modal */}
	   {isModalVisible && (
          <div className="modalContainer">
            <div className="modalContents">
              <p>
                Returning to the main kiosk in {countdown} seconds. Click "Still
                Looking" to stay here.
              </p>
              <button className="modalButton" onClick={handleStillLooking}>
                Still Looking
              </button>
            </div>
          </div>
        )}
       </div>
    </div>
  );
}

export default BusinessDirectory;
