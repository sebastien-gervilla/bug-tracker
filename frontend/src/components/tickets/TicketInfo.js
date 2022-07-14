import React from 'react';

const TicketInfo = ({ info, toggleModal }) => {

    const toTimeFormat = (time) => {
        if (!time)
            return;
        time = time.replace('T', ' ');
        time = time.slice(0, time.length - 5)
        return time
    };

    const handleEdit = (event) => {
        event.preventDefault();
        toggleModal('ticket', 'edit', info);
    };

    return (
        <div className="ticket-info">
            <div className="header">
                <h3>Détails</h3>
                <button className='add-btn' onClick={handleEdit} >Modifier</button>
            </div>
            <div className="infos">
                <div className="info">
                    <p className='category'>NOM DU TICKET</p>
                    <p>{info.name}</p>
                </div>
                <div className="info">
                    <p className='category'>AUTEUR</p>
                    <p>{info.author}</p>
                </div>
            </div>
            <div className="infos">
                <div className="info">
                    <p className='category'>DESCRIPTION</p>
                    <p>{info.desc}</p>
                </div>
                <div className="info">
                    <p className='category'>TYPE</p>
                    <p>{info.type}</p>
                </div>
            </div>
            <div className="infos">
                <div className="info">
                    <p className='category'>PRIORITE</p>
                    <p>{info.priority}</p>
                </div>
                <div className="info">
                    <p className='category'>STATUT</p>
                    <p>{info.status}</p>
                </div>
            </div>
            <div className="infos">
                <div className="info">
                    <p className='category'>CREATION</p>
                    <p>{toTimeFormat(info.createdAt)}</p>
                </div>
                <div className="info">
                    <p className='category'>MODIFICATION</p>
                    <p>{toTimeFormat(info.updatedAt)}</p>
                </div>
            </div>
        </div>
    );
};

export default TicketInfo;