import './App.css';
import React, {Component} from "react";
import PropTypes from 'prop-types';

function Character(props) {
  return (
    <div className="card character-card">
      <img className="card-img-top" src={props.avatar} alt="Avatar of character" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">Species: {props.species}</p>
          <p className="card-text">Gender: {props.gender}</p>
          <p className="card-text">Location: {props.location}</p>
        </div>
    </div>
  );
}

Character.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  species: PropTypes.string,
  gender: PropTypes.string,
  location: PropTypes.string,
}

function InformationMessage(props) {
  if (props.displayNotSearched) {
    return (
      <div className="information-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" fill="currentColor" className="bi bi-search"
             viewBox="0 0 16 16">
          <path fillRule="evenodd"
                d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
          <path fillRule="evenodd"
                d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
        </svg>
        <h3 className="information-message"> Please enter a character and status in the top right to search. </h3>
      </div>
    );
  } else if (props.displayNoResults) {
    return (
      <div className="information-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" fill="currentColor" className="bi bi-x"
             viewBox="0 0 16 16">
          <path fillRule="evenodd"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        <h3 className="information-message"> No results found. </h3>
      </div>
    );
  } else {
    return ("");
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      status: 'Alive',
      results: null,
      isSubmitted: false,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    // If no name is input it will fetch all characters of the chosen status
    fetch('https://rickandmortyapi.com/api/character?name=' + this.state.name + '&status=' + this.state.status)
      .then(res => res.json())
      .then((data) => {
        // isSubmitted updated to manage the search message shown upon opening the app
        this.setState({
          results: data.results,
          isSubmitted: true,
        });
      })
      .catch(console.log);

    event.preventDefault();
  }

  render () {
    let characters = [];
    let displayNoResults = false;
    let displayNotSearched = false;

    // Create an array of all character cards if this has been fetched
    if (this.state.results) {
      this.state.results.forEach((obj) => {
        characters.push(<Character
          key={obj.id}
          name={obj.name}
          species={obj.species}
          gender={obj.gender}
          location={obj.location.name}
          avatar={obj.image}
        />);
      });
    } else if (this.state.isSubmitted) {
      displayNoResults = true;
    } else {
      displayNotSearched = true;
    }

    return (
      <div className="App">
        <nav className="navbar navbar-dark">
          <p className="navbar-brand">Rick and Morty Character Search</p>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <input className="form-control mx-1" type="text" placeholder="Character Name" name="name" value={this.state.name} onChange={this.handleInputChange} />
            <select className="custom-select mx-1" name="status" value={this.state.status} onChange={this.handleInputChange}>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="Unknown">Unknown</option>
            </select>
            <input className="btn btn-secondary mx-1" type="submit" value="Submit" />
          </form>
        </nav>
          <div className="container">
            <div className="card-deck card-container justify-content-center">
              {characters}
            </div>
            <InformationMessage displayNoResults={displayNoResults} displayNotSearched={displayNotSearched} />
        </div>
      </div>
    );
  }
}

export default App;