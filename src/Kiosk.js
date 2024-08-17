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
  const [eventsContent, setEventsContent] = useState(null);
  const [eventsLoading, setEventsLoading] = useState(true); // Set loading for events
  const [eventsError, setEventsError] = useState(null);
  const [eventsYear, setEventsYear] = useState(null);

  useEffect(() => {
    const apiUrl = `http://axoncentral.com/kioskJSON.php?media=player&playerId=${id}`;
    const eventsUrl = `http://bestofthenorthshore.com/events-activities/kioskJSON.php`;

    // Fetch data from both sources when the component mounts
    const fetchData = async () => {
      try {
        const [apiResponse, eventsResponse] = await Promise.all([
          axios.get(apiUrl),
          axios.get(eventsUrl)
        ]);

        // Handle the first API response
        const adData = apiResponse.data.data.ads.ads || [];
        const hostName = apiResponse.data.data.playerName || [];
        setAds(adData);
        setHostName(hostName);

        // Handle the second API response (events)
        const eventData = eventsResponse.data.data.events.events || [];
        const eventsYear = eventsResponse.data.data.events.year || [];
        setEventsContent(eventData); // Assuming events data is directly available here
        setEventsYear(eventsYear); // Assuming events data is directly available here
      } catch (err) {
        setError('Under development access not allowed - Unless you are Floyd');
        setEventsError('Failed to fetch events data'); // Handle events error
      } finally {
        setLoading(false); // Stop loading main content
        setEventsLoading(false); // Stop loading events
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

  const eventSliderSettings = {
    dots: false,
    infinite: true,
    className: "events",
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    //vertical: true, // Enable vertical scrolling
    //verticalSwiping: true, // Enable swiping in the vertical direction
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: false,
    adaptiveHeight: true,
    variableHeight:false,
    pauseOnHover: true,
  };

  return (
    <div>
      <div style={{ width: '58%', float: 'left' }}>
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
      <div style={{ width: '40%', backgroundColor: 'white', float: 'right' }}>
        <h3 style={{ textAlign: 'center' }}>Best Of the North Shore</h3>
        <h4 style={{ textAlign: 'center' }}>{eventsYear} Events Calendar</h4>
        {eventsLoading && <p>Loading events...</p>} {/* Show loading for events */}
        {eventsError && <p>{eventsError}</p>} {/* Show error message for events */}
        {eventsContent && (
          <div className="slider-container">
            <Slider {...eventSliderSettings}>
              {eventsContent.map((event, index) => (
                <span key={index} style={{backgroundColor:'grey', border:'solid 1px black'}}>
                  <p>{event.location}<br />{event.startDate} - {event.enddate}</p>
                  <h3>{event.title}</h3>
                  <span dangerouslySetInnerHTML={{ __html: event.description }} />
                  <hr />
                </span>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}

export default Kiosk;
