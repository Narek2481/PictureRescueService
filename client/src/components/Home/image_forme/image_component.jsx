import { memo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { edit_image } from "../../../reducers/image_data/image_data_slice";



export default memo(function Image_component({ props }) {
    const dispatch = useDispatch();
    const img = require("/home/narek/Desktop/app_/server/img/" + props.image_url);
    return (
        <div className="col-12 col-md-4 col-sm-6 iamage_container" >
            <h4>img  width height</h4>
            <img className="img-fluid" src={img} alt="" />
            <div className="pt-2">
                <Link to={"/image/" + props.image_url}>
                    <button className="btn btn-dark" onClick={() => {
                        dispatch(edit_image(img));
                    }}>
                        Enlarge picture
                    </button>
                </Link>
            </div>
        </div>
    )
});