import React, { useState } from 'react';
import { fetchApi } from '../utils/api-fetch';
import { RiMore2Line } from 'react-icons/ri';
import MoreMenu from './MoreMenu';
import { NavLink } from 'react-router-dom';

const Project = ({ project, loadProjects, toggleModal }) => {

    const [openMore, setOpenMore] = useState(false);

    const toggleMore = () => {
        openMore ? setOpenMore(false) : setOpenMore(true);
    };

    const manageMore = () => {
        if (openMore) 
            return <MoreMenu objInfo={project} deleteObj={deleteProject}
            toggleModal={toggleModal} toggleMore={toggleMore} modalName={'projects'} />;
    };

    const deleteProject = () => {
        fetchApi(`app/projects/${project._id}`, "DELETE", null, (data) => {
            if (data.success === true)
                console.log("Successfully deleted project.");
                loadProjects();
        });
    };

    return (
        <div className="project">
            <p className="proj-name"><NavLink to={'/app/projects/' + project._id} >{project.name}</NavLink></p>
            <p className="proj-desc">{project.desc}</p>
            <p className="proj-manager">{project.author}</p>
            <button><RiMore2Line onClick={toggleMore} /></button>
            {manageMore()}
        </div>
    );
};

export default Project;