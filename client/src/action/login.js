import $api from ".";
export default async function loginSubmit(login, password) {
    const respons = await $api.post("/user/loginSubmit", {
        login, password
    })
    // const respons = await axios.post("/loginSubmit", {
    //     login, password
    // },{withCredentials:true});
    return respons;

}