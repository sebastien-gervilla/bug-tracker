import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiMore2Line } from 'react-icons/ri';
import MoreMenu from './MoreMenu';
import { fetchApi } from '../utils/api-fetch';

const Ticket = ({ ticket, loadTickets, toggleModal, currUserRole }) => {

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

    const manageMoreButton = () => {
        if (currUserRole === 'Admin' || currUserRole === 'Manager')
            return <button className='more-button'><RiMore2Line onClick={toggleMore} /></button>
    };

    return (
        <div className="ticket app-collection-el">
            <p className="first"><NavLink to={'/app/tickets/' + ticket._id} >{ticket.name}</NavLink></p>
            <p className="second">{ticket.desc}</p>
            <p className="third">{ticket.author}</p>
            {manageMoreButton()}
            {manageMore()}
        </div>
    );
};

export default Ticket;