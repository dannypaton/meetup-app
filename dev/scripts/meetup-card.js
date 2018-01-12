import React from 'react';

class MeetupCard extends React.Component {
    render() {
      console.log(this, 'this inside the meetup card')
      return (
        <div class="meetupCard">
            <div class="meetupCard_show">
              <h2>Meetup Name: {this.props.events.name}</h2>
              <p>Start Date: {this.props.events.local_date}</p>
              <p>Start Time: {this.props.events.local_time}</p>
              <p>RSVP Count: {this.props.events.yes_rsvp_count}</p>
              <p>Group Name: {this.props.events.group.name}</p>
              <p>Venue: {this.props.events.venue.name}</p>
              <p>Venue Address: {this.props.events.venue.address_1}</p>
            </div>
        </div>
      )
    }
}

export default MeetupCard


/* <h2>{this.props.name}</h2> */