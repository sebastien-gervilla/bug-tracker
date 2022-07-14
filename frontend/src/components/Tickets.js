import React, { useState, useEffect } from 'react';
import Ticket from './Ticket';
import { fetchApi } from '../utils/api-fetch';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

const Tickets = ({ toggleModal, projectId }) => {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        loadTickets();
        updatePage(page);
    });

    const loadTickets = () => {
        if (!projectId)
            return;
        fetchApi(`app/tickets/project/${projectId}`, 'GET', null, (data) => {
            if (data.success === true) {
                let infos = tickets.map(ticket => [ticket['_id'], ticket['updatedAt']]);
                let dataInfos = data.tickets.map(ticket => [ticket['_id'], ticket['updatedAt']]);
                if (JSON.stringify(infos) !== JSON.stringify(dataInfos))
                    setTickets(data.tickets);
            }
        });
    };

    const [page, setPage] = useState(0);

    const maxPage = Math.floor(tickets.length / 7) + 1;

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

    const displayTickets = () => {
        let ticks = []
        let end = 6 * (page + 1);
        if (end > tickets.length)
            end = tickets.length

        for (let i = 6 * page; i < end; i++) {
            const ticket = tickets[i];
            ticks.push(<Ticket ticket={ticket} loadTickets={loadTickets} 
                                toggleModal={toggleModal} key={ticket._id} />);
        };
        return ticks;
    };

    const handleAdd = (event) => {
        event.preventDefault();
        toggleModal('ticket');
    };

    return (
        <div className="projects">
            <div className="projects-header">
                <h3>Tickets</h3>
                <button className='add-btn' onClick={handleAdd} >Ajouter</button>
            </div>
            <div className="projects-menu">
                <p className="proj-name">NOM DU TICKET</p>
                <p className="proj-desc">DESCRIPTION</p>
                <p className="proj-manager">AUTEUR</p>
            </div>
            {displayTickets()}
            <div className="projects-footer">
                <div className="footer-buttons">
                    <button className='switch-btn' onClick={changePage} value="-1"><VscChevronLeft/></button>
                    <button className='switch-btn' onClick={changePage} value="1"><VscChevronRight/></button>
                </div>
                <p>Page {page + 1} / {maxPage}</p>
            </div>
        </div>
    );
};

export default Tickets;