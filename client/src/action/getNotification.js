import $api from ".";
export default async function getNotification() {

    const respons = await $api.post("/getNotification");

    return respons;

}