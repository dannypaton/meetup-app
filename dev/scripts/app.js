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

    this.fetchMeetups = this.fetchMeetups.bind(this)
    this.fetchRestaurants = this.fetchRestaurants.bind(this)
    this.fetchLocation = this.fetchLocation.bind(this)
  }

  fetchLocation(term) {
    if (!term) return;

    // users enters a search term
    this.setState({ searchTerm: term })
    
    // key, city
    const API_KEY = 'e261f184e7e19432d1c4c4178174d18';
    const city = 'results.city';

    // do the fetch GET request
    // make api call to /2/cities
    fetch(`https://api.meetup.com/2/cities?&sign=true&photo-host=public&query=${city}&page=20&key=${API_KEY}`)
    .then(response => {
      response.searchTerm;
      this.setState({ term: response.searchTerm});
      
      // when it finishes and you have your response then call the fetch meetups function:
      // take the lat and long from that response
      this.fetchMeetups(results.lat, results.lon);
    })
  }

  // make next api call to /find/upcoming_events with that lat and long
  // the response from that should have an array of events 
  // setState --> update the events

  // on each meet up card needs to have a button that is 'find restaurants near this meetup'
  // add onClick={() => {this.fetchRestaurants(this.props.lat, this.props.long)}} to each button


  fetchMeetups(lat, lon) {
    if (!lat || !lon) return;

    // key, lat, lon
    const API_KEY = 'e261f184e7e19432d1c4c4178174d18';
    const lat = 'results.lat';
    const lon = 'results.lon';

    // do the fetch GET request
    fetch(`https://api.meetup.com/find/upcoming_events?&send=true&photo-host=public&radius=10&lat=${lat}&lon=${lon}&key=${API_KEY}`)
    .then(response => {
      response.events
      this.setState({ events: response.events})
    })
  }

  fetchRestaurants(lat, lng) {
    // key, lat, lng
    const API_KEY = 'AIzaSyCz5aY9PL8W3G-ijl7Tvu_sRsX7U6QVTYU';
    const lat = 'results.geometry.location.lat';
    const lng = 'results.geometry.location.lng';

    // do the fetch GET request
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10&type=restaurant&key=${API_KEY}`)
    .then(response => {
      response.events
      this.setState({ events: response.events})
    })
  }

  render() {
    // console.log(this.state.searchTerm, 'search in app file')
    return (
      <div>
        <header>
          <SearchBar fetchLocation={this.fetchLocation}/>
        </header>
        <div>
          {this.state.events ?
            this.state.events.map((event) => {
              <MeetupCard {...event} fetchRestaurants={this.fetchRestaurants} />              
            }) 
            : ''
          }
        </div>
        <div>
          {this.state.restaurants ?
            this.state.restaurants.map((restaurant) => {
              <RestaurantCard {...restaurant} />              
            }) 
            : ''
          }
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));