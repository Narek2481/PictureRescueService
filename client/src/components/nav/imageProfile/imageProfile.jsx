import img from "../../../img_logo/istockphoto-1130884625-612x612.jpg"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import NotificationImage from "./Notification/NotificationImage";


const ImageProfile = ({ props }) => {
    const name = useSelector((state) => state.currentUser.name)

    return (
        <li style={props.style} className="profileImage">
            <> {name}</>
            <img src={img} alt="" />
            <NotificationImage/>
        </li>

    )
}
export default ImageProfile;