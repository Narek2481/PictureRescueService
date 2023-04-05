import axios from "axios";
export default async function loginSubmit(login, password) {
    const respons = await axios.post("http://localhost:4000/loginSubmit", {
        login, password
    });
    return respons;

}