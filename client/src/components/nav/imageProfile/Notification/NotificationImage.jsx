import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from "../../../../img_logo/images.png"
import getNotification from '../../../../action/getNotification';
import NotificationData from './NotificationData';
import { useDispatch } from 'react-redux';
import { editCurrentUser } from '../../../../redux/user/userSlice';

function NotificationImage() {
    const [show, setShow] = useState(false);
    const [notificationData, setNotificationData] = useState([]);
    const dispatch = useDispatch()
    const styuleSpan = {
        borderRadius: "50%",
        backgroundColor: "red",
        padding: "3px",
        height: "3px"
    }
    useEffect(() => {
        getNotification()
            .then(req => {
                setNotificationData(req.data)
            })
            .catch(e => {
                dispatch(editCurrentUser({name:"",register_or_login:false}));
                console.log(e)
            });
    }, [])
    return (
        <>
            <Button className='btnNotification' variant="primary" onClick={() => setShow(true)}>
                <img src={img} alt="" />
            </Button>
            <span style={notificationData.length > 0 ? styuleSpan : {}}></span>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Here are your notifications
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        notificationData.length > 0 ? "" : "You have not Notifications "
                    }
                    {
                        notificationData?.map((elem) => {
                            return (
                                <NotificationData key={Math.random() * 100} elem={elem}/>
                            );
                        })
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NotificationImage;