import React from 'react';
import Nav from './Nav';
import logo from '../assets/images/logo.png';

const SideBar = () => {

    return (
        <div className="side-bar" id="side-bar">
            <div className="brand">
                <img src={logo} alt="Website Logo" />
                <h1>BugTracker</h1>
            </div>
            <Nav />
        </div>
    );
};

export default SideBar;