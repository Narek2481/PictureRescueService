import React, { memo, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { RemoveScroll } from 'react-remove-scroll';
import imgUser from "../../../img_logo/istockphoto-1130884625-612x612.jpg"
import getUserData from '../../../action/getPersonalAreaData';
import btn from "../../../img_logo/pencil-g9d2a08ec1_640 1.png"
import userImage from "../../../img_logo/user_icon_150670 1.png"
import emailImage from "../../../img_logo/email 1.png"
import $api from '../../../action';
import UploadAvatar from '../../Home/UploadAvatar/UploadAvatar';
import Example from './EditUserModal/EditUserModal';


const User = () => {
    const [userData, setUserdata] = useState({
        name: "",
        lastName: "",
        email: ""
    })
    const [imageUrl, setImageUrl] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const styleImg = imageUrl ? {} : { width: "50px", height: " 50px", borderRadius: "25px" }
    useEffect(() => {
        getUserData()
            .then(res => {
                setUserdata(res.data)
            })
            .catch(e => console.log(e));
    }, [])


    useEffect(() => {
        $api
            .get("/getAvatar", { responseType: 'arraybuffer' })
            .then((response) => {
                if (response.data.byteLength > 0) {
                    const blob = new Blob([response.data], { type: 'image/png' });
                    const url = URL.createObjectURL(blob);
                    setImageUrl(url);
                }
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
    console.log(imageUrl);
    Modal.setAppElement('#root');
    return (
        <div className='container-fluid text-center'>
            <div className='text-center'>
                <div className='p-1 d-flex justify-content-center align-items-center flex-column'>
                    <div>
                        <img
                            style={styleImg}
                            src={imageUrl ? imageUrl : imgUser}
                            alt="" />

                    </div>
                    <div className='text mt-1'>{userData.name} {userData.lastName}</div>
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
                    <div className="d-flex justify-content-center align-items-center mt-2 ml-2-xl ml-5-sm flex-column text flex-sm-row">
                        <div className="offset-1  offset-sm"></div>
                        <div>
                            <img src={emailImage} alt="" />
                            Email
                        </div>
                        <div className='ml-5'>{userData.email}</div>
                    </div>
                </div>
            </div>
            <div>
                <Example />
            </div>
        </div>
    );
};

export default memo(User);