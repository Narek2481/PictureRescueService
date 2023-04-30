import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import AboutUsPage from "../../pages/AboutUsPage"
import SignInPage from "../../pages/SignInPage"
import RegistrationPage from "../../pages/RegistrationPage"
import { useEffect, useMemo, useState } from "react";
import HomePage from "../../pages/HomePage";
import LinkComponent from "./linkComponent/linkComponent";
import AddPicturePage from "../../pages/AddPicturePage";
import { useDispatch, useSelector } from "react-redux";
import "./css/nav.scss"
import logo from "../../img_logo/logo12.jpg"
import NotFoundPage from "../../pages/NotFoundPage";
import { editCurrentUser } from "../../reducers/user/userSlice";
import ImageProfile from "./imageProfile/imageProfile";


export default function Nav() {
    // hamburger manue state
    const [manue, setManu] = useState("");
    // manue components open or close 
    const [icon_2, setIcon_2] = useState("");
    const [icon_1, setIcon_1] = useState("");
    const [none, setnone] = useState("");
    // register or login state 
    const loginState = useSelector((state) => state.currentUser);
    const dispatch = useDispatch();
    // register or login styles 
    const display = (loginState.register_or_login ? "none" : "");
    const displayInImageProfile = loginState.register_or_login ? "" : "none"
    // register or login examination
    const navigate = useNavigate();
    useEffect(() => {
        console.log(localStorage.auth === "true")
        const data = localStorage.data ? JSON.parse(localStorage.data) : ""
        if (localStorage.auth === "true" && data) {
            console.log(data)
            dispatch(editCurrentUser({ register_or_login: true, name: data.name }));
        } else {
            navigate("/sign_in");
        }

        // if (!loginState.register_or_login && cookie) {
        //     dispatch(editCurrentUser({ register_or_login: true, name: cookie.name }));
        // } else {
        //     navigate("/sign_in");
        // }
    }, []);


    const styleInLinkComponent = {
        display
    }
    const styleInImageProfile = { display: displayInImageProfile };

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
                <ul className="container-fluid">
                    <div className="logo_manue">
                        <div>
                            <img className="img-fluid"
                                src={logo} alt=""
                                style={{ width: "50px", height: "40px", borderRadius: "50px" }} />
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
                            }, [loginState])
                        }
                        />
                        <LinkComponent props={
                            useMemo(() => {
                                return {
                                    path: "about_us",
                                    text: "About us",
                                    click: clickManue
                                }
                            }, [loginState])
                        }
                        />

                        <LinkComponent props={
                            useMemo(() => {
                                return {
                                    path: "sign_in",
                                    text: "Sign in",
                                    style: styleInLinkComponent,
                                    click: clickManue
                                }
                            }, [loginState])
                        }
                        />

                        <LinkComponent props={
                            useMemo(() => {
                                return {
                                    path: "registration",
                                    text: "Registration",
                                    style: styleInLinkComponent,
                                    click: clickManue
                                }
                            }, [loginState])
                        }
                        />
                        <ImageProfile props={
                            useMemo(() => {
                                return {
                                    style: styleInImageProfile
                                }
                            }, [loginState])
                        }
                        />
                    </div>

                </ul>
            </nav>
            <Routes>
                <Route path={"/"} element={<Navigate to="/home" replace />} />
                <Route path={"/home"} element={<HomePage />} />
                <Route path="/about_us/*" element={<AboutUsPage />} />
                {loginState.register_or_login ? "" : <Route path="/registration/*" element={<RegistrationPage />} />}
                {loginState.register_or_login ? "" : <Route path={"/sign_in/*"} element={<SignInPage />} />}
                {loginState.register_or_login ? <Route path={"/add_image/*"} element={<AddPicturePage />} /> : ""}
                <Route path="/*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}


