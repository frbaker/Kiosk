import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import './Churches.css';

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
	<h2>Churches</h2>
<div class="alternateCatStyle">  
<div class="cats flex-container">
<div class="maincatbox flex-item">
	<h5>Assembly of God Church</h5>
<div>Hwy 61 &amp; Main St.<br />Beaver Bay, MN 55614
<p><strong>Phone:</strong><br />(218) 226-4895</p>
<p>Sunday Service 10:30 am </p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>Bay Area Vineyard Church</h5>
<div>99 Edison Blvd.<br />Silver Bay, MN 55614
<p><strong>Phone:</strong><br />(218) 220-7650</p>
<p>Sunday Service 10 am</p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>Faith Lutheran</h5>
<div>105 Outer Dr.<br />Silver Bay, MN 55614
<p><strong>Phone:</strong><br />(218) 226-3908</p>
<p>Sunday Service 9 am</p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>Palisade Baptist Church</h5>
<div>5486 Hwy 61<br />Silver Bay, MN 55614
<p><strong>Phone:</strong><br />(218) 226-3039</p>
<p>Sunday Service 10:30 am</p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>Silver Bay Baptist, MBA</h5>
<div>12 Law Dr.<br />Silver Bay, MN 55614
<p><strong>Phone:</strong><br />(218) 226-4202</p>
<p>Sunday Service 10:30 am, 6 pm </p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>St Mary’s Catholic Church</h5>
<div>57 Horn Blvd.<br />Silver Bay, MN 55614
<p><strong>Phone:</strong><br />(218) 226-3100</p>
<p>Saturday Mass 7:15 pm <br />Sunday Mass 8:30 am </p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>Sychar Lutheran Church</h5>
<div>14 Edison<br />Silver Bay, MN 55614
<p><strong>Phone:</strong><br />(218) 226-4424</p>
<p>Sunday Service 9 am</p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>United Protestant Church</h5>
<div>17 Horn Blvd.<br />Silver Bay, MN 55614
<p><strong>Phone:</strong><br />(218) 226-3973</p>
<p>Sunday Service 9:30 am </p>
</div>
</div>

<div class="maincatbox flex-item">
	<h5>Zion Lutheran Church</h5>
<div>6768 Hwy 1<br />Finland, MN 55614
<p><strong>Phone:</strong><br />(218) 353-7369</p>
<p>Sunday Service 10:30 am</p>
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
