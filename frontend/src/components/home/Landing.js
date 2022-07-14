import React from 'react';
import { NavLink } from 'react-router-dom';

const Landing = () => {
    return (
        <section id='landing-area'>
            <div className="landing-content">
                <div className="software-infos">
                    <div className="texts">
                        <h1>BugTracker,</h1>
                        <h2>Efficacité & Productivité.</h2>
                        <p>Une interface simple et pratique qui facilite les projets d'équipe,
                        en vous permettant de tracer les bugs, de les catégoriser, ou même 
                        de les assigner à un ou plusieurs membres.</p>
                    </div>
                    <div className="links">
                        <NavLink to='/account/login' >Se connecter</NavLink>
                        <NavLink to='/' >Version demo</NavLink>
                    </div>
                </div>
                <img src={require('../../assets/images/Management.png')} alt="Project Management Image" />
            </div>
        </section>
    );
};

export default Landing;