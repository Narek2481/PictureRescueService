import axios from "axios";
async function imageCategoryGet() {
    console.log("imageCategoryGet")
    return await axios.post("/imageCategory",{withCredentials:true});
}

async function imageCategoryPost(state,pastData) {
    console.log(state,5577777)

    return await axios.post("/imageCategory", {category:state,pastData},{withCredentials:true})
}

export { imageCategoryGet, imageCategoryPost } 