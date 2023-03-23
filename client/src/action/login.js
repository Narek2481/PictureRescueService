import axios from "axios";
export default async function login_submit(login, password) {
    const respons = await axios.post("http://localhost:4000/login_submit", {
        login, password
    });
    return respons;

}