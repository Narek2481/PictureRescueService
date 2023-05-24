
import $api from ".";
async function imageCategoryGet() {
    return await $api.post("/imageCategory",{withCredentials:true});
}

async function imageCategoryPost(state) {
    return await $api.post("/imageCategory", {category:state},{withCredentials:true})
}

export { imageCategoryGet, imageCategoryPost } 