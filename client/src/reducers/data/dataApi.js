import axios from "axios";

export async function loudeData(offset) {
        return await axios.post("http://localhost:4000/image_loud",{offset})
}
