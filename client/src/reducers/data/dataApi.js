import axios from "axios";

export async function loudeData(offset,categoryValue) {
        return await axios.post("/imageLoud",{offset,categoryValue},{withCredentials:true})
}
