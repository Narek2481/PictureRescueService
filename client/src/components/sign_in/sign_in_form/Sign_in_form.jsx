import {  useState } from "react";
import { useDispatch  } from "react-redux";
import login_submit from "../../../action/login";
import { edit_current_user, select_current_user } from "../../../reducers/user/user_slice";
import StickyInputLabel from "./StickyInputLabel/StickyInputLabel";
import "../sign_in.css"

export default function Sign_in_form() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    return (
        <div>
            <StickyInputLabel props={
                {
                    text:"Username",
                    name: "Username",
                    type: "email",
                    inputValue: login,
                    setInputValue: setLogin
                }
            } />
            <StickyInputLabel props={
                {
                    text:"Password",
                    name: "Password",
                    type: "password",
                    inputValue: password,
                    setInputValue: setPassword
                }
            } />
            <div className="text-center" >
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
                }}>Submit</button>
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