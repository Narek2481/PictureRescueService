import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import buttn_image from "../../../img_logo/61442.png"
import { Modal, ModalContent } from "../modal/Modal";



export default memo(function Image_component({ props }) {
    const dispatch = useDispatch();
    const img = require("/home/narek/Desktop/app_/server/img/" + props.image_url);
    const is_open = useSelector((state) => state.modal.modal_data.modal);
    // const [isOpen, setIsopen] = useState(false);
    // const showModal = () => setIsopen((prev) => !prev);
    return (
        <div className="col-12 col-md-4 col-sm-6 iamage_container" >
            <h4>img  width height</h4>
            <Modal src= {img}>
                <div className="holder">
                    <img className="img-fluid" src={img}  alt="" />
                </div>
            </Modal>
        </div>
    )
});