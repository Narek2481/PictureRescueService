import axios from "axios";

export async function loudeData(offset) {
        return await axios.post("/image_loud",{offset},{withCredentials:true})
}
