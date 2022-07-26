import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InfoHeader from '../components/InfoHeader';
import Tickets from '../components/Tickets';
import TicketModal from '../components/tickets/TicketModal';
import ProjectModal from '../components/projects/ProjectModal';
import SideBar from '../components/SideBar';
import { fetchApi } from '../utils/api-fetch';
import { getProjectDef, getTicketDef, getUserDef } from '../utils/model-defaults';

const AppProject = () => {

    const { id } = useParams();

    const [modalsStates, setModalStates] = useState({
        project: false, ticket: false
    });

    const [modalsType, setModalsType] = useState({
        project: 'add', ticket: 'add'
    })

    const [modalsInfo, setModalsInfo] = useState({
        project: getProjectDef(),
        ticket: getTicketDef()
    });

    const [currUser, setCurrUser] = useState(getUserDef);

    const navigate = useNavigate();

    useEffect(() => {
        fetchApi('account/isauth', 'GET', null, (data) => {
            if (data.success !== true)
                navigate('../../account/login');
            if (data.success === true)
                setCurrUser(data.user);
        });
    }, []);

    useEffect(() => loadProject());

    const loadProject = () => {
        if (!currUser._id)
            return;
        fetchApi(`app/projects/${id}`, 'GET', null, (data) => {
            if (data.success === false)
                navigate('../app/projects');
            if (data.success === true) {
                if (!canAccessData(data.project))
                    navigate('../app/projects');

                let infos = [modalsInfo.project['_id'], modalsInfo.project['updatedAt']];
                let dataInfos = [data.project['_id'], data.project['updatedAt']];
                if (JSON.stringify(infos) !== JSON.stringify(dataInfos))
                    setModalsInfo({project: data.project,
                    ticket: {...modalsInfo.ticket, projectId: data.project._id}});
            }
        });
    };

    const canAccessData = (dataProject) => {
        if (currUser.role === 'Admin' || currUser.role === 'Manager')
            return true;
        return dataProject.membersId.includes(currUser._id) ? true : false;
    };

    const toggleModal = (modalName='project', modalType='add', info=null) => {
        if (!info && modalName === 'project')
            info = getProjectDef()
        else if (!info && modalName === 'ticket') {
            info = getTicketDef()
            info.projectId = modalsInfo.project._id;
        }

        let state; modalsStates[modalName] ? state = false : state = true;
        setModalsInfo({...modalsInfo, [modalName]: info});
        setModalsType({...modalsType, [modalName]: modalType});
        setModalStates({...modalsStates, [modalName]: state});
    };

    const manageModals = () => {
        if (modalsStates.project) {
            let projectInfo = modalsInfo.project;
            return <ProjectModal projectInfo={projectInfo} toggleModal={toggleModal} modalType={modalsType.project} />
        } else if (modalsStates.ticket) {
            let ticketInfo = modalsInfo.ticket;
            return <TicketModal ticketInfo={ticketInfo} toggleModal={toggleModal} 
            modalType={modalsType.ticket} projMembersId={modalsInfo.project.membersId} />
        }
    };

    return (
        <section id='project-area'>
            <div className="app-content" id='project-content'>
                <SideBar />
                <section className='side-content'>
                    <InfoHeader info={modalsInfo.project} toggleModal={toggleModal} 
                    modalName={'project'} currUserRole={currUser.role} />
                    <Tickets toggleModal={toggleModal} projectId={modalsInfo.project._id} currUser={currUser} />
                </section>
            </div>
            {manageModals()}
        </section>
    );
};

export default AppProject;