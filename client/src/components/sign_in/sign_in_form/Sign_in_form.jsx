import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import login_submit from "../../../action/login";
import { edit_current_user, select_current_user } from "../../../reducers/user/user_slice";
import StickyInputLabel from "./StickyInputLabel/StickyInputLabel";
import "../sign_in.css"
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

export default function Sign_in_form() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const go_to_home = () => {
        navigate('/home');
    }
    console.log(Cookies.get('auth'))
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
                    login_submit(login, password)
                        .then((res) => {
                            console.log(res.data)
                            if (res.data === "ok") {
                                dispatch(edit_current_user({ email: login, password, register_or_login: true }));
                                go_to_home();
                            }
                            setLogin("");
                            setPassword("");
                        })
                })}>Submit</button>
            </div>
            {/* <div>
                <div>
                    <label htmlFor="login">
                        Login
                    </label>
                </div>
                <input
                    placeholder="email"
                    className="form-control"
                    type="text"
                    name="email"
                    value={login} onChange={(e) => setLogin(e.target.value)
                    } />
            </div>
            <div>
                <div>
                    <label htmlFor="password">Password</label>
                </div>
                <input
                    placeholder="password"
                    className="form-control"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)
                    } />
            </div>
            <button type="submit" onClick={(e) => {
                e.preventDefault();
                console.log(login, password);
                login_submit(login, password)
                    .then((res) => {
                        if (res.data === "ok") {
                            dispatch(edit_current_user({ email: login, password, register_or_login: true }));
                        }
                        setLogin("");
                        setPassword("");
                    })
            }}>Submit</button> */}
        </div>
    );
}