import React, { useEffect, useMemo, useState } from 'react';
import img from "../../../img_logo/istockphoto-1130884625-612x612.jpg"
import getUserData from '../../../action/getPersonalAreaData';
import StickyInputLabel from '../../sign_in/signInForm/StickyInputLabel/StickyInputLabel';
import $api from '../../../action';
import Modal from 'react-modal';
import UploadAvatar from '../../Home/UploadAvatar/UploadAvatar';
import { RemoveScroll } from 'react-remove-scroll';

const User = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserdata] = useState({
        name: "",
        lastName: ""
    })
    const [imageUrl, setImageUrl] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getUserData()
            .then(res => {
                setUserdata(res.data)
            })
            .catch(e => console.log(e));
    }, [])

    const containsValidNameOrLastName = input => {
        return input.length >= 2 && /[A-Z]/.test(input) && /[a-z]/.test(input);
    }
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    const validatePassword = password => {
        if (password.length < 8) {
            console.log("Password must be at least 8 characters long.");
            return "Password must be at least 8 characters long."
        }
        return "ok";
    }
    useEffect(() => {
        $api
            .get("/getAvatar", { responseType: 'arraybuffer' })
            .then((response) => {
                const blob = new Blob([response.data], { type: 'image/png' });
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            })
            .catch((error) => {
                console.log("Error fetching image:", error);

            });
    }, []);

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(46, 45, 45, 0.75)",
            overflowY: 'auto'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            overflowY: 'none',
            borderRadius: '4px'
        },
    };

    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div className='container text-center'>
            <h2>Edit profile</h2>
            <div className="row">
                <div className='col'>
                    <img style={imageUrl ? {} : { width: "50px", height: " 50px", borderRadius: "25px" }}
                        src={imageUrl ? imageUrl : img}
                        alt="" />
                </div>
                <div className='col mt-5'>
                    <button  
                    className="go_add_image" 
                    onClick={openModal}
                    style={{ margin: 0}}
                    >Change avatar</button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}

                    >
                        <RemoveScroll>
                            <UploadAvatar />
                        </RemoveScroll>
                    </Modal>
                </div>
            </div>
            <div className="row">
                <div className='col mt-5'>{userData.name}</div>
                <div className='col'>
                    <StickyInputLabel props={
                        useMemo(() => {
                            return {
                                text: "Name",
                                name: "name",
                                type: "text",
                                inputValue: name,
                                setInputValue: setName,
                            }
                        }, [name])
                    } />
                </div>
            </div>
            <div className="row">
                <div className='col  mt-5'>{userData.lastName}</div>
                <div className='col'>
                    <StickyInputLabel props={
                        useMemo(() => {
                            return {
                                text: "Last Name",
                                name: "lastName",
                                type: "text",
                                inputValue: lastName,
                                setInputValue: setLastName,
                            }
                        }, [lastName])
                    } />
                </div>
            </div>
            <div className="row">
                <div className='col mt-5'>my name</div>
                <div className='col'>
                    <StickyInputLabel props={
                        useMemo(() => {
                            return {
                                text: "Password",
                                name: "password",
                                type: "password",
                                inputValue: password,
                                setInputValue: setPassword,
                            }
                        }, [password])
                    } />
                </div>
            </div>
        </div>
    );
};

export default User;