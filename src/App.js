import './App.css';
import {Component} from "react";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Name: null,
      Species: null,
      Gender: null,
      Location: null,
      Avatar: null
    }
  }

  getCharacter() {
    // Generates a random integer 1-10
    const randomId = Math.floor(Math.random() * 10) + 1
    fetch('https://rickandmortyapi.com/api/character/' + randomId)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          Name: data.name,
          Species: data.species,
          Gender: data.gender,
          Location: data.location.name,
          Avatar: data.image
        })
      })
      .catch(console.log)
  }

  showImage() {
    if (this.state.Avatar){
      return (
        <img src={this.state.Avatar} alt="Avatar of character"/>
      )
    } else {
      return (
        <img src="https://via.placeholder.com/300" alt="Placeholder of character"/>
      )
    }
  }

  render () {
    return(
      <div className="App">
        <header className="App-header">
          <div className="characterInfo">
            {this.showImage()}
            <p><strong><u>Name:</u></strong> {this.state.Name}</p>
            <p><strong><u>Species:</u></strong> {this.state.Species}</p>
            <p><strong><u>Gender:</u></strong> {this.state.Gender}</p>
            <p><strong><u>Location:</u></strong> {this.state.Location}</p>
          </div>
          <button onClick={() => {this.getCharacter()}}>Get Character</button>
        </header>
      </div>
    )
  };
}

export default App;
