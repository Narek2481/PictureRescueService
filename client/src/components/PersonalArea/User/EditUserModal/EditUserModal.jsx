import { useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StickyInputLabel from '../../../sign_in/signInForm/StickyInputLabel/StickyInputLabel';

function Example() {
    const [lgShow, setLgShow] = useState(false);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

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
                        Large Modal
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
                            }
                        }, [name])
                    } />
                    <StickyInputLabel props={
                        useMemo(() => {
                            return {
                                text: "New Last Name",
                                name: "lastName",
                                type: "text",
                                inputValue: lastName,
                                setInputValue: setLastName,
                            }
                        }, [lastName])
                    } />
                    <StickyInputLabel props={
                        useMemo(() => {
                            return {
                                text: "New Password",
                                name: "password",
                                type: "password",
                                inputValue: password,
                                setInputValue: setPassword,
                            }
                        }, [password])
                    } />
                    <div className='text-center'>
                        <button className="go_add_image" >Change User data</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Example;