import About_us from "../../pages/About_us"
import Sign_in from "../../pages/Sign_in"
import Registration from "../../pages/Registration"
import { Link, Route, Routes } from "react-router-dom";
import { memo } from "react";

export default memo(function Footer() {
    return (
        <footer>
            <ul>
                <li>
                    <Link to='/home'>Home</Link>
                </li>
                <li>
                    <Link to="/About_us">About us</Link>
                </li>
                <li>
                    <Link to="/Sign_in">Sign in</Link>
                </li>
            </ul>
        </footer>
    );
})