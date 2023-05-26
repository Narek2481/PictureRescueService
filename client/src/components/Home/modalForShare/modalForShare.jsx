import React, { memo, useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ShareModal from './shareModal/ShareModal';
import btnImg from "../../../img_logo/61020.png"
import shareImage from '../../../action/shareImage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/user/userSlice';


function Example({ props }) {
    const auth = useSelector(selectCurrentUser)
    const [dataForSend, setDataForSend] = useState("")
    const [show, setShow] = useState(false);
    const [eror, setEror] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const sendData = e => {
        shareImage({ email: dataForSend, id: props })
            .then(() => {
                handleClose();
            })
            .catch((e) => {
                setEror(e.response.data)
            })
    }
    return (
        <>
            <Button variant="primary" onClick={() => {
                if (auth.register_or_login) {
                    handleShow();
                } else {
                    navigate("/sign_in")
                }

            }}>
                Share
                <img src={btnImg} alt="" />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            eror !== "" ?
                                eror :
                                <div >Write an email to the user you want to share</div >
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ShareModal props={useMemo(() => {
                        return {
                            setDataForSend,
                            dataForSend
                        }
                    }, [dataForSend])} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={sendData}>
                        Share
                        <img src={btnImg} alt="" style={{ width: "30px", height: "30px" }} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default memo(Example);