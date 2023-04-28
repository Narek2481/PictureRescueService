import axios from "axios";
export default async function registrationSubmit(name, lastname, email, password) {

    const respons = await axios.post("/registrationSubmit", {
        name, lastname, email, password
    },{withCredentials:true});
    return respons;

}