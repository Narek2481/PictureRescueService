import { Route, Routes, Navigate } from "react-router-dom";
import AboutUsPage from "../../pages/AboutUsPage"
import SignInPage from "../../pages/SignInPage"
import RegistrationPage from "../../pages/RegistrationPage"
import {  useMemo, useState } from "react";
import HomePage from "../../pages/HomePage";
import LinkComponent from "./linkComponent/linkComponent";
import AddPicturePage from "../../pages/AddPicturePage";
import {  useSelector } from "react-redux";
import "./css/nav.scss"
import logo from "../../img_logo/logo12.jpg"
import NotFoundPage from "../../pages/NotFoundPage";
import ImageProfile from "./imageProfile/imageProfile";
import { selectCurrentUser } from "../../redux/user/userSlice";
import Logout from "./logout/Logout";
import PersonalAreaPage from "../../pages/PersonalAreaPage";


export default function Nav() {
    // hamburger manue state
    const [manue, setManu] = useState("");
    // manue components open or close 
    const [icon_2, setIcon_2] = useState("");
    const [icon_1, setIcon_1] = useState("");
    const [none, setnone] = useState("");
    // register or login state 
    const auth = useSelector(selectCurrentUser);
    // register or login styles 
    const display = (auth.register_or_login ? "none" : "");
    const displayInImageProfile = auth.register_or_login ? "" : "none"
    const styleInLinkComponent = {
        display
    }
    const styleInImageProfile = { display: displayInImageProfile, cursor: "pointer" };

    const clickManue = () => {
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
                <ul className="container-fluid pt-2 pb-2">
                    <div className="logo_manue">
                        <div>
                            <div className="slame"></div>
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
                            useMemo(() => {
                                return {
                                    path: "home",
                                    text: "Home",
                                    click: clickManue
                                }
                            }, [auth,manue])
                        }
                        />
                        <LinkComponent props={
                            useMemo(() => {
                                return {
                                    path: "about_us",
                                    text: "About us",
                                    click: clickManue
                                }
                            }, [auth,manue])
                        }
                        />

                        <LinkComponent props={
                            useMemo(() => {
                                return {
                                    path: "sign_in",
                                    text: "Sign In",
                                    style: styleInLinkComponent,
                                    click: clickManue
                                }
                            }, [auth,manue])
                        }
                        />

                        <LinkComponent props={
                            useMemo(() => {
                                return {
                                    path: "registration",
                                    text: "Sign Up",
                                    style: styleInLinkComponent,
                                    click: clickManue
                                }
                            }, [auth,manue])
                        }
                        />
                        <LinkComponent props={
                            useMemo(() => {
                                return {
                                    path: "personalArea",
                                    text: "Own space",
                                    style: styleInImageProfile,
                                    click: clickManue
                                }
                            }, [auth,manue])
                        }
                        />
                        <ImageProfile props={
                            useMemo(() => {
                                return {
                                    style: styleInImageProfile,
                                    click: clickManue
                                }
                            }, [auth,manue])
                        }
                        />
                        <Logout props={
                            useMemo(() => {
                                return {
                                    style: styleInImageProfile,
                                    click: clickManue
                                }
                            }, [auth,manue])}
                        />
                    </div>

                </ul>
            </nav>
            <Routes>
                <Route path={"/"} element={<Navigate to="/home" replace />} />
                <Route path={"/home"} element={<HomePage />} />
                <Route path="/about_us/*" element={<AboutUsPage />} />
                {auth.register_or_login ? "" : <Route path="/registration/*" element={<RegistrationPage />} />}
                {auth.register_or_login ? "" : <Route path={"/sign_in/*"} element={<SignInPage />} />}
                {auth.register_or_login ? <Route path={"/add_image/*"} element={<AddPicturePage />} /> : ""}
                <Route path="/*" element={<NotFoundPage />} />
                {auth.register_or_login ? <Route path={"/personalArea/*"} element={<PersonalAreaPage/>} /> : ""}
            </Routes>
        </>
    );
}


