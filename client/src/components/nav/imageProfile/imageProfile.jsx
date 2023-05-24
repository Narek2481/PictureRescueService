import img from "../../../img_logo/istockphoto-1130884625-612x612.jpg"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import NotificationImage from "./Notification/NotificationImage";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { editCurrentUser } from "../../../redux/user/userSlice";

const ImageProfile = ({ props }) => {
    const name = useSelector((state) => state.currentUser.name)
    const loginState = useSelector((state) => state.currentUser.register_or_login)
    const dispatch = useDispatch()
    useEffect(() => {
        if (name === "") {
            const name = Cookies.get('name');
            dispatch(editCurrentUser(
                { name: name, register_or_login:loginState}
            ));
        }
    }, [])
    console.log(name)
    return (
        <li style={props.style} className="profileImage">
            <> {name}</>
            <img src={img} alt="" />
            <NotificationImage />
        </li>

    )
}
export default ImageProfile;