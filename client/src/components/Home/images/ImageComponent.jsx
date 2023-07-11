import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../modal/Modal";
import Share from "../modalForShare/modalForShare";
import img from "../../../img_logo/delete-Icon.png"
import { deletePrivetImage } from "../../../action/deletePrivetImage";
import { editFatching } from "../../../redux/data/dataSlice";
// 
export default memo(function ImageComponent({ props }) {
    const loginState = useSelector((state) => state.currentUser.register_or_login)
    const dispatch = useDispatch();
    const deleteImage = (e) => {
        deletePrivetImage(props.id)
            .then((res) => {
                console.log(res.status);
                if (res.status === 204) {
                    dispatch(editFatching({ fatching: true }));
                }
            })
            .catch(e => console.log(e))
    }

    return (
        <div className="col-12 col-md-4 col-sm-6 iamage_container" >
            <h4>Image Size {props.imageWidthHeght}</h4>
            <Modal src={"img/" + props.image_url}>
                <div className="holder">
                    <img className="img-fluid" src={"img/" + props.image_url} alt="" />
                </div>
            </Modal>
            <Share props={props.id} />
            {
                props.text && loginState ?
                    <img
                        onClick={deleteImage}
                        className="img-fluid removeButton"
                        src={img} alt=""
                    />
                    : ""
            }
            <h4 className="h5 mt-2 mb-0">{props.text ? props.text : ""}</h4>

        </div>
    )
});