import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/api-fetch';
import { getUserDef } from '../../utils/model-defaults';

const TicketMemberSel = ({ projMembersId, handleSelectChanges, ticketId }) => {
    const [tickMembers, setTickMembers] = useState([]);

    const [projMembers, setProjMembers] = useState([]);

    const [currUser, setCurrUser] = useState(getUserDef());

    useEffect(() => {
        fetchApi('account/', 'GET', null, (data) => {
            if (data.success === true)
                if (JSON.stringify(data.user._id) !== JSON.stringify(currUser._id))
                    setCurrUser(data.user);
        });
    }, []);

    const loadProjectMembers = () => { // project users
        if (!projMembersId)
            return;
        let sentData = {membersId: projMembersId};
        fetchApi('account/fetchusers', 'POST', sentData, (data) => {
            if (data.success === true) {
                const ids = projMembers.map(user => user['_id']);
                const dataIds = data.users.map(user => user['_id']);
                if (JSON.stringify(ids) !== JSON.stringify(dataIds))
                    setProjMembers(data.users);
            }
        });
    };

    const loadTicketMembers = () => {
        if (!ticketId)
            return;
        fetchApi(`app/tickets/members/${ticketId}`, 'GET', null, (data) => {
            if (data.success === true) {
                const ids = tickMembers.map(user => user['_id']);
                const dataIds = data.members.map(user => user._id);
                if (JSON.stringify(ids) !== JSON.stringify(dataIds))
                    setTickMembers(data.members);
            }
        });
    };

    useEffect(() => { loadTicketMembers(); loadProjectMembers() });

    const loadOptions = () => {
        if (!projMembers.length)
            return;
        let options = [];
        const ticketMembersId = tickMembers.map(member => member._id);
        projMembers.forEach(user => {
            if (!ticketMembersId.includes(user._id) && (user._id !== currUser._id))
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