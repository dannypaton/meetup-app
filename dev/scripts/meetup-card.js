import React from 'react';

class MeetupCard extends React.Component {
    render() {
      // console.log(this, 'this inside the meetup card');
      return (
        <div className="meetupCard">
            <div className="meetupCard_show">
              <h2>Meetup Name: {this.props.name}</h2>
              <p>Location: {this.props.group.localized_location}</p>
              {this.props.local_date ? <p>Start Date and Time: {this.props.local_date} at {this.props.local_time}</p> : ''}
              <p>RSVP Count: {this.props.yes_rsvp_count}</p>
              <p>Meetup Group Name: {this.props.group.name}</p>
              <p>Link to Meetup: <a href={this.props.link}>{this.props.link}</a></p>
              <button onClick={() => {this.props.fetchRestaurants(this.props.lat, this.props.lng)}}>
              find restaurants near this meetup</button>
            </div>
        </div>
      )
    }
}

export default MeetupCard