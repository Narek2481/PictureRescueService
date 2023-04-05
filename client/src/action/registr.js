import axios from "axios";
export default async function registrationSubmit(name, lastname, email, password) {

    const respons = await axios.post("http://localhost:4000/registrationSubmit", {
        name, lastname, email, password
    });
    return respons;

}