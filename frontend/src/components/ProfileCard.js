import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from '../utils/api-fetch';
import { getUserDef } from '../utils/model-defaults';

const ProfileCard = ({ logOut }) => {

    const [userData, setUserData] = useState(getUserDef());

    const navigate = useNavigate();

    useEffect(() => getUserData());

    const getUserData = () => {
        fetchApi('account/', 'GET', null, (data) => {
            if (data.success === false)
                navigate('../../account/login');
            if (data.success === true) {
                let infos = [userData['_id'], userData['updatedAt']];
                let dataInfos = [data.user['_id'], data.user['updatedAt']];
                if (JSON.stringify(infos) !== JSON.stringify(dataInfos))
                    setUserData(data.user);
            }
        });
    };

    const getPath = () => {
        return userData.role ? userData.role : 'developper';
    };

    return (
        <div className="profile-card">
            <div className="profile-header">
                <img src={require(`../assets/images/roles/${getPath()}.png`)} alt="User role icon" />
                <div className="infos">
                    <span><h4>{userData.name + ' ' + userData.lname}</h4>
                        <p>{userData.role}</p></span>
                    <button className='add-btn' onClick={logOut} >Se déconnecter</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;