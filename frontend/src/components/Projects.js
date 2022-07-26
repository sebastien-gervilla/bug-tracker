import React, { useState, useEffect } from 'react';
import Project from './Project';
import { fetchApi } from '../utils/api-fetch';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

const Projects = ({ toggleModal, currUser }) => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        loadProjects();
        updatePage(page);
    });

    const loadProjects = () => {
        if (!currUser._id)
            return;
        fetchApi('app/projects', 'GET', null, (data) => {
            if (data.success === true) {
                let ids = projects.map(project => [project['_id'], project['updatedAt']]);
                let dataIds = data.projects.map(project => [project['_id'], project['updatedAt']]);
                if (JSON.stringify(ids) !== JSON.stringify(dataIds)) {
                    let filteredProjects = filterProjects(data.projects);
                    setProjects(filteredProjects);
                }
            }
        });
    };

    const filterProjects = (dataProjects) => {
        if (currUser.role !== 'Développeur')
            return dataProjects;

        let projects = dataProjects.filter(ticket => {
            if (ticket.membersId.includes(currUser._id) || 
                ticket.authorId === currUser._id)
                return true;
            return false;
        });
        return projects;
    };

    const [page, setPage] = useState(0);

    const maxPage = Math.floor(projects.length / 7) + 1;

    const changePage = (event) => {
        const newPage = page + parseInt(event.currentTarget.value);
        updatePage(newPage);
    };

    const updatePage = (newPage) => {
        const pages = maxPage - 1;
        if (newPage > pages)
            setPage(pages);
        else if (newPage < 0) 
            setPage(0);
        else if (newPage !== page)
            setPage(newPage);
    };

    const displayProjects = () => {
        let projs = []
        let end = 6 * (page + 1);
        if (end > projects.length)
            end = projects.length

        for (let i = 6 * page; i < end; i++) {
            const project = projects[i];
            projs.push(<Project project={project} loadProjects={loadProjects} 
                                toggleModal={toggleModal} currUser={currUser} key={project._id} />);
        };
        return projs;
    };

    const manageAddProject = () => {
        if (currUser.role === 'Admin' || currUser.role === 'Manager')
            return <button className='add-btn' onClick={handleAdd} >Ajouter</button>
    };

    const handleAdd = (event) => {
        event.preventDefault();
        toggleModal();
    };

    return (
        <div className="projects app-collection">
            <div className="header">
                <h3>Projects</h3>
                {manageAddProject()}
            </div>
            <div className="menu">
                <p className="first">NOM DU PROJECT</p>
                <p className="second">DESCRIPTION</p>
                <p className="third">MANAGER</p>
            </div>
            {displayProjects()}
            <div className="footer">
                <div className="buttons">
                    <button className='switch-btn' onClick={changePage} value="-1"><VscChevronLeft/></button>
                    <button className='switch-btn' onClick={changePage} value="1"><VscChevronRight/></button>
                </div>
                <p>Page {page + 1} / {maxPage}</p>
            </div>
        </div>
    );
};

export default Projects;