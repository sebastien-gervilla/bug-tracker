import React from 'react';
import { MdPersonRemove } from 'react-icons/md';
import { fetchApi } from '../utils/api-fetch';

const Member = ({ member, loadMembers, ticketId, currUserRole }) => {
    const removeMember = () => {
        if (!ticketId)
            return;
        fetchApi(`app/tickets/removemember/${ticketId}`, "PUT", {memberId: member._id}, (data) => {
            if (data.success === true)
                loadMembers();
        });
    };

    const manageRemoveButton = () => {
        if (currUserRole === 'Admin' || currUserRole === 'Manager')
            return <button><MdPersonRemove className='delete-btn' onClick={removeMember} /></button>
    };

    return (
        <div className="member half-sized-el">
            <p className="first">{member.name + ' ' + member.lname}</p>
            <p className="second">{member.email}</p>
            {manageRemoveButton()}
        </div>
    );
};

export default Member;