import $api from ".";

export default async function getUserData() {
    const respons = await $api.get("/getUserData");
    
    return respons;
}