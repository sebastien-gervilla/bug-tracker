import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { fetchApi } from '../../utils/api-fetch';
import MembersSelect from '../MembersSelect';

const ProjectModal = ({ projectInfo, toggleModal, modalType }) => {

    const [projInfo, setProjInfo] = useState({
        name: '', desc: '', membersId: []
    });

    useEffect(() => {
        setProjInfo(projectInfo);
    }, []);

    const handleChanges = (event) => {
        setProjInfo({...projInfo, [event.target.name]: event.target.value});
    };

    const handleSelectChanges = (event) => {
        const values = Array.from(event.target.selectedOptions, option => option.value);
        setProjInfo({...projInfo, membersId: values});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (modalType === "add") {
            addProject(projInfo);
            return;
        }
        editProject(projInfo);
    };

    const handleClose = (event) => {
        event.preventDefault();
        toggleModal();
    };

    const addProject = () => {
        fetchApi('app/projects', 'POST', projInfo, (data) => {
            if (data.success === true) {
                console.log("Successfully created project.");
                toggleModal();
            };
        });
    };

    const editProject = () => {
        fetchApi(`app/projects/${projInfo._id}`, 'PUT', projInfo, (data) => {
            if (data.success === true) {
                console.log("Successfully edited project.");
                toggleModal();
            };
        });
    };

    return (
        <div className="pop-up">
            <form className="add-form">
                <div className="form-header">
                    <h3>Projet</h3>
                    <button type="button" onClick={handleClose} ><IoCloseOutline/></button>
                </div>
                <div className="form-input">
                    <p>NOM DU PROJET</p>
                    <input name="name" type="text" onChange={handleChanges} value={projInfo.name} />
                </div>
                <div className="form-input">
                    <p>DESCRIPTION</p>
                    <textarea name="desc" cols="30" rows="10" 
                    onChange={handleChanges} value={projInfo.desc} ></textarea>
                </div>
                <div className="form-input">
                    <p>AJOUTER DES MEMBRES</p>
                    <MembersSelect membersId={projectInfo.membersId} handleSelectChanges={handleSelectChanges} />
                </div>
                <div className="form-input">
                    <input onClick={handleSubmit} name="submit" type="submit" value="Valider"/>
                </div>
            </form>
        </div>
    );
};

export default ProjectModal;