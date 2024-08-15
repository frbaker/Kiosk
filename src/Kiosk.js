import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function Kiosk() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true); // Start loading initially
  const [error, setError] = useState(null);
  const [ads, setAds] = useState([]);
  const [hostName, setHostName] = useState([]);

  useEffect(() => {
    const apiUrl = `http://axoncentral.com/kioskJSON.php?media=player&playerId=${id}`;
    
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const adData = response.data.data.ads.ads || [];
        const hostName = response.data.data.playerName || [];
        setAds(adData);
        setHostName(hostName);
      } catch (err) {
        setError('Under development access not allowed - Unless you are Floyd'); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData(); // Call the fetchData function
  }, [id]); // Run the effect whenever the id changes

  // Slider settings for react-slick
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: true
  };

  return (
    <div>
      <div style={{ width : '70%', float : 'left'}}>
      <h1 style={{ textAlign: 'center', color: 'white' }}>Welcome to {hostName}</h1>
      {loading && <p>Loading content...</p>} {/* Show loading message */}
      {error && <p>{error}</p>} {/* Show error message */}
      {ads.length > 0 && (
        <Slider {...settings}>
          {ads.map((ad, index) => (
            <div key={index}>
              {ad.type === "image" && (
                <img 
                  src={`http://axoncentral.com${ad.url}`} 
                  alt={`Ad ${index + 1}`} 
                  style={{ width: '100%', height: 'auto' }} 
                />
              )}
              {ad.type === "iframe" && (
                <iframe 
                  src={ad.url} 
                  title={`Ad ${index + 1}`} 
                  style={{ width: '100%', height: '500px', border: 'none' }} 
                  allowFullScreen 
                />
              )}
              {ad.type !== "iframe" && (
                <img 
                  src={`data:image/png;base64,${ad}`}
                  alt={`Ad ${index + 1}`} 
                  style={{ width: '100%', height: 'auto' }} 
                />
              )}
            </div>
          ))}
        </Slider>
      )}
      </div>
      <div style={{ width: '30%', backgroundColor: 'white', float: 'right' }}>
        <h3 style={{textAlign: 'center'}}>Best Of the North Shore</h3>
        <h4 style={{textAlign: 'center'}}>Events Calendar</h4>
      
      </div>
    </div>
  );
}

export default Kiosk;
