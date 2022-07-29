import React, { useState } from 'react';
import DemoOptions from '../components/home/DemoOptions';
import Landing from '../components/home/Landing';

const Home = () => {

    const [homeState, setHomeState] = useState('landing');

    const manageHome = () => {
        if (homeState === 'landing')
            return <Landing setHomeState={setHomeState} />
        if (homeState === 'demo')
            return <DemoOptions />
    };

    return (
        <section id='home-page'>
            {manageHome()}
        </section>
    );
};

export default Home;