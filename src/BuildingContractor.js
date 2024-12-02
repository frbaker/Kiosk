import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import './BuildingContractor.css';

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
	<h2>Building Contractors</h2>
<div class="alternateCatStyle">  
<div class="cats flex-container">
<div class="maincatbox flex-item">
	<h5>Anderson Land Development</h5>
<div>6586 Roses Rd.<br />Finland, MN 55603<p></p>
<p><strong>Phone: </strong><br />(218) 353-7516</p>
</div>
</div>


<div class="maincatbox flex-item">
	<h5>Gerald LaBerge Logging &amp; Contracting</h5>
<div>6118 Hwy 61<br />Silver Bay, MN 55614
<p><strong>Phone: </strong><br />(218) 226-3586</p>
</div>
</div>


<div class="maincatbox flex-item">
	<h5>Jackson Inc.</h5>
<div>6773 Cramer Rd.<br />Finland, MN 55603<p></p>
<p><strong>Phone: </strong><br />(218) 353-0425</p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>John’s Sanitary Removal</h5>
<div>15 Golf Course Rd.<br />Silver Bay, MN 55614
<p><strong>Phone: </strong><br />(218) 226-3418</p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>Northshore Concrete Raising</h5>
<div>6569 Roses Rd.<br />Finland, MN 55603
<p><strong>Phone: </strong><br />(218) 226-7774</p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>Rich Sve Interior Design</h5>
<div>3648 Hwy 61<br />Two Harbors, MN 55616
<p> </p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>Sawtooth Electric</h5>
<div>6754 Hwy 1<br />Finland, MN
<p><strong>Phone: </strong><br />(218) 353-7584</p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>Stone Ridge Electric</h5>
<div>5186 Tiffany Ln.<br />Finland, MN 55603
<p><strong>Phone: </strong><br />(218) 353-0500</p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>Van House Construction/ Marks Drive Apt.</h5>
<div>23 Marks Dr.<br />Silver Bay, MN 55614
<p><strong>Phone: </strong><br />(218) 220-1212</p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>Vern Hoff Land Development</h5>
<div>PO Box 447<br />Hwy 1<br />Finland, MN 55603
	<p></p>
</div>
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
