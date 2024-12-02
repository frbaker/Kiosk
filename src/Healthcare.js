import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import './Healthcare.css';

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
	  <div className="servicesContent">
		<div ref={servicesContainerRef} className="servicesContainer">
		<div class="pagecontentwrap">
	<h2>Healthcare Services</h2>
<div class="alternateCatStyle">  
<div class="cats flex-container">
<div class="maincatbox flex-item">
<h5>Bay Area Health Center</h5>
<div>50 Outer Drive<br />Silver Bay, MN 55614
	<p></p>
</div>
</div>

<div class="maincatbox flex-item">
<h5>Essentia Health Pharmacy</h5>
<div>99 Edison Blvd.<br />Silver Bay, MN 55614
	<p></p>
</div>
</div>

<div class="maincatbox flex-item">
<h5>Minnesota Veterans Home</h5>
<div>45 Banks Blvd.<br />Silver Bay, MN 55614
	<p></p>
</div>
</div>

<div class="maincatbox flex-item">
<h5>Ravenwood Massage</h5>
<div>6953 Cramer Rd.<br />Finland, MN 55603
	<p></p>
</div>
</div>

<div class="maincatbox flex-item">
<h5>Silver Bay Family Dental</h5>
<div>2 Shopping Center<br />Silver Bay, MN 55614<p></p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>St Luke’s Fitness Center &amp; Physical Therapy</h5>
<p>137 Banks Blvd.<br />William Kelley School Building<br />Silver Bay, MN 55614</p>
</div>
</div>
</div>
</div>
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
