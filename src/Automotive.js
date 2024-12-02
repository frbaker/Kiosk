import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Automotive.css";

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
        <div className="pagecontentwrap">
          <h2>Automotive Services</h2>
          <div className="alternateCatStyle">
            <div className="cats flex-container">
              <div className="maincatbox flex-item">
                <h5>Adams Automotive</h5>
                <div>
                  99 Outer Drive<br />
                  Silver Bay, MN 55614
                  <p>
                    <strong>Phone: </strong>
                    <br />
                    (218) 226-3321
                  </p>
                </div>
              </div>

              <div className="maincatbox flex-item">
                <h5>J&amp;H Towing and Auto Repair</h5>
                <div>
                  91 Outer Drive<br />
                  Silver Bay, MN 55614
                  <p>
                    <strong>Phone:</strong>
                    <br />
                    (218) 226-4300
                  </p>
                </div>
              </div>

              <div className="maincatbox flex-item">
                <h5>Don’s Auto</h5>
                <div>
                  6636 Hwy 1<br />
                  Finland, MN 55603
                  <p>
                    <strong>Phone: </strong>
                    <br />
                    (218) 353-7791
                  </p>
                </div>
              </div>

              <div className="maincatbox flex-item">
                <h5>Riverside Repair</h5>
                <div>
                  6746 Riverside Dr.<br />
                  Finland, MN 55603
                  <p>
                    <strong>Phone: </strong>
                    <br />
                    (218) 353-7383
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>
          <Link to="/1">Return to Kiosk</Link>
        </p>

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
