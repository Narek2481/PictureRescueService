import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import loginSubmit from "../../../action/login";
import { editCurrentUser, selectCurrentUser } from "../../../reducers/user/userSlice";
import StickyInputLabel from "./StickyInputLabel/StickyInputLabel";
import "../signIn.css"
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";


export default function SignInForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const go_to_home = () => {
        navigate('/home');
    }
    const [x,y] = useCookies([""])
    console.log(x)
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
                            console.log(res.data)
                            if (res.data === "ok") {
                                dispatch(editCurrentUser({ email: login, password, register_or_login: true }));
                                go_to_home();
                            }
                            setLogin("");
                            setPassword("");
                        })
                })}>Submit</button>
            </div>
        </div>
    );
}