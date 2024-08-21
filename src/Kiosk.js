import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Kiosk() {
  const { id } = useParams();
  //const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true); // Start loading initially
  const [error, setError] = useState(null);
  const [ads, setAds] = useState([]);
  //const [hostName, setHostName] = useState([]);
  const [eventsContent, setEventsContent] = useState(null);
  const [eventsLoading, setEventsLoading] = useState(true); // Set loading for events
  const [eventsError, setEventsError] = useState(null);
  //const [eventsYear, setEventsYear] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apiUrl = `http://axoncentral.com/kioskJSON.php?media=player&playerId=${id}`;
    const eventsUrl = `http://bestofthenorthshore.com/events-activities/kioskJSON.php`;
    const weatherUrl = `https://api.weather.gov/gridpoints/DLH/117,94/forecast`;

    // Fetch data from both sources when the component mounts
    const fetchData = async () => {
      try {
        const [apiResponse, eventsResponse, weatherResponse] = await Promise.all([
          axios.get(apiUrl),
          axios.get(eventsUrl),
          axios.get(weatherUrl)
        ]);

        // Handle the first API response
        const adData = apiResponse.data.data.ads.ads || [];
        //const hostName = apiResponse.data.data.playerName || [];
        setAds(adData);
        //setHostName(hostName);
        // Handle the second API response (events)
        const eventData = eventsResponse.data.data.events.events || [];
       //const eventsYear = eventsResponse.data.data.events.year || [];
        setEventsContent(eventData); // Assuming events data is directly available here
        //setEventsYear(eventsYear); // Assuming events data is directly available here
        // Handle the third API response (Weather)
        const weatherData = weatherResponse.data.properties.periods || [];
        setWeather(weatherData);
      } catch (err) {
        setError('Under development access not allowed - Unless you are Floyd');
        setEventsError('Failed to fetch events data'); // Handle events error
        setWeatherError('Failed to fetch Weather');
      } finally {
        setLoading(false); // Stop loading main content
        setEventsLoading(false); // Stop loading events
        setWeatherLoading(false); // Stop loading weather
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
    <div class="grid-container">
      <div class="ads">
        <h1>Welcome to The North Shore {/*hostName*/}</h1>
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
      <div class="weather">
        <div>
        <h1>Silver Bay Weather</h1>
        {weatherLoading && <p>Loading weather...</p>} {/* Show loading for weather */}
        {weatherError && <p>{weatherError}</p>} {/* Show error message for weather */}
        {weather && (
          <div className="weather-container flex-container">
            {weather.map((period, index) => (
              index < 6 && (
              <div class="flex">
                <h3 class="weatherHeader">{period.name}</h3>
                <p>{period.detailedForecast}</p>
              </div>
              )
            ))}
          </div>
        )}
       

        </div>

      </div>
      <div class="events">
        <h3 style={{ textAlign: 'center' }}>Best Of the North Shore</h3>
        <h4 class="eventCal">Area Events</h4>
        <p class="eventSwipe">Swipe to navigate</p>
        {eventsLoading && <p>Loading events...</p>} {/* Show loading for events */}
        {eventsError && <p>{eventsError}</p>} {/* Show error message for events */}
        {eventsContent && (
          <div className="slider-container events-slide">
            <Slider {...eventSliderSettings}>
              {eventsContent.map((event, index) => (
                <span key={index} style={{backgroundColor:'grey', border:'solid 1px black'}}>
                  <p><span class="eventDate">{event.startDate} {event.endDate}</span><br />
                    <span class="eventTime">{event.startTime} - {event.endTime}</span><br />
                    {event.location}</p>
                  <h3>{event.title}</h3>
                  <span dangerouslySetInnerHTML={{ __html: event.description }} />
                  <br /><br />
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
