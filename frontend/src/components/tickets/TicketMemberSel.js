import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/api-fetch';

const TicketMemberSel = ({ membersId, handleSelectChanges, ticketId }) => {
    const [members, setMembers] = useState([]);

    const [users, setUsers] = useState([]);

    const loadUsers = () => {
        if (!membersId)
            return;
        let sentData = {membersId: membersId};
        fetchApi('account/fetchusers', 'POST', sentData, (data) => {
            if (data.success === true) {
                const ids = users.map(user => user['_id']);
                const dataIds = data.users.map(user => user['_id']);
                if (JSON.stringify(ids) !== JSON.stringify(dataIds))
                    setUsers(data.users);
            }
        });
    };

    const loadMembers = () => {
        if (!ticketId)
            return;
        fetchApi(`app/tickets/members/${ticketId}`, 'GET', null, (data) => {
            if (data.success === true) {
                const ids = members.map(user => user['_id']);
                const dataIds = data.members.map(user => user._id);
                if (JSON.stringify(ids) !== JSON.stringify(dataIds))
                    setMembers(data.members);
            }
        });
    };

    useEffect(() => { loadMembers(); loadUsers() });

    const loadOptions = () => {
        let options = [];
        const ticketMembersId = members.map(member => member._id);
        users.forEach(user => {
            if (!ticketMembersId.includes(user._id))
                options.push(<option value={user._id} key={user._id}>{user.name + ' ' + user.lname}</option>)
        });
        return options;
    };

    return (
        <select onChange={handleSelectChanges}
        name="members" id="proj-members" multiple>
            {loadOptions()}
        </select>
    );
};

export default TicketMemberSel;