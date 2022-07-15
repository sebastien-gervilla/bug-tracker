import React, { useState } from 'react';
import { fetchApi } from '../utils/api-fetch';
import { RiMore2Line } from 'react-icons/ri';
import MoreMenu from './MoreMenu';

const TeamMember = ({ member, loadUsers, toggleModal }) => {

    const [openMore, setOpenMore] = useState(false);

    const toggleMore = () => {
        openMore ? setOpenMore(false) : setOpenMore(true);
    };

    const manageMore = () => {
        if (openMore) 
            return <MoreMenu objInfo={member} deleteObj={deleteUser}
            toggleModal={toggleModal} toggleMore={toggleMore} modalName={'member'} />;
    };

    const deleteUser = () => {
        fetchApi(`account/${member._id}`, "DELETE", null, (data) => {
            if (data.success === true)
                console.log("Successfully deleted member.");
                loadUsers();
        });
    };

    return (
        <div className="team-member app-collection-el">
            <p className="first">{member.name + ' ' + member.lname}</p>
            <p className="second">{member.email}</p>
            <p className="third">{member.role}</p>
            <button className='more-button' ><RiMore2Line onClick={toggleMore} /></button>
            {manageMore()}
        </div>
    );
};

export default TeamMember;