import React, { useEffect } from 'react';
import Nav from './Nav';
import logo from '../assets/images/logo.png';

const SideBar = () => {

    useEffect(() => adaptHeight(), []);

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

const adaptHeight = () => {
    const sideBar = document.getElementById('side-bar');
    if (window.innerHeight > sideBar.style.height)
        sideBar.style.height = window.innerHeight;
};

export default SideBar;