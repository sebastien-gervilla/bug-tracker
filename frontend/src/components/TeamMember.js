import React from 'react';
import { MdPersonRemove } from 'react-icons/md';

const TeamMember = ({ member, removeMember }) => {
    return (
        <div className="team-member app-collection-el">
            <p className="first">{member.name + ' ' + member.lname}</p>
            <p className="second">{member.email}</p>
            <p className="third">{member.role}</p>
            <button><MdPersonRemove className='delete-btn' onClick={removeMember} /></button>
        </div>
    );
};

export default TeamMember;