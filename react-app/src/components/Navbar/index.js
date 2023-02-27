// NavBar/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu';
import "./NavBar.css"

const NavBar = () => {
  return (
    <nav className='navbar-wrapper'>
      <NavLink to='/' exact={true} activeClassName='active' className="navbar-home-link">
        host-a-hound
      </NavLink>
      <NavLink to='/' exact={true} className="navbar-hosts">hosts</NavLink>
      <NavLink to='/hounds' exact={true} className="navbar-hounds">hounds</NavLink>
      <div className='navbar-position-wrapper'>
        <div className="navbar-link-wrapper">
          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
