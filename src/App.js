import { useState, useEffect } from 'react';

function App() {

  const [pokedex, setPokedex] = useState([]);
  const [wildPokemon, setWildPokemon] = useState({});

  // useEffect is like componentDidMount
  useEffect(() => {
    
  }, [pokedex]) // Will call every time the state "pokedex" updates

  return (
    <div className="App">
      App test, test!!
    </div>
  );
}

export default App;
