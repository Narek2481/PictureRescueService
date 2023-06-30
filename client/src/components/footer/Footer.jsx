
import { Link, Route, Routes } from "react-router-dom";
import { memo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/userSlice";
import Social from "./social/social"
import facebook from "../../img_logo/facebook (1).png"
import instagram from "../../img_logo/instagram (1).png"
import gmail from "../../img_logo/gmail.png"
import twitter from "../../img_logo/twitter.png"
import "./css/footer.scss"


export default memo(function Footer() {
    const loginState = useSelector(selectCurrentUser)
    console.log(loginState.register_or_login);
    return (
        <footer className="text-center">
            <ul className="row">
                <li className={"col-4"+loginState.register_or_login ? "col-6" :"col-4" }>
                    <Link to='/home'>Home</Link>
                </li>
                <li className={"col-4"+loginState.register_or_login ? "col-6" :"col-4" }>
                    <Link to="/About_us">About us</Link>
                </li>
                {loginState.register_or_login ? "":<li className="col-4" >
                    <Link to="/Sign_in">Sign in</Link>
                </li>}
                
                <Social props={{ text: "instagram", src: instagram }}></Social>
                <Social props={{ text: "twitter", src: twitter }}></Social>
                <Social props={{ text: "gmail", src: gmail }}></Social>
                <Social props={{ text: "facebook", src: facebook }}></Social>
            </ul>
        </footer>
    );
})