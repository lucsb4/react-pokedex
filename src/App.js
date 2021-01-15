import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [pokedex, setPokedex] = useState([]);
  const [wildPokemon, setWildPokemon] = useState({});

  useEffect(() => {
    encounterWildPokemon();
  }, []) // Will call every time the state "pokedex" updates

  const pokeId = () => {
    const min = Math.ceil(1);
    const max = Math.floor(151);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const encounterWildPokemon = () => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/' + pokeId())
      .then(response => {
        // console.log(response.data);
        setWildPokemon(response.data); 
        // As you can see, this function sets the variable wildPokemon to
        // response.data. It will be called every time the component is mounted. 
      })
  }

  const catchPokemon = pokemon => {
    setPokedex(state => { // Similar to "prevState"
      const monExists = (state.filter(p => pokemon.id == p.id).length > 0)

      if(!monExists)
      {
        state = [...state, pokemon];
        state.sort((a, b) => {
          return a.id - b.id
        })
      }
      return state;
    })
    encounterWildPokemon();
  }

  const removePokemon = id => {
    setPokedex(state => state.filter(p => p.id != id))
  }

  return (
    <div className="App">
      <header>
        <h1 className="title">React Hooks</h1>
        <h3 className="subtitle">With Pokémon</h3>
      </header>

      <section className="wild-pokemon">
        <h2>Wild Encounter</h2>
        <img
          src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + wildPokemon.id + ".png"}
          alt={wildPokemon.name + " sprite"}
          className="sprite"
        />
        <h3>{wildPokemon.name}</h3>
        <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>CATCH!</button>
      </section>

      <section className="pokedex">
        <h2>Pokédex</h2>
        <div className="pokedex-list">
          {pokedex.map(pokemon => (
            <div className="pokemon" key={pokemon.id}>
              <img
                src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"}
                alt={pokemon.name + " sprite"}
                className="sprite"
              />
              <h3 className="pokemon-name">{pokemon.name}</h3>
              <button className="remove-btn" onClick={() => removePokemon(pokemon.id)}>&times;</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;

  // In class components I would define pokedex and wildPokemon inside
  // this.state, inside the constructor, like:
  //
  // this.state = {
  //   pokedex = [],
  //   wildPokemon = []
  // }

  // useEffect is like componentDidMount.
  //
  // use of useEffect:
  // useEffect(callback function, state)
  //
  // I could leave state blank and it would update whenever *any* state is updated like:
  // useEffect(() => {/*function*/})
  //
  // or I could call it only once when the Component is mounted:
  // useEffect(() => {
  //   /*function*/}, [])
