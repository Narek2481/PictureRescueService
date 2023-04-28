import axios from "axios";
export default async function loginSubmit(login, password) {
    const respons = await axios.post("/loginSubmit", {
        login, password
    },{withCredentials:true});
    return respons;

}