import { Link, Route, Routes } from "react-router-dom";
import About_us from "../anout_us/About_us"
import Sign_in from "../sign_in/Sign_in"
import Registration from "../Registration/Registration"
import { useState } from "react";

export default function Nav() {
    const [manue, setManu] = useState("");
    const [icon_2, setIcon_2] = useState("");
    const [icon_1, setIcon_1] = useState("");
    const [none, setnone] = useState("");
    return (
        <>
            <nav>
                <ul>
                    <div className="logo_manue">
                        <div>Logo</div>
                        <div className="manue_icon" onClick={() => {
                            if (manue === '') {
                                setIcon_1("manue_close_1");
                                setIcon_2("manue_close_2");
                                setnone("none_span");
                                setManu('manu_block' );
                            } else {
                                setIcon_1("");
                                setIcon_2("");
                                setnone("");
                                setManu('');
                            }
                        }}>
                            <span className={"all_span "+icon_1}></span>
                            <span className={"all_span  "+icon_2} ></span>
                            <span className={"all_span  "+none}></span>
                        </div>
                    </div>
                    <div className={"navigation "+manue }>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to="About_us">About us</Link>
                        </li>
                        <li>
                            <Link to="Sign_in">Sign in</Link>
                        </li>
                        <li>
                            <Link to="Registration">Registration</Link>
                        </li>
                    </div>

                </ul>
            </nav>
            <Routes>
                <Route path="/" element></Route>
                <Route path="/About_us/*" element={<About_us></About_us>}></Route>
                <Route path="/Registration/*" element={<Registration />}></Route>
                <Route path="/Sign_in/*" element={<Sign_in />}></Route>
            </Routes>
        </>
    );
}


