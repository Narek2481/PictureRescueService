import $api from ".";
async function imageCategoryGet() {

    return await $api.post("/imageCategory",{withCredentials:true});
}

async function imageCategoryPost(state,pastData) {
    

    return await $api.post("/imageCategory", {category:state,pastData},{withCredentials:true})
}

export { imageCategoryGet, imageCategoryPost } 