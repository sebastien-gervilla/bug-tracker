import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from '../utils/api-fetch';
import SideBar from '../components/SideBar';
import ProfileCard from '../components/ProfileCard';

const AppProfile = () => {

    const navigate = useNavigate();

    const getIsLogged = () => {
        fetchApi('account/isauth', 'GET', null, (data) => {
            if (data.success !== true)
                navigate('../../account/login');
        });
    }; getIsLogged();

    const logOut = () => {
        fetchApi('account/logout', 'POST', null, (data) => {
            if (data.success === true)
                getIsLogged();
        });
    };

    return (
        <section id='profile-area'>
            <div className="app-content" id='profile-content'>
                <SideBar />
                <section className='side-content'>
                    <ProfileCard logOut={logOut} />
                </section>
            </div>
        </section>
    );
};

export default AppProfile;