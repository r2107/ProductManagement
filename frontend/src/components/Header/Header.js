import React from 'react';
import './header.css';

const Header = (props) => {

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
  }

  const loggedIn = localStorage.getItem('auth-token') !== null;

  return (
    <div className='header'>
      <h1 className='name'><a href='/'>Product Management</a></h1>
      { loggedIn? 
        <a className='logout' href='/'><button className='btn' onClick={handleLogout}>Logout</button></a>:
        null
      }
    </div>
  )
}

export default Header;