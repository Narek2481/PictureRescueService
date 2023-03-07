import axios from "axios";
export default async function registration_submit(name, email, login, password) {
    try {
        const respons = await axios.post("http://localhost:4000/registr_submit", {
            name, email, login, password
        });
        console.log(respons.data)
        alert(respons.data || "good");
    }catch(e){
        alert(e);
    }
}