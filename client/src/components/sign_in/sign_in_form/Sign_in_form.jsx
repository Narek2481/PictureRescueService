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
                <input type="text" name="login"
                    value={login} onChange={(e) => setLogin(e.target.value)
                    } />
            </div>
            <div>
                <div>
                    <label htmlFor="password">Password</label>
                </div>
                <input type="password" name="password" value={password}
                    onChange={(e) => setPassword(e.target.value)
                    } />
            </div>
            <button type="submit" onClick={(e) => {
                e.preventDefault();
                console.log(login, password);
                login_submit(login, password);
            }}>Submit</button>
        </form>
    );
}