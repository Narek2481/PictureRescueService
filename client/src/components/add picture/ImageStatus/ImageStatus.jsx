import { memo } from "react";
import img1 from "../../../img_logo/1916606.png";
import img2 from "../../../img_logo/download.png";
import { Link } from "react-router-dom";

const ImageStatus = ({ props }) => {

    return (
        <div>
            {props.reqMessige}
            <img src={img1} alt="" className="img-fluid" />
            <div className="add_container">
                {/* route for adding pictures */}
                <Link className="go_add_image" to={"/add_image"}>
                    Add another picture
                </Link>
            </div>
            <div className="add_container">
                {/* route for adding pictures */}
                <Link className="go_add_image" to={"/home"}>
                    Go to home page
                </Link>
            </div>
        </div>
    )
}

export default memo(ImageStatus);