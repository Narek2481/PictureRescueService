import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import NotificationImage from "./Notification/NotificationImage";
import { editCurrentUser } from "../../../redux/user/userSlice";

const ImageProfile = ({ props }) => {
    const name = useSelector((state) => state.currentUser.name)
    const loginState = useSelector((state) => state.currentUser.register_or_login)
    const dispatch = useDispatch()
    const profileImage = useSelector((state) => state.ProfileImage);
    useEffect(() => {
        if (name === "") {
            const name = Cookies.get('name');
            dispatch(editCurrentUser({ name, register_or_login: loginState }));
        }
    })

    return (
        <li style={props.style} className="profileImage">
            <span> {name}</span>
            <img src={profileImage} alt="Avatar" />
            {loginState ? <NotificationImage /> : ""}
        </li>
    )
}
export default ImageProfile;