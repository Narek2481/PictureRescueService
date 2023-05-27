import $api from ".";

export async function loudeData(offset,categoryValue) {
        console.log(offset,categoryValue)
        return await $api.get("/imageLoud",{params:{offset,categoryValue}},{withCredentials:true})
}
