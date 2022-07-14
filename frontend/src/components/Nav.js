import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to='/app/projects' >Projets</NavLink></li>
                <li><NavLink to='/app/team' >Equipe</NavLink></li>
                {/* <li><NavLink to='/' >Tickets</NavLink></li> */}
                <li><NavLink to='/app/profile' >Profile</NavLink></li>
            </ul>
        </nav>
    );
};

export default Nav;