import React from 'react';

function HomePage() {
  return (
    <div class="homePageContent">
      <h1>Best of the NorthShore</h1>
      <p>If you have to ask, You've never been there.</p>
<ul>
  <li>Welcome Message - brief intro to the community/area</li>
  <li>Local Announcements / info
    <ul>
      <li>School events</li>
      <li>Community meetings</li>
      <li>government
        <ul>
          <li>Municipal services</li>
          <li>Contact info</li>
          <li>Public Meetings</li>
          <li>Permits and licensing</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>Business directory
    <ul>
      <li>Job listings</li>
    </ul>
  </li>
  <li>government services</li>
  <li>Weather conditions</li>
  <li>Transportation schedule /options
    <ul>
      <li>Silver Bay Shuttle Service</li>
      <li>Cadilac Cab</li>
    </ul>
  </li>
  <li>Events Calendar
    <ul>
      <li>Upcoming Events</li>
      <li>Festivals
        <ul>
          <li>Bay Days</li>
          <li>Music in the Park</li>
        </ul>
      </li>
      <li>Things To Do</li>
      <li>Dining/Entertainement</li>
      <li>Accomodations</li>
      <li>Visitor information
        <ul>
          <li>Maps
            <ul>
              <li>Save your map / trip planner</li>
            </ul>
          </li>
          <li>Tips</li>
          <li>Travel Guide</li>
        </ul>
      </li>
      <li>Club meetings/sports leagues</li>
      <li>Garage sales</li>
      <li>Event Submission - option for locals to submit events for inclussion</li>
    </ul>
  </li>
  <li>Real Estate</li>
  <li>Classified
    <ul>
      <li>Buy / Sell / Trade</li>
      <li>Lost and Found</li>
    </ul>
  </li>
  <li>Interactive Maps
    <ul>
      <li>Map showing key points of interest</li>
      <li>Customizable map - scan QR to take with you</li>
      </ul></li>
</ul>

<p>Inclussion of these components would create a go-to resource for everything to the local area - fostering community engagement and making the area more accessible to both residents and visitors.</p>
      <ul>
      <li><a href="/kiosk/1">Kiosk 1</a></li>
      <li><a href="/kiosk/2">Kiosk 2</a></li>
      <li><a href="/kiosk/3">Kiosk 3</a></li>
      </ul>
    </div>
  );
}

export default HomePage;
