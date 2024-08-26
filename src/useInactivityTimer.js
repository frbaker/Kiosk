// useInactivityTimer.js
import { useEffect } from 'react';


const useInactivityTimer = (redirectUrl, timeout = 60000) => {

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.location.pathname !== redirectUrl){
            window.location.href = redirectUrl;
        }
      }, timeout);
    };

    const events = [
        'mousemove', 'keydown', 'scroll', 'click', 
        'touchstart', 'touchmove', 'touchend'
      ];

    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // Initialize timer on mount

    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [redirectUrl, timeout]);
};

export default useInactivityTimer;
