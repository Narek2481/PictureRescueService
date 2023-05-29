import $api from ".";
export default async function getNotification() {

    const respons = await $api.get("/getNotification");

    return respons;

}