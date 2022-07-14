import React from 'react';

const MoreMenu = ({ objInfo, deleteObj, toggleModal, toggleMore, modalName }) => {

    const handleDelete = (event) => {
        event.preventDefault();
        deleteObj();
        toggleMore();
    };

    const handleEdit = (event) => {
        event.preventDefault();
        toggleModal(modalName, 'edit', objInfo);
        toggleMore();
    };

    return (
        <div className="more-menu">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default MoreMenu;