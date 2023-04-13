import axios from "axios";
async function imageCategoryGet() {
    return await axios.post("http://localhost:4000/image_category");
}

async function imageCategoryPost(state) {
    return await axios.post("http://localhost:4000/image_category", {category:state})
}

export { imageCategoryGet, imageCategoryPost } 