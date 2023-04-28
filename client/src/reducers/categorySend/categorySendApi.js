import axios from "axios";
async function imageCategoryGet() {
    return await axios.post("/imageCategory",{withCredentials:true});
}

async function imageCategoryPost(state) {
    return await axios.post("/imageCategory", {category:state},{withCredentials:true})
}

export { imageCategoryGet, imageCategoryPost } 