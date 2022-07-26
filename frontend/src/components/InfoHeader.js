import React from 'react';
import { FiEdit } from 'react-icons/fi';

const InfoHeader = ({ info, toggleModal, modalName, currUserRole }) => {

    const handleEdit = (event) => {
        event.preventDefault();
        toggleModal(modalName, 'edit', info);
    };

    const manageEditButton = () => {
        if (currUserRole === 'Admin' || currUserRole === 'Manager')
            return <button><FiEdit onClick={handleEdit} /></button>
    };
    
    return (
        <div className="info-header">
            <h3>{info.name}</h3>
            <p>{info.desc}</p>
            {manageEditButton()}
        </div>
    );
};

export default InfoHeader;