import axios from "axios";

export async function loudeData() {
        return await axios.get("http://localhost:4000/image_loud")
}
