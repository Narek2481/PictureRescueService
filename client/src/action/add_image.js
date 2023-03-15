import axios from "axios";
export default async function image_push(image_data) {
    const respons = await axios.get("http://localhost:4000/image_loud");
    return respons
}