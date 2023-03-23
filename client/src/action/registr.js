import axios from "axios";
export default async function registration_submit(name, lastname, email, password) {

    const respons = await axios.post("http://localhost:4000/registration_submit", {
        name, lastname, email, password
    });
    return respons;

}