import './App.css';
import {Component} from "react";

function Character(props) {
  return (
    <div className="characterInfo">
      <img src={props.avatar} alt="Avatar of character"/>
      <p><strong><u>Name:</u></strong> {props.name}</p>
      <p><strong><u>Species:</u></strong> {props.species}</p>
      <p><strong><u>Gender:</u></strong> {props.gender}</p>
      <p><strong><u>Location:</u></strong> {props.location}</p>
    </div>
  )
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      status: 'Alive',
      results: null
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // If no name is input it will fetch all characters of the chosen status
    fetch('https://rickandmortyapi.com/api/character?name=' + this.state.name + '&status=' + this.state.status)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          results: data.results,
        })
      })
      .catch(console.log)
    event.preventDefault();
  }

  render () {
    let characters = []
    if (this.state.results){
      this.state.results.forEach(obj => { characters.push(<Character key={obj.id}
                                                                             name={obj.name}
                                                                             species={obj.species}
                                                                             gender={obj.gender}
                                                                             location={obj.location.name}
                                                                             avatar={obj.image} />)})
    }
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Character Name" name="name" value={this.state.name} onChange={this.handleInputChange} />
            <select name="status" value={this.state.status} onChange={this.handleInputChange}>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="Unknown">Unknown</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
          {characters}
        </header>
      </div>
    )
  };
}

export default App;
