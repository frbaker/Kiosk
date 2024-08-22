import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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

  const adsVersionUrl = `http://axoncentral.com/ads-version.php`;
  const eventsVersionUrl = `http://bestofthenorthshore.com/events-version.php`;
  const weatherUrl = `https://api.weather.gov/gridpoints/DLH/117,94/forecast`;

  const apiUrl = `http://axoncentral.com/kioskJSON.php?media=player&playerId=${id}`;
  const eventsUrl = `http://bestofthenorthshore.com/events-activities/kioskJSON.php`;

  useEffect(() => {
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
  }, [id]);

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
    <div className="grid-container">
      <div className="ads">
        <h1>Welcome to the North Shore</h1>
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
        <h3 style={{ textAlign: 'center' }}>Best Of the North Shore</h3>
        <h4 className="eventCal">Area Events</h4>
        <p className="eventSwipe">Swipe to navigate</p>
        {eventsLoading && <p>Loading events...</p>}
        {eventsError && <p class="fetchError">{eventsError}</p>}
        {eventsContent && (
          <div className="slider-container events-slide">
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
    </div>
  );
}

export default Kiosk;
