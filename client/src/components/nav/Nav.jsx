import { Route, Routes ,Navigate} from "react-router-dom";
import About_us from "../../pages/About_us"
import Sign_in_page from "../../pages/Sign_in_page"
import Registration_page from "../../pages/Registration_page"
import { useState } from "react";
import Home_page from "../../pages/Home_page";
import Link_component from "./link_component/link_component";
import Add_picture_page from "../../pages/Add_picture_page";
import { useSelector } from "react-redux";
import "./css/nav.css"
import logo from "../../img_logo/logo12.jpg"
import Not_found_page from "../../pages/not_found_page";

export default function Nav() {
    const [manue, setManu] = useState("");
    const [icon_2, setIcon_2] = useState("");
    const [icon_1, setIcon_1] = useState("");
    const [none, setnone] = useState("");
    const login_state = useSelector((state) => state.current_user);
    console.log(login_state)
    const display = (login_state.register_or_login ? "none" : "");
    // const componenet_not_available = login_state.register_or_login ? [<Home_page />, <Home_page />] : [<Sign_in_page />, <Registration_page />]
    
    const style = {
        display
    }
    const click_manue = () => {
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

    }
    return (
        <>
            <nav>
                <ul className="container-fluid">
                    <div className="logo_manue">
                        <div>
                            <img className="img-fluid" 
                            src={logo} alt="" 
                            style={{width:"50px",height:"40px", borderRadius:"50px"}} />
                        </div>
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
                                text: "Home",
                                click: click_manue
                            }}
                        />
                        <Link_component props={
                            {
                                path: "about_us",
                                text: "About us",
                                click: click_manue
                            }}
                        />

                        <Link_component props={
                            {
                                path: "sign_in",
                                text: "Sign in",
                                style,
                                click: click_manue
                            }}
                        />

                        <Link_component props={
                            {
                                path: "registration",
                                text: "Registration",
                                style,
                                click: click_manue
                            }}
                        />

                    </div>

                </ul>
            </nav>
            <Routes>
                <Route path={"/"} element={<Navigate to="/home" replace/>}/>
                <Route path={"/home"} element={<Home_page />}/>
                <Route path="/about_us/*" element={<About_us />}/>
                {login_state.register_or_login?"":<Route path="/registration/*" element={<Registration_page />}/>}
                {login_state.register_or_login?"": <Route path={"/sign_in/*"} element={<Sign_in_page />}/>}
                <Route path={"/add_image/*"} element={<Add_picture_page />}/>
                <Route path="/*" element={<Not_found_page/>} />
            </Routes>
        </>
    );
}


