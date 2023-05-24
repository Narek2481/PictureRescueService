import $api from ".";

export async function loudeData(offset,categoryValue) {
        return await $api.post("/imageLoud",{offset,categoryValue},{withCredentials:true})
}
