import React from 'react';
import { NavLink } from 'react-router-dom';

const Landing = ({ setHomeState }) => {

    const handleHomeState = () => setHomeState('demo');

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
                        <button onClick={handleHomeState} >Version demo</button>
                    </div>
                </div>
                <img src={require('../../assets/images/Management.png')} alt="Team Project Management" />
            </div>
        </section>
    );
};

export default Landing;