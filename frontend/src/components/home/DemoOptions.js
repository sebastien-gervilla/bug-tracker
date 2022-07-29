import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { fetchApi } from '../../utils/api-fetch';
import { useNavigate } from 'react-router-dom';

const DemoOptions = () => {

    const navigate = useNavigate();

    const demoLogin = (event) => {
        const logs = {
            email: event.target.id + '@demo.com',
            password: event.target.id + 'account'
        };
        console.log(event.target)

        fetchApi('account/login', 'POST', logs, (data) => {
            if (data.success === true)
                navigate('../../app/profile');
        });
    };

    const goToLogin = () => navigate('../../account/login');

    return (
        <section id='demo-area'>
            <div className="demo-content">
                <div className="demo-options">
                    <div className="option">
                        <button onClick={demoLogin} id='admin'><FaUserCircle></FaUserCircle></button>
                        <p>Admin</p>
                    </div>
                    <div className="option">
                        <button onClick={demoLogin} id='manager'><FaUserCircle></FaUserCircle></button>
                        <p>Manager</p>
                    </div>
                    <div className="option">
                        <button onClick={demoLogin} id='dev'><FaUserCircle></FaUserCircle></button>
                        <p>Développeur</p>
                    </div>
                    <div className="option">
                        <button onClick={goToLogin} id='custom'><FaUserCircle></FaUserCircle></button>
                        <p>Personnel</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DemoOptions;