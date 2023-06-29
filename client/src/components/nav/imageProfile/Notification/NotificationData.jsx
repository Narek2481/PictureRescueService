import React from 'react';
import { Modal } from '../../../Home/modal/Modal';

const NotificationData = ({ elem }) => {
    return (
        <div className='pb-5'>
            <h4>Image Size {elem.imageWidthHeght}</h4>
            <Modal src={"img/" + elem.image_url}>
                <div className="holder">
                    <img className="img-fluid" src={"img/" + elem.image_url} alt="" />
                </div>
            </Modal>
        </div >
    );
};

export default NotificationData;