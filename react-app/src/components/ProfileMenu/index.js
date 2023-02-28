// ProfileMenu/index.js

import LogoutButton from '../auth/LogoutButton';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { login } from '../../store/session'
import "./ProfileMenu.css"

const ProfileMenu = () => {
    const sessionUser = useSelector(state => state.session.user)
    const [toggleProfileMenu, setToggleProfileMenu] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory()

    // logs in demo user with one click
    const loginDemoUser = async () => {
        await dispatch(login('demo@aa.io', 'password'));
        await history.push('/')
    }

    // opens profile menu
    const openProfileMenu = () => {
        if (toggleProfileMenu) return;
        setToggleProfileMenu(true);
    };


    // hook to close profile menu if user clicks off of it
    useEffect(() => {
        if (!toggleProfileMenu) return;

        const closeProfileMenu = () => {
            setToggleProfileMenu(false);
        };

        document.addEventListener('click', closeProfileMenu);

        return () => document.removeEventListener("click", closeProfileMenu);
    }, [toggleProfileMenu]);

    // changes class of menu based on state of toggleProfileMenu (true it shows, false it doesn't)
    let showProfileMenu
    if (toggleProfileMenu) {
        showProfileMenu = "profile-menu-wrapper"
    } else showProfileMenu = 'profile-hidden'

    // If user logged in, profile menu shows user options, otherwise it shows log in/sign up options
    let profileDetails
    if (sessionUser) {
        profileDetails = (
            <div className='navbar-profile-sessionuser-wrapper'>

                <NavLink to='/add-host' activeClassName='active' className='profile-add-link'>
                    Add host
                        </NavLink>
                <NavLink to='/add-hound' activeClassName='active' className='profile-add-link'>
                    Add hound
                        </NavLink>

            <div className='profile-wrapper'>
                <button className="profile-button" onClick={openProfileMenu}>
                    <span><i className="fas fa-user-circle" /> <i className="fa-solid fa-caret-down" /> </span>
                </button>
                <div className='profile-menu-wrapper'>
                    <div className={showProfileMenu}>
                        <div className='profile-menu-header'>
                            {/* <i className="fas fa-user-circle" /> */}
                            <span className='profile-menu-userinfo'> 
                            <div> 
                                {sessionUser.username}
                                </div>
                            <div>
                                {sessionUser.email}
                                </div>
                            </span>
                        </div>
                        <div className="profile-menu-navlinks">

                        <NavLink to={`/${sessionUser.id}/hosts`} activeClassName='active' className='profile-menu-item'>
                            <i className="fa-solid fa-list" /> Your hosts
                        </NavLink>
                        <NavLink to={`/${sessionUser.id}/hounds`} activeClassName='active' className='profile-menu-item'>
                            <i className="fa-solid fa-list" /> Your hounds
                        </NavLink>
                        {/* <NavLink to='/your-bookings' activeClassName='active' className='profile-menu-item'>
                            <i className="fa-regular fa-clipboard" /> <span> </span> Your bookings
                        </NavLink>
                        <NavLink to='/your-reviews' activeClassName='active' className='profile-menu-item star'>
                            <i className="fa-regular fa-star" /> Your reviews
                        </NavLink> */}
                        <LogoutButton />
                        </div>
                    </div>
                </div>
            </div >
            </div>
            
        )
    } else {
        profileDetails = (
            <>
                <button onClick={loginDemoUser} className='profile-demo-user-button'>
                    Demo user
                </button>
                <NavLink to='/log-in' activeClassName='active' className='profile-log-in-link'>
                    Log in
                </NavLink>
                <NavLink to='/sign-up' activeClassName='active' className='profile-sign-up-link'>
                    Sign up
                </NavLink>
            </>
        )
    }


    return (
        <>
            {profileDetails}
        </>
    )
}






export default ProfileMenu

