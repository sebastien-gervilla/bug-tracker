import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { fetchApi } from '../utils/api-fetch';
import TicketMemberSel from './tickets/TicketMemberSel';

const MemberModal = ({ ticketInfo, toggleModal, modalType, projMembersId }) => {

    const [membersId, setMembersId] = useState([]);

    useEffect(() => {
        setMembersId(membersId);
    }, []);

    const handleSelectChanges = (event) => {
        const values = Array.from(event.target.selectedOptions, option => option.value);
        setMembersId({...membersId, membersId: values});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addMember(membersId);
    };

    const handleClose = (event) => {
        event.preventDefault();
        toggleModal('member', modalType);
    };

    const addMember = () => {
        if (!ticketInfo._id)
            return
        fetchApi(`app/tickets/addmembers/${ticketInfo._id}`, 'PUT', membersId, (data) => {
            if (data.success === true) {
                console.log("Successfully edited member.");
                toggleModal('member');
            };
        });
    };

    return (
        <div className="pop-up">
            <form className="add-form">
                <div className="form-header">
                    <h3>Membres</h3>
                    <button type="button" onClick={handleClose} ><IoCloseOutline/></button>
                </div>
                <div className="form-input" id='add-members'>
                    <p>AJOUTER DES MEMBRES</p>
                    <TicketMemberSel membersId={projMembersId} handleSelectChanges={handleSelectChanges} ticketId={ticketInfo._id}/>
                </div>
                <div className="form-input">
                    <input onClick={handleSubmit} name="submit" type="submit" value="Valider"/>
                </div>
            </form>
        </div>
    );
};

export default MemberModal;