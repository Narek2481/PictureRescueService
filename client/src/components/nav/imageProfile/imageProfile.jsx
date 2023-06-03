import img from "../../../img_logo/istockphoto-1130884625-612x612.jpg"
import { useDispatch, useSelector } from "react-redux";
import NotificationImage from "./Notification/NotificationImage";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { editCurrentUser } from "../../../redux/user/userSlice";
import $api from "../../../action";

const ImageProfile = ({ props }) => {
    const name = useSelector((state) => state.currentUser.name)
    const loginState = useSelector((state) => state.currentUser.register_or_login)
    const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        $api
            .get("/getAvatar", { responseType: 'arraybuffer' })
            .then((response) => {
                const blob = new Blob([response.data], { type: 'image/png' });
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            })
            .catch((error) => {
                console.log("Error fetching image:", error);

            });
    }, []);

    useEffect(() => {
        if (name === "") {
            const name = Cookies.get('name');
            dispatch(editCurrentUser(
                { name: name, register_or_login: loginState }
            ));
        }
    }, [])

    return (
        <li style={props.style} className="profileImage">
            <span> {name}</span>
            <img src={imageUrl ?imageUrl :img} alt="Avatar" />
            {loginState ? <NotificationImage /> : ""}
        </li>
    )
}
export default ImageProfile;