import React, { useState, useEffect } from 'react';
import { fetchApi } from '../utils/api-fetch';

const MembersSelect = ({ membersId, handleSelectChanges }) => {

    const [members, setMembers] = useState([]);

    const [users, setUsers] = useState([]);

    const loadMembers = () => {
        let sentData = {membersId: membersId}
        fetchApi('account/fetchusers', 'POST', sentData, (data) => {
            if (data.success === true) {
                let ids = members.map(user => user['_id']);
                let dataIds = data.users.map(user => user['_id']);
                if (JSON.stringify(ids) !== JSON.stringify(dataIds))
                    setMembers(data.users);
            }
        });
    };

    const loadUsers = () => {
        fetchApi('account/getusers', 'GET', null, (data) => {
            if (data.success === true) {
                let ids = users.map(user => user['_id']);
                const dataIds = data.users.map(user => user._id);
                if (JSON.stringify(ids) !== JSON.stringify(dataIds))
                    setUsers(data.users);
            }
        });
    };

    useEffect(() => { loadMembers(); loadUsers() });

    const loadOptions = () => {
        let options = [];
        users.forEach(user => {
            if (!membersId.includes(user._id))
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

export default MembersSelect;