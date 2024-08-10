import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className='navbar'>
          <img className='img-logo' src='/img/img-iconos/logofinal.png' alt='logo' />
        <Link to='/carrito'>
          <img className='img-carrito' src='/img/img-iconos/carrito.png' alt='carrito' />
        </Link>
    </nav>
  );
};

export default NavBar;
