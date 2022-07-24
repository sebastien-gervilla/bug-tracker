import React, { useState, useEffect } from 'react';
import { fetchApi } from '../utils/api-fetch';
import { getUserDef } from '../utils/model-defaults';

const MembersSelect = ({ membersId, handleSelectChanges }) => {

    const [currUser, setCurrUser] = useState(getUserDef());

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchApi('account/', 'GET', null, (data) => {
            if (data.success === true)
                if (JSON.stringify(data.user._id) !== JSON.stringify(currUser._id))
                    setCurrUser(data.user);
        });
    }, []);

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

    useEffect(() => loadUsers());

    const loadOptions = () => {
        let options = [];
        users.forEach(user => {
            if ((!membersId.includes(user._id)) && (user._id !== currUser._id))
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