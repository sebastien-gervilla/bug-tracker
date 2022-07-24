import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchApi } from '../utils/api-fetch';

const Nav = () => {

    const [userRole, setUserRole] = useState('Développeur');

    useEffect(() => {
        fetchApi('account/', 'GET', null, (data) => {
            if (data.success === true)
                if (JSON.stringify(data.user.role) !== JSON.stringify(userRole))
                    setUserRole(data.user.role);
        });
    }, [userRole])

    const manageNavLinks = () => {
        if (userRole === 'Admin')
            return <li><NavLink to='/app/team' >Equipe</NavLink></li>
    }

    return (
        <nav>
            <ul>
                <li><NavLink to='/app/projects' >Projets</NavLink></li>
                {manageNavLinks()}
                {/* <li><NavLink to='/' >Tickets</NavLink></li> */}
                <li><NavLink to='/app/profile' >Profile</NavLink></li>
            </ul>
        </nav>
    );
};

export default Nav;