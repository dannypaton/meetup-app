'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './searchbar.js';
import MeetupCard from './meetup-card.js';
import RestaurantCard from './restaurant-card.js';
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTerm: '',
      events: [],
      restaurants: [],
      searchTermLat: 0,
      searchTermLon: 0
    }

    this.fetchLocation = this.fetchLocation.bind(this)
    this.fetchMeetups = this.fetchMeetups.bind(this)
    this.fetchRestaurants = this.fetchRestaurants.bind(this)
  }

  fetchLocation(term) {
    if (!term) return;
    // users enters a search term
    this.setState({ searchTerm: term })

    // api key, city
    const API_KEY = 'e261f184e7e19432d1c4c4178174d18';
    const city = term;

    // do the fetch request
    // make api call to /2/cities
    fetch(`https://api.meetup.com/2/cities?&sign=true&photo-host=public&query=${city}&page=1&key=${API_KEY}`)
    .then(response => response.json())
    .then(response => {
      // push the response to searchTerm in state
      this.setState({ term: response.searchTerm, searchTermLat: response.results[0].lat, searchTermLon: response.results[0].lon });

      // when it finishes and you have your response then call the fetch meetups function
      // take the latitude and longitude from that response
      this.fetchMeetups(this.state.searchTermLat, this.state.searchTermLon);
    })
  }
  
  fetchMeetups() {
    const API_KEY = 'e261f184e7e19432d1c4c4178174d18';
    
    // make next api call to /find/upcoming_events with that latitude and longitude 
    // do the fetch request
    fetch(`https://api.meetup.com/find/upcoming_events?&send=true&photo-host=public&radius=10&page=6&fields=group_key_photo&lat=${this.state.searchTermLat}&lon=${this.state.searchTermLon}&key=${API_KEY}`)
    .then(response => response.json())  
    .then(response => {
      response.events;
      console.log(response.events, ' inside search click')
      
      this.setState({ events: response.events});
    })
  }

  fetchRestaurants(eventLocation) {
    // key, lat, lng
    const API_KEY = 'AIzaSyCz5aY9PL8W3G-ijl7Tvu_sRsX7U6QVTYU';
    let lati = this.state.searchTermLat;
    let long = this.state.searchTermLon;
    if (eventLocation !== null && (eventLocation.lat && eventLocation.lon)) {
      lati = eventLocation.lat;
      long = eventLocation.lon;
    }

    // // do the fetch GET request
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lati},${long}&radius=5000&type=restaurant&key=${API_KEY}`)
    .then(response => response.json())
    .then(response => {
      console.log(response.results, 'fetchRestaurants fetch request');
      response.restaurants;

      this.setState({ restaurants: response.results});
    })
  }

  render() {
    return (
      <div>
        <header>
          <SearchBar fetchLocation={this.fetchLocation} />
        </header>
        <div className="meetupCard">
          {this.state.events ?
            this.state.events.map((event, i) => {
              return <MeetupCard key={i} {...event} fetchRestaurants={this.fetchRestaurants} />              
            }) 
            : ''
          }
        </div>
        <div>
          {this.state.restaurants ?
            this.state.restaurants.map((restaurant, i) => {
              return <RestaurantCard key={i} {...restaurant} />              
            }) 
            : ''
          }
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));