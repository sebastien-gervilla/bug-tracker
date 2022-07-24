import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import InfoHeader from '../components/InfoHeader';
import TicketModal from '../components/tickets/TicketModal';
import ProjectModal from '../components/projects/ProjectModal';
import MemberModal from '../components/MemberModal';
import { fetchApi } from '../utils/api-fetch';
import { getTicketDef, getProjectDef, getUserDef } from '../utils/model-defaults';
import { useNavigate, useParams } from 'react-router-dom';
import TicketInfo from '../components/tickets/TicketInfo';
import Comments from '../components/tickets/Comments';
import Members from '../components/Members';

const AppTicket = () => {

    const { id } = useParams();

    const [modalsStates, setModalStates] = useState({
        project: false, ticket: false, member: false
    });

    const [modalsType, setModalsType] = useState({
        project: 'add', ticket: 'add', member: 'add'
    })

    const [modalsInfo, setModalsInfo] = useState({
        project: getProjectDef(),
        ticket: getTicketDef(),
        member: getTicketDef()
    });

    const [currUser, setCurrUser] = useState(getUserDef());

    const navigate = useNavigate();

    useEffect(() => {
        fetchApi('account/isauth', 'GET', null, (data) => {
            if (data.success !== true)
                navigate('../../account/login');
            if (data.success === true)
                setCurrUser(data.user);
        });
    }, []);

    useEffect(() => {loadTicket(); loadProject()});

    const loadTicket = () => {
        if (!currUser._id)
            return;
        fetchApi(`app/tickets/${id}`, 'GET', null, (data) => {
            if (data.success === false)
                navigate('../app/projects');
            if (data.success === true) {
                if (!data.ticket.membersId.includes(currUser._id))
                    navigate('../app/projects');
                const info = [modalsInfo.ticket._id, modalsInfo.ticket.updatedAt];
                const dataInfo = [data.ticket._id, data.ticket.updatedAt];
                if (JSON.stringify(info) !== JSON.stringify(dataInfo))
                    setModalsInfo({...modalsInfo, ticket: data.ticket, member: data.ticket});
            }
        });
    };

    const loadProject = () => {
        const projId = modalsInfo.ticket.projectId;
        if (!projId)
            return;
        fetchApi(`app/projects/${projId}`, 'GET', null, (data) => {
            if (data.success === false)
                navigate('../app/projects');
            if (data.success === true) {
                let infos = [modalsInfo.project._id, modalsInfo.project.updatedAt];
                let dataInfos = [data.project._id, data.project.updatedAt];
                if (JSON.stringify(infos) !== JSON.stringify(dataInfos))
                    setModalsInfo({...modalsInfo, project: data.project});
            }
        });
    };

    const toggleModal = (modalName='project', modalType='edit', info=null) => {
        if (!info && modalName === 'project')
            info = getProjectDef()
        else if (!info && modalName === 'ticket')
            info = getTicketDef()

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
        } else if (modalsStates.member) {
            let ticketInfo = modalsInfo.ticket;
            return <MemberModal ticketInfo={ticketInfo} toggleModal={toggleModal} 
            modalType={modalsType.ticket} projMembersId={modalsInfo.project.membersId} />
        }
    };

    return (
        <section id='ticket-area'>
            <div className="app-content" id="ticket-content">
                <SideBar />
                <div className="side-content">
                    <InfoHeader info={modalsInfo.project} toggleModal={toggleModal} modalName={'project'} />
                    <div className="content-row">
                        <TicketInfo info={modalsInfo.ticket} toggleModal={toggleModal} />
                        <Members toggleModal={toggleModal} ticketId={modalsInfo.ticket._id} />
                    </div>
                    <Comments toggleModal={toggleModal} ticketId={modalsInfo.ticket._id} />
                </div>
            </div>
            {manageModals()}
        </section>
    );
};

export default AppTicket;