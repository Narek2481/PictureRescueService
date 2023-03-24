import axios from "axios";
async function image_category_get(state) {
    return await axios.post("http://localhost:4000/image_category");
}

async function image_category_post(state) {
    return await axios.post("http://localhost:4000/image_category", {category:state})
}

export { image_category_get, image_category_post } 