import React from 'react';

class RestaurantCard extends React.Component {
    render() {
      // console.log(this, 'this inside the restaurants card');
      return (
        <div className="restaurantCard">
            <div className="restaurantCard_show">
              <h2>Restaurant Name: {this.props.name}</h2>
              <p>Address: <a href={`https://www.google.com/maps/search/?api=1&query=${this.props.name}+${this.props.vicinity}`} target="_blank">{this.props.vicinity}</a></p>
              { this.props.icon ? <img src={this.props.icon} alt="Restaurant Icon" /> : '' }
              {/* <div style={ { backgroundImage: `url(${this.props.icon})`, 'height': '100px', 'width': '100px' } }></div> */}
            </div>
        </div>
      )
    }
}

export default RestaurantCard