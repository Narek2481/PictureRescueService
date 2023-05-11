import { memo} from "react";

import { Modal } from "../modal/Modal";



export default memo(function ImageComponent({ props }) {

    return (
        <div className="col-12 col-md-4 col-sm-6 iamage_container" >
            <h4>Image Size {props.imageWidthHeght}</h4>
            <Modal src= {"img/"+props.image_url}>
                <div className="holder">
                    <img className="img-fluid" src={"img/"+props.image_url}  alt="" />
                </div>
            </Modal>
        </div>
    )
});