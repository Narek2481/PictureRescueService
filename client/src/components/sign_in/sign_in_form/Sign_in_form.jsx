import { useState } from "react";
import login_submit from "../../../action/login";


export default function Sign_in_form() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    return (
        <form>
            <div>
                <div>
                    <label htmlFor="login">
                        Login
                    </label>
                </div>
                <input
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
                    .then(() => {
                        setLogin("");
                        setPassword("");
                    })
            }}>Submit</button>
        </form>
    );
}