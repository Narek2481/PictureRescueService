import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import loginSubmit from "../../../action/login";
import { editCurrentUser, selectCurrentUser } from "../../../reducers/user/userSlice";
import StickyInputLabel from "./StickyInputLabel/StickyInputLabel";
import "../signIn.scss"
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";


export default function SignInForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['auth']);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/home');
    }

    return (
        <div>
            <StickyInputLabel props={
                useMemo(() => {
                    return {
                        text: "Username",
                        name: "Username",
                        type: "email",
                        inputValue: login,
                        setInputValue: setLogin
                    }
                }, [login])
            } />
            <StickyInputLabel props={
                useMemo(() => {
                    return {
                        text: "Password",
                        name: "Password",
                        type: "password",
                        inputValue: password,
                        setInputValue: setPassword
                    }
                }, [password])
            } />
            <div className="text-center" >
                <button type="submit" onClick={useCallback((e) => {
                    e.preventDefault();
                    console.log(login, password);
                    loginSubmit(login, password)
                        .then((res) => {
                            console.log(res.data,"datatatatatat")
                            if (res.status === 200) {
                                dispatch(editCurrentUser(
                                    {
                                        email: login, password,
                                        register_or_login: true
                                    }
                                ));
                                removeCookie(["auth"])
                                setCookie(res.data);
                                goToHome();
                            }
                            setLogin("");
                            setPassword("");
                        })
                })}>Submit</button>
            </div>
        </div>
    );
}