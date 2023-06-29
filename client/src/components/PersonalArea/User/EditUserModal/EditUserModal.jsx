import { useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StickyInputLabel from '../../../sign_in/signInForm/StickyInputLabel/StickyInputLabel';
import $api from '../../../../action';
import env from 'react-dotenv';
import {encryptPassword} from '../../../../encrypt/encryptPassword';

function EditUserModal() {
    const [lgShow, setLgShow] = useState(false);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [eror, setEror] = useState("");
    const [inputValidStyle, setInputValidStyle] = useState({});
    const submitData = e => {
        if (password === "" && email === "" && name === "" && lastName === "") {
            setEror("All fields are empty")
            setInputValidStyle(
                { borderBottom: "1px solid red" }
            );
            return
        }
        
        $api.put("/user/putUserData", {
            name, lastName, email,password:encryptPassword(password,env.ENCRYPTION_SECRET)
        })
            .then(response => {

                if (response.status === 201) {
                    if(eror){
                        setEror("")
                    }
                    setInputValidStyle({})
                    setLgShow(state => !state);
                    window.location.reload(false);
                } else {
                    setInputValidStyle(
                        { borderBottom: "1px solid red" }
                    );
                    setEror(response.data)
                }
            })
            .catch(e => {
                setInputValidStyle(
                    { borderBottom: "1px solid red" }
                );
                setEror(e.response.data.message)
            })
    }
    return (
        <>
            <Button className="go_add_image" onClick={() => setLgShow(true)}>Edit User</Button>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <h3>Change youre user data</h3>
                        <p className=' mt-1 h3 text-danger'>{eror}</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StickyInputLabel props={
                        useMemo(() => {
                            return {
                                text: "New Name",
                                name: "name",
                                type: "text",
                                inputValue: name,
                                setInputValue: setName,
                                style:inputValidStyle
                            }
                        }, [name,inputValidStyle])
                    } />
                    <StickyInputLabel props={
                        useMemo(() => {
                            return {
                                text: "New Last Name",
                                name: "lastName",
                                type: "text",
                                inputValue: lastName,
                                setInputValue: setLastName,
                                style:inputValidStyle
                            }
                        }, [inputValidStyle,lastName])
                    } />
                    <StickyInputLabel props={
                        useMemo(() => {
                            return {
                                text: "New Email",
                                name: "email",
                                type: "email",
                                inputValue: email,
                                setInputValue: setEmail,
                                style:inputValidStyle
                            }
                        }, [email,inputValidStyle])
                    } />
                    <StickyInputLabel props={
                        useMemo(() => {
                            return {
                                text: "New Password",
                                name: "password",
                                type: "password",
                                inputValue: password,
                                setInputValue: setPassword,
                                style:inputValidStyle
                            }
                        }, [password,inputValidStyle])
                    } />
                    <div className='text-center'>
                        <button className="go_add_image" onClick={submitData} >Change User data</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditUserModal;