import { Route, Routes ,Navigate} from "react-router-dom";
import AboutUsPage from "../../pages/AboutUsPage"
import SignInPage from "../../pages/SignInPage"
import RegistrationPage from "../../pages/RegistrationPage"
import { useState } from "react";
import HomePage from "../../pages/HomePage";
import LinkComponent from "./linkComponent/linkComponent";
import AddPicturePage from "../../pages/AddPicturePage";
import { useSelector } from "react-redux";
import "./css/nav.css"
import logo from "../../img_logo/logo12.jpg"
import NotFoundPage from "../../pages/NotFoundPage";

export default function Nav() {
    const [manue, setManu] = useState("");
    const [icon_2, setIcon_2] = useState("");
    const [icon_1, setIcon_1] = useState("");
    const [none, setnone] = useState("");
    const login_state = useSelector((state) => state.currentUser);
    console.log(login_state)
    const display = (login_state.register_or_login ? "none" : "");
    // const componenet_not_available = login_state.register_or_login ? [<HomePage />, <HomePage />] : [<SignInPage />, <RegistrationPage />]
    
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
                        <LinkComponent props={
                            {
                                path: "home",
                                text: "Home",
                                click: click_manue
                            }}
                        />
                        <LinkComponent props={
                            {
                                path: "about_us",
                                text: "About us",
                                click: click_manue
                            }}
                        />

                        <LinkComponent props={
                            {
                                path: "sign_in",
                                text: "Sign in",
                                style,
                                click: click_manue
                            }}
                        />

                        <LinkComponent props={
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
                <Route path={"/home"} element={<HomePage />}/>
                <Route path="/about_us/*" element={<AboutUsPage />}/>
                {login_state.register_or_login?"":<Route path="/registration/*" element={<RegistrationPage />}/>}
                {login_state.register_or_login?"": <Route path={"/sign_in/*"} element={<SignInPage />}/>}
                <Route path={"/add_image/*"} element={<AddPicturePage />}/>
                <Route path="/*" element={<NotFoundPage/>} />
            </Routes>
        </>
    );
}


