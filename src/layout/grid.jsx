import React from 'react';
import Card from '../components/card';

const Grid = ({ pokemons, next }) => {
  const handleButton = () => {
    next();
  };

  return (
    <div className='grid'>
      <div className='grid__pokemon'>
        {pokemons.map((poke) => (
          <Card key={poke.name} pokemon={poke} />
        ))}
      </div>
      {pokemons.length >= 20 && (
        <div className="grid__wrapper-button">
          <button className='grid__button' type='button' onClick={handleButton}>Show more</button>
        </div>
      )}
    </div>
  );
};

export default Grid;