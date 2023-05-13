import axios from "axios";
async function imageCategoryGet() {

    return await axios.post("/imageCategory",{withCredentials:true});
}

async function imageCategoryPost(state,pastData) {
    

    return await axios.post("/imageCategory", {category:state,pastData},{withCredentials:true})
}

export { imageCategoryGet, imageCategoryPost } 