import React from 'react';
import { FiEdit } from 'react-icons/fi';

const InfoHeader = ({ info, toggleModal, modalName }) => {

    const handleEdit = (event) => {
        event.preventDefault();
        toggleModal(modalName, 'edit', info);
    };
    
    return (
        <div className="info-header">
            <h3>{info.name}</h3>
            <p>{info.desc}</p>
            <button><FiEdit onClick={handleEdit} /></button>
        </div>
    );
};

export default InfoHeader;