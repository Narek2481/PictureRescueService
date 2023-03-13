import { Route, Routes } from "react-router-dom";
import About_us from "../about_us/About_us"
import Sign_in from "../sign_in/Sign_in"
import Registration from "../Registration/Registration"
import { useState } from "react";
import Home from "../Home/Home";
import Link_component from "./link_component/link_component";


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
                                setManu('manu_block');
                            } else {
                                setIcon_1("");
                                setIcon_2("");
                                setnone("");
                                setManu('');
                            }
                        }}>
                            <span className={"all_span " + icon_1}></span>
                            <span className={"all_span  " + icon_2} ></span>
                            <span className={"all_span  " + none}></span>
                        </div>
                    </div>
                    <div className={"navigation " + manue}>
                        <Link_component props={
                            {
                                path: "home",
                                text: "Home"
                            }}
                        />
                        <Link_component props={
                            {
                                path: "about_us",
                                text: "About us"
                            }}
                        />
                        <Link_component props={
                            {
                                path: "sign_in",
                                text: "Sign in"
                            }}
                        />

                        <Link_component props={
                            {
                                path: "registration",
                                text: "Registration"
                            }}
                        />
                    </div>

                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/home/*" element={<Home />}></Route>
                <Route path="/about_us/*" element={<About_us />}></Route>
                <Route path="/registration/*" element={<Registration />}></Route>
                <Route path="/sign_in/*" element={<Sign_in />}></Route>
            </Routes>
        </>
    );
}


