import React, { useState, useEffect } from 'react';
import Search from './components/search';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Grid from './layout/grid';
import Container from './layout/container';
import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [total, setTotal] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const [search, setSearch] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (textSearch) => {
    if (!textSearch) {
      setSearch([]);
      setNotFound(false);
      return;
    }
    
    setNotFound(false);
    setSearching(true);
    
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${textSearch.toLowerCase()}`);
      const data = await response.json();
      
      setSearch([data]);
    } catch (error) {
      setNotFound(true);
    }

    setSearching(false);
  };

  const showPokemons = async (limit = 20, offset = 0) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const data = await response.json();

      const promises = data.results.map(async (pokemon) => {
        const result = await fetch(pokemon.url);
        const res = await result.json();
        return res;
      });

      const results = await Promise.all(promises);

      setPokemons((prevPokemons) => [...prevPokemons, ...results]);
      setNotFound(false);
      setTotal((prevTotal) => prevTotal + results.length);
    } catch (error) {
      console.log(error);
    }
  };

  const nextPokemon = () => {
    showPokemons(20, total);
  };

  useEffect(() => {
    if (!searching) {
      showPokemons();
    }
  }, [searching]);

  const poke = search.length > 0 ? search : pokemons;

  return (
    <>
      <Container>
        <Navbar title="Pokedex  App" />
        <Search onHandleSearch={handleSearch} />
        {notFound ? <div>'Pokemon not found'</div> : <Grid pokemons={poke} next={nextPokemon} />}
      </Container>
      <Footer />
    </>
  );
};

export default App;