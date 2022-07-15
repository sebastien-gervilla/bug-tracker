import React, { useState } from 'react';
import Team from '../components/Team';
import { useNavigate } from 'react-router-dom';
import { getUserDef } from '../utils/model-defaults';
import UserModal from '../components/UserModal';
import { fetchApi } from '../utils/api-fetch';
import SideBar from '../components/SideBar';

const AppTeam = () => {

    const [openModal, setOpenModal] = useState(false);

    const [modalType, setmodalType] = useState('add');

    const [modalInfo, setModalInfo] = useState(getUserDef());

    const navigate = useNavigate();

    const getIsLogged = () => {
        fetchApi('account/isauth', 'GET', null, (data) => {
            if (data.success !== true)
                navigate('../../account/login');
        });
    }; getIsLogged();

    const toggleModal = (modalName='member', modalType='add', info=getUserDef()) => {
        setModalInfo(info);
        setmodalType(modalType);
        openModal ? setOpenModal(false) : setOpenModal(true);
    };

    const manageModal = () => {
        if (openModal) 
            return <UserModal user={modalInfo} toggleModal={toggleModal} modalType={modalType} />;
    };

    return (
        <section id="team-area">
            <div className="app-content" id="team-content">
                <SideBar />
                <div className="side-content">
                    <Team toggleModal={toggleModal} />
                </div>
            </div>
            {manageModal()}
        </section>
    );
};

export default AppTeam;