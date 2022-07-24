import React, { useState, useEffect } from 'react';
import { fetchApi } from '../utils/api-fetch';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import Member from './Member';

const Members = ({ toggleModal, ticketId, currUser }) => {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        loadMembers();
        updatePage(page);
    });

    const loadMembers = () => {
        if (!ticketId)
            return;
        fetchApi(`app/tickets/members/${ticketId}`, 'GET', null, (data) => {
            if (data.success === true) {
                let infos = members.map(member => [member['_id'], member['updatedAt']]);
                let dataInfos = data.members.map(member => [member['_id'], member['updatedAt']]);
                if (JSON.stringify(infos) !== JSON.stringify(dataInfos))
                    setMembers(data.members);
            }
        });
    };

    const [page, setPage] = useState(0);

    const maxPage = Math.floor(members.length / 5) + 1;

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

    const handleAdd = (event) => {
        event.preventDefault();
        toggleModal('member', 'add', ticketId);
    }

    const manageAddButton = () => {
        if (currUser.role === 'Admin' || currUser.role === 'Manager')
            return <button className='add-btn' onClick={handleAdd} >Ajouter</button>
    };

    const displayMembers = () => {
        let comms = []
        let end = 4 * (page + 1);
        if (end > members.length)
            end = members.length

        for (let i = 4 * page; i < end; i++) {
            const member = members[i];
            comms.push(<Member member={member} loadMembers={loadMembers} ticketId={ticketId} key={member._id} />);
        };
        return comms;
    };

    return (
        <div className="members half-sized-list">
            <div className="header">
                <h3>Membres</h3>
                {manageAddButton()}
            </div>
            <div className="menu">
                <p className="first">NOM</p>
                <p className="second">EMAIL</p>
            </div>
            {displayMembers()}
            <div className="footer">
                <div className="footer-buttons">
                    <button className='switch-btn' onClick={changePage} value="-1"><VscChevronLeft/></button>
                    <button className='switch-btn' onClick={changePage} value="1"><VscChevronRight/></button>
                </div>
                <p>Page {page + 1} / {maxPage}</p>
            </div>
        </div>
    );
};

export default Members;