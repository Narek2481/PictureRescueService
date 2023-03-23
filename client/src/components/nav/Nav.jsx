import { Route, Routes } from "react-router-dom";
import About_us from "../../pages/About_us"
import Sign_in from "../../pages/Sign_in"
import Registration from "../../pages/Registration"
import { useState } from "react";
import Home from "../../pages/Home";
import Link_component from "./link_component/link_component";
import Add_picture_page from "../../pages/Add_picture_page";
import { useSelector } from "react-redux";
import { select_current_user } from "../../reducers/user/user_slice";


export default function Nav() {
    const [manue, setManu] = useState("");
    const [icon_2, setIcon_2] = useState("");
    const [icon_1, setIcon_1] = useState("");
    const [none, setnone] = useState("");
    const login_state = useSelector((state)=> state.current_user );
    console.log(login_state)
    const display = (login_state.register_or_login ? "none": "");
    const componenet_not_available = login_state.register_or_login ? [<Home/>,<Home/>] :[<Sign_in />,<Registration />]
    const style = {
        display
    }
    
    return (
        <>
            <nav>
                <ul  className="container">
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
                                text: "Sign in",
                                style
                            }}
                        />

                        <Link_component props={
                            {
                                path: "registration",
                                text: "Registration",
                                style
                            }}
                        />
                        
                    </div>

                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/about_us/*" element={<About_us />}></Route>
                <Route path="/registration/*" element={componenet_not_available[1]}></Route>
                <Route path={"/sign_in/*"} element={componenet_not_available[0]}></Route>
                <Route path={"/add_image/*"} element={<Add_picture_page/>}></Route>
            </Routes>
        </>
    );
}


