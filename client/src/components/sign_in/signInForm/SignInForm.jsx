import {  useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import loginSubmit from "../../../action/login";
import { editCurrentUser } from "../../../reducers/user/userSlice";
import StickyInputLabel from "./StickyInputLabel/StickyInputLabel";
import "../signIn.scss"
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";


export default function SignInForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies();
    const [validErr, setValidErr] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [styleValidEror, setStyleValidEror] = useState({ login: {}, password: {} });

    const goToHome = () => {
        navigate('/home');
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const validatePassword = password => {
        if (password.length < 8) {
          console.log("Password must be at least 8 characters long.");
          return "Password must be at least 8 characters long."
        }
        return "ok";
      }

    const signInSubmitThen = res => {
        console.log(res)
        if (res.status === 200) {
            console.log(55555)
            dispatch(editCurrentUser(
                {
                    register_or_login: true
                }
            ));
            // removeCookie(["auth"])
            console.log(res.data)
            // if(cookies["login"]){
            //     removeCookie(["login"])
            // }
            // setCookie('login', res.data, { path: '/' });
            goToHome();
        }
        setLogin("");
        setPassword("");
    };

    const signInSubmit = e => {
        e.preventDefault();
        if (validatePassword(password) === "ok" && validateEmail(login)) {
            console.log(111111)
            loginSubmit(login, password)
                .then(res => {
                    console.log(res);
                    signInSubmitThen(res);
                    setStyleValidEror({login:{},password:{}});
                })
                .catch(e => setValidErr(e));
        } else {
            if (validatePassword(password) !== "ok") {
                console.log(validatePassword(password));
                setStyleValidEror({ login: {}, password: { borderBottom: "1px solid red" } });
                setValidErr(validatePassword(password));
            } else if (validateEmail(login) !== "ok") {
                setStyleValidEror({ login: { borderBottom: "1px solid red" }, password: {} });
                setValidErr(`The email address must not contain spaces, contain the "@" symbol,
                contain "." symbol,"." must be followed by at least one character.`);
            }
        }
    };

    return (
        <div>
            <h3 className="container text-danger">{validErr}</h3>
            <StickyInputLabel props={
                useMemo(() => {
                    return {
                        text: "Username",
                        name: "Username",
                        type: "email",
                        inputValue: login,
                        setInputValue: setLogin,
                        style: styleValidEror.login
                    }
                }, [login,styleValidEror])
            } />
            <StickyInputLabel props={
                useMemo(() => {
                    return {
                        text: "Password",
                        name: "Password",
                        type: "password",
                        inputValue: password,
                        setInputValue: setPassword,
                        style: styleValidEror.password
                    }
                }, [password,styleValidEror])
            } />
            <div className="text-center" >
                <button type="submit" onClick={signInSubmit}>Submit</button>
            </div>
        </div>
    );
}