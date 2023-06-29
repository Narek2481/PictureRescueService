import React, { memo, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { RemoveScroll } from 'react-remove-scroll';
import getUserData from '../../../action/getPersonalAreaData';
import btn from "../../../img_logo/pencil-g9d2a08ec1_640 1.png"
import userImage from "../../../img_logo/user_icon_150670 1.png"
import emailImage from "../../../img_logo/email 1.png"
import UploadAvatar from '../../Home/UploadAvatar/UploadAvatar';
import EditUserModal from './EditUserModal/EditUserModal';
import { useSelector } from 'react-redux';


const User = () => {
    const [userData, setUserdata] = useState({
        name: "",
        lastName: "",
        email: ""
    })
    const profileImage = useSelector((state) => state.ProfileImage);
    const [modalIsOpen, setIsOpen] = useState(false);
    useEffect(() => {
        getUserData()
            .then(res => {
                setUserdata(res.data)
            })
            .catch(e => console.log(e));
    }, [])


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
    Modal.setAppElement('#root');
    return (
        <div className='container text-center myUserContainer pt-5 pb-5'>
            <div className='text-center'>
                <div className='p-1 d-flex justify-content-center align-items-center flex-column'>
                    <div>
                        <img
                            style={
                                { 
                                       maxWidth: "200px",
                                borderRadius: "25px"
                            }}
                            src={profileImage}
                            alt="" />

                    </div>
                    <div className='text mt-1 userData h2'>{userData.name} {userData.lastName}</div>
                    <div className='mt-5'>
                        <button onClick={openModal}>
                            <img src={btn} alt="" />
                        </button>
                    </div>
                </div>
                <div>
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
                <h2 className='mt-5'>PROFILE</h2>
                <div className='userData'>
                    <div className="d-flex justify-content-center align-items-center mt-2 flex-column text flex-sm-row">

                        <div>
                            <img src={userImage} alt="" />
                            UserName
                        </div>
                        <div className='p-5'>{userData.name}</div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-2  flex-column text flex-sm-row">
                        <div>
                            <img src={emailImage} alt="" />
                            Email
                        </div>
                        <div className='ml-5'>{userData.email}</div>
                    </div>
                </div>
            </div>
            <div>
                <EditUserModal />
            </div>
        </div>
    );
};

export default memo(User);