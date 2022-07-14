import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { fetchApi } from '../../utils/api-fetch';
import SingleSelect from '../SingleSelect';
import { getTicketDef } from '../../utils/model-defaults';
import TicketMemberSel from './TicketMemberSel';

const TicketModal = ({ ticketInfo, toggleModal, modalType, projMembersId }) => {

    const [tickInfo, setTickInfo] = useState(getTicketDef());

    useEffect(() => {
        setTickInfo(ticketInfo);
    }, []);

    const handleChanges = (event) => {
        setTickInfo({...tickInfo, [event.target.name]: event.target.value});
    };

    const handleSelectChanges = (event) => {
        const values = Array.from(event.target.selectedOptions, option => option.value);
        setTickInfo({...tickInfo, membersId: values});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (modalType === 'add') {
            addTicket(tickInfo);
            return;
        }
        editTicket(tickInfo);
    };

    const handleClose = (event) => {
        event.preventDefault();
        toggleModal('ticket', modalType);
    };
    

    const addTicket = () => {
        fetchApi('app/tickets', 'POST', tickInfo, (data) => {
            console.log(tickInfo)
            if (data.success === true) {
                console.log("Successfully created ticket.");
                toggleModal('ticket');
            };
        });
    };

    const editTicket = () => {
        fetchApi(`app/tickets/${tickInfo._id}`, 'PUT', tickInfo, (data) => {
            if (data.success === true) {
                console.log("Successfully edited ticket.");
                toggleModal('ticket');
            };
        });
    };

    return (
        <div className="pop-up">
            <form className="add-form">
                <div className="form-header">
                    <h3>Ticket</h3>
                    <button type="button" onClick={handleClose} ><IoCloseOutline/></button>
                </div>
                <div className="form-input">
                    <p>NOM DU TICKET</p>
                    <input name="name" type="text" onChange={handleChanges} value={tickInfo.name} />
                </div>
                <div className="form-input">
                    <p>DESCRIPTION</p>
                    <textarea name="desc" cols="30" rows="10" 
                    onChange={handleChanges} value={tickInfo.desc} ></textarea>
                </div>
                <div className="ticket-selects">
                    <div className="form-input type">
                        <p>TYPE</p>
                        <SingleSelect name={'type'} options={['Bug', 'Problème', 'Fonctionnalité']}
                        handleChanges={handleChanges} value={tickInfo.type} />
                    </div>
                    <div className="form-input priority">
                        <p>PRIORITE</p>
                        <SingleSelect name={'priority'} options={['Haute', 'Moyenne', 'Faible']}
                        handleChanges={handleChanges} value={tickInfo.priority} />
                    </div>
                    <div className="form-input status">
                        <p>STATUT</p>
                        <SingleSelect name={'status'} options={['Nouveau', 'En cours', 'Terminé']} 
                        handleChanges={handleChanges} value={tickInfo.status} />
                    </div>
                </div>
                <div className="form-input">
                    <p>AJOUTER DES MEMBRES</p>
                    <TicketMemberSel membersId={projMembersId} handleSelectChanges={handleSelectChanges} ticketId={ticketInfo._id} />
                </div>
                <div className="form-input">
                    <input onClick={handleSubmit} name="submit" type="submit" value="Valider"/>
                </div>
            </form>
        </div>
    );
};

export default TicketModal;