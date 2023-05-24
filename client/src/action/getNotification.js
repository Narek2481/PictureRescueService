import $api from ".";
export default async function getNotification() {

    const respons = await $api.get("/getNotification") 
        .then(req => {
            return []
        })
        .catch(e => {
            console.log(e)
            return []
        })
    ;

    return respons;

}