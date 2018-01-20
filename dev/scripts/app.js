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
      restaurants: []
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
      this.setState({ term: response.searchTerm });

      // when it finishes and you have your response then call the fetch meetups function
      // take the latitude and longitude from that response
      this.fetchMeetups(response.results[0].lat, response.results[0].lon);
    })
  }

  fetchMeetups(lat, lon) {
    if (!lat || !lon) return;
    const API_KEY = 'e261f184e7e19432d1c4c4178174d18';

    // make next api call to /find/upcoming_events with that latitude and longitude 
    // do the fetch request
    fetch(`https://api.meetup.com/find/upcoming_events?&send=true&photo-host=public&radius=10&page=6&lat=${lat}&lon=${lon}&key=${API_KEY}`)
    .then(response => response.json())  
    .then(response => {
      response.events;

      this.setState({ events: response.events})
      this.fetchRestaurants(response.events[0].group.lat, response.events[0].group.lon);
    })
  }

  fetchRestaurants(lat, lng) {
    // key, lat, lng
    const API_KEY = 'AIzaSyCz5aY9PL8W3G-ijl7Tvu_sRsX7U6QVTYU';
    const lati = lat;
    const long = lng;

    // do the fetch GET request
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lati},${long}&radius=100&type=restaurant&key=${API_KEY}`)
    .then(response => response.json())
    .then(response => {
      console.log(response.results, 'fetchRestaurants fetch request');
      response.restaurants;

      this.setState({ restaurants: response.results});
    })
  }

  render() {
    // console.log(this.state.searchTerm, 'search in app file')
    return (
      <div>
        <header>
          <SearchBar fetchLocation={this.fetchLocation} />
        </header>
        <div>
          {this.state.events ?
            this.state.events.map((event) => {
              return <MeetupCard {...event} fetchRestaurants={this.fetchRestaurants} />              
            }) 
            : ''
          }
        </div>
        <div>
          {this.state.restaurants ?
            this.state.restaurants.map((restaurant) => {
              return <RestaurantCard {...restaurant} />              
            }) 
            : ''
          }
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));