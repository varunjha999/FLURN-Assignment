import React, { useState } from 'react';
import SearchIcon from '../assets/icons/busqueda.svg';

const Search = ({ onHandleSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) onHandleSearch(null);
  };

  const handleClickSearch = (e) => {
    if (e.keyCode === 13 || e.type === 'click') {
      e.preventDefault();
      onHandleSearch(search);
    }
  };

  return (
    <div className='search'>
      <div className="search__wrapper">
        <input
          className='search__input'
          type="search"
          onChange={handleSearch}
          placeholder='Search your pokemon ...'
          onKeyDown={handleClickSearch}
          autoFocus
        />
        <img className='search__icon' src={SearchIcon} alt="" />
      </div>
      <button className='search__button' style={{ color: 'white' }}
       onClick={handleClickSearch}>Search</button>
    </div>
  );
};

export default Search;