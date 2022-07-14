import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiMore2Line } from 'react-icons/ri';
import MoreMenu from './MoreMenu';
import { fetchApi } from '../utils/api-fetch';

const Ticket = ({ ticket, loadTickets, toggleModal }) => {

    const [openMore, setOpenMore] = useState(false);

    const toggleMore = () => {
        openMore ? setOpenMore(false) : setOpenMore(true);
    };

    const manageMore = () => {
        if (openMore) 
            return <MoreMenu objInfo={ticket} deleteObj={deleteTicket}
            toggleModal={toggleModal} toggleMore={toggleMore} modalName={'ticket'} />;
    };

    const deleteTicket = () => {
        fetchApi(`app/tickets/${ticket._id}`, "DELETE", null, (data) => {
            if (data.success === true)
                console.log("Successfully deleted ticket.");
                loadTickets();
        });
    };

    return (
        <div className="project">
            <p className="proj-name"><NavLink to={'/app/tickets/' + ticket._id} >{ticket.name}</NavLink></p>
            <p className="proj-desc">{ticket.desc}</p>
            <p className="proj-manager">{ticket.author}</p>
            <button><RiMore2Line onClick={toggleMore} /></button>
            {manageMore()}
        </div>
    );
};

export default Ticket;