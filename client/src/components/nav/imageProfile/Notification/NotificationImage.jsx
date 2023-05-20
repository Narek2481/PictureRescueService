import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from "../../../../img_logo/images.png"
import getNotification from '../../../../action/getNotification';
import ImageComponent from '../../../Home/images/ImageComponent';
function NotificationImage() {
    const [show, setShow] = useState(false);
    const [notificationData, setNotificationData] = useState([]);
    
    // useEffect(() => {
    //     const Images = getNotification()
    //     setNotificationData(Images)
    // }, [])
    return (
        <>
            <Button className='btnNotification' variant="primary" onClick={() => setShow(true)}>
                <img src={img} alt="" />
            </Button>

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
                        notificationData.length > 0 ? "" :"You have not Notification "
                    }
                    {

                        notificationData?.map((elem) => {
                            return <ImageComponent
                                props={elem}
                                key={Math.random() * 100}
                            />
                        })
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NotificationImage;