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
            return <li><NavLink className={manageClassName} to='/app/team' >Equipe</NavLink></li>
    };

    const manageClassName = ({ isActive }) => isActive ? "active" : "";

    return (
        <nav>
            <ul>
                <li><NavLink className={manageClassName} to='/app/profile' >Profile</NavLink></li>
                <li><NavLink className={manageClassName} to='/app/projects' >Projets</NavLink></li>
                {manageNavLinks()}
                {/* <li><NavLink to='/' >Tickets</NavLink></li> */}
            </ul>
        </nav>
    );
};

export default Nav;