import About_us from "../anout_us/About_us"
import Sign_in from "../sign_in/Sign_in"
import Registration from "../Registration/Registration"
import { Link, Route, Routes } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <footer>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to="About_us">About us</Link>
                    </li>
                    <li>
                        <Link to="Sign_in">Sign in</Link>
                    </li>
                </ul>
            </footer>
            <Routes>
                <Route path="/" element></Route>
                <Route path="/About_us" element={<About_us></About_us>}></Route>
                <Route path="/Sign_in" element={<Sign_in />}></Route>
            </Routes>

        </>
    );
}