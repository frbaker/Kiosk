import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import BurgerMenu from './BurgerMenu';

function Kiosk() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ads, setAds] = useState([]);
  const [eventsContent, setEventsContent] = useState(null);
  const [weather, setWeather] = useState(null);
  const [adsLoading, setAdsLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [adsError, setAdsError] = useState(null);
  const [eventsError, setEventsError] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [time, setTime] = useState(new Date());
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const [touchPosition, setTouchPosition] = useState(null);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setTouchPosition(null);
  };

  const toggleHelp = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsHelpOpen(false);
    }
  };

  const adsVersionUrl = `http://axoncentral.com/ads-version.php?media=player&playerId=${id}`;
  const eventsVersionUrl = `http://bestofthenorthshore.com/events-version.php`;
  const weatherUrl = `https://api.weather.gov/gridpoints/DLH/117,94/forecast`;

  const apiUrl = `http://axoncentral.com/kioskJSON.php?media=player&playerId=${id}`;
  const eventsUrl = `http://bestofthenorthshore.com/events-activities/kioskJSON.php`;

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date());
    };

    // Update time immediately
    updateTime();

    const intervalId = setInterval(updateTime, 1000*60);



    const fetchAds = async () => {
      try {
        const adsVersionResponse = await axios.get(adsVersionUrl);
        const adsVersion = adsVersionResponse.data.version;
        const cachedAdsVersion = localStorage.getItem('adsVersion');

        if (String(cachedAdsVersion) === String(adsVersion)) {
          setAds(JSON.parse(localStorage.getItem('ads')) || []);
        } else {
          const adsResponse = await axios.get(apiUrl);
          const adData = adsResponse.data.data.ads.ads || [];
          setAds(adData);
          localStorage.setItem('ads', JSON.stringify(adData));
          localStorage.setItem('adsVersion', adsVersion);
        }
      } catch (err) {
        setAdsError('Failed to fetch ads');
        setAds(JSON.parse(localStorage.getItem('ads')) || []);
      } finally {
        setAdsLoading(false);
      }
    };

    const fetchEvents = async () => {
      try {
        const eventsVersionResponse = await axios.get(eventsVersionUrl);
        const eventsVersion = eventsVersionResponse.data.version;
        const cachedEventsVersion = localStorage.getItem('eventsVersion');

        if (String(cachedEventsVersion) === String(eventsVersion)) {
          setEventsContent(JSON.parse(localStorage.getItem('events')) || []);
        } else {
          const eventsResponse = await axios.get(eventsUrl);
          const eventData = eventsResponse.data.data.events.events || [];
          setEventsContent(eventData);
          localStorage.setItem('events', JSON.stringify(eventData));
          localStorage.setItem('eventsVersion', eventsVersion);
        }
      } catch (err) {
        setEventsError('Failed to fetch events');
        setEventsContent(JSON.parse(localStorage.getItem('events')) || []);
      } finally {
        setEventsLoading(false);
      }
    };

    const fetchWeather = async () => {
      const cachedWeatherTimestamp = localStorage.getItem('weatherTimestamp');
      const cachedWeatherData = JSON.parse(localStorage.getItem('weather'));
      const currentTime = new Date().getTime();
      const weatherTimestamp = cachedWeatherTimestamp ? parseInt(cachedWeatherTimestamp, 10) : 0;

      if ((currentTime - weatherTimestamp) < 4 * 60 * 60 * 1000) {
        setWeather(cachedWeatherData);
        setWeatherLoading(false);
        return;
      }

      try {
        const weatherResponse = await axios.get(weatherUrl);
        const weatherData = weatherResponse.data.properties.periods || [];
        setWeather(weatherData);
        localStorage.setItem('weather', JSON.stringify(weatherData));
        localStorage.setItem('weatherTimestamp', new Date().getTime().toString());
      } catch (err) {
        setWeatherError('Failed to fetch weather data');
        setWeather(cachedWeatherData);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchAds();
    fetchEvents();
    fetchWeather();

    const video = document.getElementById('smadVideo');
    video.play().catch((error) => {
      console.error('Autoplay failed:', error);
    });

    const interval = setInterval(() => {
      fetchAds();
      fetchEvents();
      fetchWeather();
    }, 90 * 60 * 1000); // Check for updates every 90 minutes

    return () => {
      clearInterval(interval); // Clear time update interval
      clearInterval(intervalId); // Clear data fetch interval
    };
  }, [id]);

  // Function to format the time as 'Sun Aug 25 9:30 AM'
  const formatTime = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12; // Convert 24-hour to 12-hour format
    const formattedMinute = minute < 10 ? `0${minute}` : minute; // Add leading zero for minutes

    return `${dayName} ${monthName} ${day} ${formattedHour}:${formattedMinute} ${isPM ? 'PM' : 'AM'}`;
  };

  const sliderSettings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: true,
  };

  const eventSliderSettings = {
    dots: false,
    infinite: true,
    className: "events",
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: false,
    adaptiveHeight: true,
    variableHeight: false,
    pauseOnHover: true,
  };

  return (
    <div className="grid-container touch-area"
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
  >
    {touchPosition && (
        <div
          className="touch-highlight"
          style={{
            top: `${touchPosition.y}px`,
            left: `${touchPosition.x}px`,
          }}
        />
      )}
      <div className="header"><BurgerMenu /><img src="/kiosk/welcome.png" alt="welcome" /><span className="toTheHost">TO THE NORTH SHORE</span></div>
      <div className="ads">
        {adsLoading && <p>Loading ads...</p>}
        {adsError && <p class="fetchError">{adsError}</p>}
        {ads.length > 0 && (
          <Slider {...sliderSettings}>
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
      <div className="smads">
      
      <video id="smadVideo" src="SBJan11th2024flyover.mp4" autoplay loop muted playsinline>
        Your browser does not support the video tag.
      </video>

      </div>
      <div className="qr">
        <img src="/kiosk/scanToTake.png" alt="Scan to take" /><br />
        <img src="/kiosk/qr.png" alt="qr" /><br />
        <img src="/kiosk/thisInfoWithYou.png" alt="This info with you" />
      </div>
      <div className="help"><section onTouchStart={toggleHelp}><img src="/kiosk/help.png" alt="help" /></section></div>
      {isHelpOpen && (
        <div className="help-overlay" onClick={handleOverlayClick}>
          <div className="help-content">
            <button className="close-button" onClick={toggleHelp}>
              &times;
            </button>
            <h2>This is a Help?</h2>
            <h1>Figure it out yourself!</h1>
            
            <h2 className="helpHeader">Menu/Navigation</h2>
            <p>Our menu helps you to easily navigate to different areas of the kiosk without cluttering the main screen.</p>
            <h3>How to Find and Use the Menu</h3>
            <ul>
              <li>The menu icon looks like three horizontal lines stacked on top of each other found in the top left corner of the screen.</li>
              <li>Touch or click the menu icon and the navigation options will slide into view.</li>
              <li>Touch or click on any menu item to navigate to the desired section or feature.</li>
              <li>Touch or click outside of the menu area to close the navigation options.</li>
            </ul>

            <h2 className="helpHeader">Ads</h2>
            <p>Ads on our kiosk provide a targeted way to showcase local attractions, businesses, and events to visitors, enhancing your experience by offering relevant information and opportunities. They also generate revenue for the kiosk operator, benefit the local high school robotics team and help in supporting the sustainability of tourism services.</p>
            <p>To have your ad placed here, contact info@bestofthenorthshore.com or any member of the Silver Bay Robotics team.</p>
            <h3>Scrolling through ads</h3>
            <ul>
              <li>Swipe left or right on any ad to navigate to the next ad</li>
              
            </ul>

            <h2 className="helpHeader">Event Calendar</h2>
            <p>Our event calendar helps you discover local activities, festivals, and events, enhancing your Silver Bay area experience by offering up-to-date information on what's happening in the area. It provides a convenient resource for planning and enjoying your visit.</p>
            <p>To have your events highlighted here, contact info@bestofthenorthshore.com or any member of the Silver Bay Robotics team.</p>
            
            <h3>Scrolling through events</h3>
            <ul>
              <li>Swipe left or right on any event to navigate to the next event</li>
              <li>When the text for an event doesn't fit, you can scroll down within the event section to view the rest.</li>
              <li>Scan the QR code with your mobile phone to take the events with you on your own device!</li>
            </ul>

            <h2 className="helpHeader">Scan the QR Code</h2>
            <p>QR codes (Quick Response codes) are a type of barcode that can be scanned with a smartphone or tablet to quickly access information or links. Open your device’s camera or a QR code scanning app, point it at the code, and follow the on-screen prompts to take all of the information on this kiosk with you!</p>
            
            <h2 className="helpHeader">Things To Do Nearby</h2>
            <p>Our things to do section shows some suggestions of things to do in the area!</p>
            
            <h3>Navigating the "Things To Do" Section</h3>
            <ul>
              <li>Tap on any item to view more information!</li>
              <li>Use the arrows to view additional suggestions or return to one that is no longer visible</li>
           </ul>

           <h2 className="helpHeader">Weather</h2>
            <p>Our weather forecast shows the weather predictions for the next few days</p>
            
            <h3>View More Weather</h3>
            <ul>
              <li>Tap on the weather section to show up to a week forecast</li>
            </ul>
            
          </div>
        </div>
      )}
      
      <div className="tdd"><img src="/kiosk/tdd.png" alt="tdd" /></div>
      
      <div className="weather">
        <h1>Silver Bay Weather</h1>
        {weatherLoading && <p>Loading weather...</p>}
        {weatherError && <p class="fetchError">{weatherError}</p>}
        {weather && (
          <div className="weather-container flex-container">
            {weather.map((period, index) => (
              index < 6 && (
                <div className="flex" key={index}>
                  <h3 className="weatherHeader">{period.name}</h3>
                  <p>{period.detailedForecast}</p>
                </div>
              )
            ))}
          </div>
        )}
      </div>
      <div className="events">
        <h2 className="eventsHeader">Area Events</h2>
        
        {eventsLoading && <p>Loading events...</p>}
        {eventsError && <p class="fetchError">{eventsError}</p>}
        {eventsContent && (
          <div className="slider-container events-slide">
            <p className="time">{formatTime(time)}</p>
         <p className="eventSwipe">Swipe to navigate</p>
            <Slider {...eventSliderSettings}>
              {eventsContent.map((event, index) => (
                <span key={index} style={{backgroundColor:'grey', border:'solid 1px black'}}>
                  <p><span className="eventDate">{event.startDate} {event.endDate}</span><br />
                    <span className="eventTime">{event.startTime} - {event.endTime}</span><br />
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
      <div className="footer"><img src="/kiosk/footer.png" alt="footer" /></div>
    </div>
    
  );
}

export default Kiosk;
