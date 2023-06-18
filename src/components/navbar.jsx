import React from 'react';

const Navbar = ({ title }) => {
  return (
    <div className='navbar'>
      <span className='navbar__title'>{title}</span>
    </div>
  );
};

export default Navbar;