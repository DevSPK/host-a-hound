// NavBar/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu';
import "./NavBar.css"
import { useState } from 'react';

const NavBar = () => {

  const [toggleHound, setToggleHound] = useState(false)
  const [toggleHost, setToggleHost] = useState(false)

  function handleHoundToggle() {
    setToggleHound(true)
    setToggleHost(false)
  }

  function handleHostToggle() {
    setToggleHost(true)
    setToggleHound(false)
  }
  
  let toggleHostCheck = toggleHound ? ' highlight': "";
  let toggleHoundCheck = toggleHost ? ' highlight': "";

  return (
    <nav className='navbar-wrapper'>
      <NavLink to='/' exact={true} activeClassName='active' className="navbar-home-link">
        host-a-hound
      </NavLink>
      <div className="navbar-links">
      <>
      <NavLink to='/' exact={true} onClick={handleHostToggle} className={`navbar-hosts${toggleHostCheck}`}>hosts</NavLink>
      </>
      <>
      <NavLink to='/hounds' exact={true} onClick={handleHoundToggle} className={`navbar-hounds${toggleHoundCheck}`}>hounds</NavLink>
      </>
      </div>
      
        <div className="navbar-link-wrapper">
          <ProfileMenu />
        </div>
      
    </nav>
  );
}

export default NavBar;
