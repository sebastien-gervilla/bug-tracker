import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ErrorMsg from '../components/ErrorMsg';
import { fetchApi } from '../utils/api-fetch';

const Login = () => {

    const [logInfo, setLogInfo] = useState({
        email: '',
        password: ''
    });

    const [logError, setLogError] = useState('');

    const navigate = useNavigate();

    const handleChanges = (event) => {
        setLogInfo({...logInfo, [event.target.name]: event.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetchApi('account/login', 'POST', logInfo, (data) => {
            if (data.success === false)
                setLogError(data.message);
            if (data.success === true) {
                navigate('../app/profile');
                return;
            } 
        });
        setLogInfo({...logInfo, password: ''});
    };

    const manageLogError = () => {
        if (logError)
            return <ErrorMsg error={logError} />
    };

    return (
        <section id='login-page'>
            <section id='login-area'>
                <div className="login-content">
                    <h2>Se connecter</h2>
                    <form className="account-form" action="">
                        <div className="form-input">
                            <p>EMAIL</p>
                            <input onChange={handleChanges} name="email" type="email" value={logInfo['email']} />
                        </div>
                        <div className="form-input">
                            <p>PASSWORD</p>
                            <input onChange={handleChanges} name="password" type="password" value={logInfo['password']} />
                        </div>
                        {manageLogError()}
                        <div className="form-input">
                            <input onClick={handleSubmit} name="submit" type="submit" value="Se connecter" />
                        </div>
                    </form>
                    <NavLink to='/' >Mot de passe oublié ?</NavLink>
                    <NavLink to='/account/demo' >Essayer une version demo</NavLink>
                </div>
            </section>
        </section>
    );
};

export default Login;