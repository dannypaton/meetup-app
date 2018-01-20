import React from 'react';

class MeetupCard extends React.Component {
    render() {
      console.log(this, ' inside meetupcard component')
      const location = this.props.venue && this.props.venue.lat && this.props.venue.lon ? this.props.venue : null
      return (
          <div className="meetupCard_show">
            <h2>Meetup Name: {this.props.name}</h2>
            <p>Location: {this.props.group.localized_location}</p>
            {this.props.local_date ? <p>Start Date and Time: {this.props.local_date} at {this.props.local_time}</p> : ''}
            <p>RSVP Count: {this.props.yes_rsvp_count}</p>
            <p>Meetup Group Name: {this.props.group.name}</p>
            {this.props.group.key_photo.highres_link ? <img className="images" src={this.props.group.key_photo.highres_link} alt="Featured Thumbnail" /> : ''}
            <p><a href={this.props.link} target="_blank">Link to Meetup</a></p>
            <button className="button blue" onClick={() => {this.props.fetchRestaurants(location)}}>
            Find restaurants near this meetup</button>
          </div>
      )
    }
}

export default MeetupCard