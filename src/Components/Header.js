import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cart } = useCart();

  return (
    <header className='header-content'>
      <nav>
        <Link to="/">Product List</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
      </nav>
    </header>
  );
};

export default Header;
