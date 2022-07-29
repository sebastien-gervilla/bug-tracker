import React, { useEffect, useState } from 'react';
import TeamMember from './TeamMember';
import { fetchApi } from '../utils/api-fetch';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

const Team = ({ toggleModal }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => loadUsers());

    const loadUsers = () => {
        fetchApi('account/getusers', 'GET', null, (data) => {
            if (data.success === true) {
                const dataUsers = data.users.filter(user => {
                    if (user.role === 'Admin' || user.name === 'Développeur' || user.name === 'Manager')
                        return false;
                    return true
                });
                const ids = users.map(user => [user._id, user.updatedAt]);
                const dataIds = dataUsers.map(user => [user._id, user.updatedAt]);
                if (JSON.stringify(ids) !== JSON.stringify(dataIds))
                    setUsers(dataUsers);
            }
        });
    };

    const [page, setPage] = useState(0);

    const maxPage = Math.floor(users.length / 7) + 1;

    const changePage = (event) => {
        const newPage = page + parseInt(event.currentTarget.value);
        updatePage(newPage);
    };

    const updatePage = (newPage) => {
        const pages = maxPage - 1;
        if (newPage > pages)
            setPage(pages);
        else if (newPage < 0) 
            setPage(0);
        else if (newPage !== page)
            setPage(newPage);
    };

    const displayUsers = () => {
        let displayedUsers = []
        let end = 6 * (page + 1);
        if (end > users.length)
            end = users.length

        for (let i = 6 * page; i < end; i++) {
            const user = users[i];
            displayedUsers.push(<TeamMember member={user} loadUsers={loadUsers} 
                                toggleModal={toggleModal} key={user._id} />);
        };
        return displayedUsers;
    };

    const handleAdd = (event) => {
        event.preventDefault();
        toggleModal();
    };

    return (
        <div className="team app-collection">
            <div className="header">
                <h3>Team</h3>
                <button className='add-btn' onClick={handleAdd} >Ajouter</button>
            </div>
            <div className="menu">
                <p className="first">NOM</p>
                <p className="second">EMAIL</p>
                <p className="third">ROLE</p>
            </div>
            {displayUsers()}
            <div className="footer">
                <div className="buttons">
                    <button className='switch-btn' onClick={changePage} value="-1"><VscChevronLeft/></button>
                    <button className='switch-btn' onClick={changePage} value="1"><VscChevronRight/></button>
                </div>
                <p>Page {page + 1} / {maxPage}</p>
            </div>
        </div>
    );
};

export default Team;