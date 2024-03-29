import React, { useState } from 'react';
import { fetchApi } from '../utils/api-fetch';
import { RiMore2Line } from 'react-icons/ri';
import MoreMenu from './MoreMenu';
import { NavLink } from 'react-router-dom';

const Project = ({ project, loadProjects, toggleModal, currUser }) => {

    const [openMore, setOpenMore] = useState(false);

    const toggleMore = () => {
        openMore ? setOpenMore(false) : setOpenMore(true);
    };

    const manageMore = () => {
        if (openMore) 
            return <MoreMenu objInfo={project} deleteObj={deleteProject}
            toggleModal={toggleModal} toggleMore={toggleMore} modalName={'projects'} />;
    };

    const manageMoreButton = () => {
        if (currUser.role === 'Admin' || currUser.role === 'Manager')
            return <button className='more-button'><RiMore2Line onClick={toggleMore} /></button>
    };

    const deleteProject = () => {
        fetchApi(`app/projects/${project._id}`, "DELETE", null, (data) => {
            if (data.success === true)
                console.log("Successfully deleted project.");
                loadProjects();
        });
    };

    return (
        <div className="project app-collection-el">
            <p className="first"><NavLink to={'/app/projects/' + project._id} >{project.name}</NavLink></p>
            <p className="second">{project.desc}</p>
            <p className="third">{project.author}</p>
            {manageMoreButton()}
            {manageMore()}
        </div>
    );
};

export default Project;