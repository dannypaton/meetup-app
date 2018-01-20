import React from 'react';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
        searchTerm: '' 
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.fetchLocation(this.state.searchTerm)
  }

  render() {
    return (
      <div className="searchBar">
        <form onSubmit={this.handleSubmit} >
          <h1>Search for meetup's in your city!</h1>
          <input type="text" value={this.state.searchTerm} onChange={this.handleChange} className="location" name="searchTerm" />
          <input className="search button purple" type="submit" />
        </form>
      </div>
    )
  }
}

export default SearchBar
