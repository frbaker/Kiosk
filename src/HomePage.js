import React, {useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/1'); // Redirect to "/kiosk/1" after 1 minute
    }, 15000); // 15,000 milliseconds = 15 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);
  return (
    <div className="homePageContent">
      <div className="homePageContainer">
        <h1>Best of the NorthShore</h1>

        <h1>Welcome to Silver Bay!</h1>

        <p>Discover the beauty and charm of the North Shore of Lake Superior. Whether you're here for a relaxing getaway, an outdoor adventure, or to explore our unique local attractions, we’re thrilled to have you!</p>

        <p className="bold">Explore Our Highlights</p>

        <p>Scenic Views: Take in breathtaking vistas along our rugged shoreline and lush forests.
        Outdoor Activities: Enjoy hiking, fishing, and boating in our pristine natural surroundings.
        Local Attractions: Visit local shops, dine at cozy eateries, and experience the rich history and culture of our community.
        For more information on things to do, places to visit, and local events, please explore the options on this kiosk. If you need any assistance, don’t hesitate to ask!
        </p>
        <p>Thank you for visiting Silver Bay. We hope you have a memorable stay!</p>
        
        <p><Link to="/1">Return to Kiosk</Link></p>
        <p>This kiosk is provided by the Best of the North Shore (Silver Bay area tourism association), in cooperation with the Silver Bay Robotics team (3267) and design and software development by Jessica & Floyd Baker.</p> 
        
      </div>
    </div>
  );
}

export default HomePage;
