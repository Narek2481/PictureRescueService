import axios from "axios";
async function image_category_get() {
    const respons = await axios.post("http://localhost:4000/image_category");
    return respons;
}

async function image_category_post(data) {
    const respons = await axios.post("http://localhost:4000/image_category", data)
    return respons;
}

export { image_category_get, image_category_post } 