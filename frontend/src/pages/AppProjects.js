import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from '../utils/api-fetch';
import Projects from '../components/Projects';
import ProjectModal from '../components/projects/ProjectModal';
import SideBar from '../components/SideBar';
import { getProjectDef } from '../utils/model-defaults';

const AppProjects = () => {

    const [openModal, setOpenModal] = useState(false);

    const [modalType, setmodalType] = useState('add');

    const [modalInfo, setModalInfo] = useState({
        name: '', desc: '', membersId: []
    });

    const navigate = useNavigate();

    const getIsLogged = () => {
        fetchApi('account/isauth', 'GET', null, (data) => {
            if (data.success !== true)
                navigate('../../account/login');
        });
    }; getIsLogged();

    const toggleModal = (modalName='project', modalType='add', info=getProjectDef()) => {
        setModalInfo(info);
        setmodalType(modalType);
        openModal ? setOpenModal(false) : setOpenModal(true);
    };

    const manageModal = () => {
        if (openModal) 
            return <ProjectModal projectInfo={modalInfo} toggleModal={toggleModal} modalType={modalType} />;
    };

    return (
        <section id='projects-area'>
            <div className="app-content" id='projects-content'>
                <SideBar />
                <section className='side-content'>
                    <Projects toggleModal={toggleModal} />
                </section>
            </div>
            {manageModal()}
        </section>
    );
};

export default AppProjects;