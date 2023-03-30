import facebook from "../../img_logo/facebook (1).png"
import instagram from "../../img_logo/instagram (1).png"
import gmail from "../../img_logo/gmail.png"
import twitter from "../../img_logo/twitter.png"
import { Link, Route, Routes } from "react-router-dom";
import { memo } from "react";
import Social from "./social/social"
import "./css/footer.css"

export default memo(function Footer() {
    return (
        <footer className="text-center">
            <ul className="row">
                <li className="col-4">
                    <Link to='/home'>Home</Link>
                </li>
                <li className="col-4">
                    <Link to="/About_us">About us</Link>
                </li>
                <li className="col-4">
                    <Link to="/Sign_in">Sign in</Link>
                </li>
                <Social props={{ text: "instagram", src: instagram }}></Social>
                <Social props={{ text: "twitter", src: twitter }}></Social>
                <Social props={{ text: "gmail", src: gmail }}></Social>
                <Social props={{ text: "facebook", src: facebook }}></Social>
            </ul>
        </footer>
    );
})