import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { fetchApi } from '../utils/api-fetch';
import SingleSelect from './SingleSelect';
import { getUserDef } from '../utils/model-defaults';

const UserModal = ({ user, toggleModal, modalType }) => {
    const [userInfo, setUserInfo] = useState(getUserDef());

    useEffect(() => {
        setUserInfo(user);
    }, [user]);

    const handleChanges = (event) => {
        setUserInfo({...userInfo, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (modalType === "add") {
            addUser(userInfo);
            return;
        }
        editUser(userInfo);
    };

    const handleClose = (event) => {
        event.preventDefault();
        toggleModal();
    };

    const addUser = () => {
        fetchApi('account/register', 'POST', userInfo, (data) => {
            if (data.success === true) {
                console.log("Successfully created user.");
                toggleModal();
            };
        });
    };

    const editUser = () => {
        fetchApi(`account/${userInfo._id}`, 'PUT', userInfo, (data) => {
            if (data.success === true) {
                console.log("Successfully edited user.");
                toggleModal();
            };
        });
    };

    const managePasswordInput = () => {
        if (modalType === "edit")
            return;
        return <div className="form-input">
                    <p>MOT DE PASSE</p>
                    <input name="password" type="password" onChange={handleChanges} value={userInfo.password} />
                </div>
    }

    return (
        <div className="pop-up">
            <form className="add-form">
                <div className="form-header">
                    <h3>Projet</h3>
                    <button type="button" onClick={handleClose} ><IoCloseOutline/></button>
                </div>
                <div className="form-input">
                    <p>PRENOM</p>
                    <input name="name" type="text" onChange={handleChanges} value={userInfo.name} />
                </div>
                <div className="form-input">
                    <p>NOM</p>
                    <input name="lname" type="text" onChange={handleChanges} value={userInfo.lname} />
                </div>
                <div className="form-input">
                    <p>EMAIL</p>
                    <input name="email" type="email" onChange={handleChanges} value={userInfo.email} />
                </div>
                <div className="form-input">
                    <p>ROLE</p>
                    <SingleSelect name={'role'} options={['Développeur', 'Manager']}
                        handleChanges={handleChanges} value={userInfo.role} />
                </div>
                {managePasswordInput()}
                <div className="form-input">
                    <input onClick={handleSubmit} name="submit" type="submit" value="Valider"/>
                </div>
            </form>
        </div>
    );
};

export default UserModal;