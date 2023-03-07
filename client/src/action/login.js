import axios from "axios";
export default async function login_submit(login, password) {
    try {
        const respons = await axios.post("http://localhost:4000/login_submit", {
            login, password
        });
        alert(respons.data || "good");
    }catch(e){
        alert(e);
    }
}