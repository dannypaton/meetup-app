import React from 'react';

class RestaurantCard extends React.Component {
    render() {
      // console.log(this, 'this inside the restaurants card');
      return (
        <div className="restaurantCard">
            <div className="restaurantCard_show">
              <h2>Restaurant Name: {this.props.name}</h2>
              <p>Address: {this.props.vicinity}</p>
            </div>
        </div>
      )
    }
}

export default RestaurantCard