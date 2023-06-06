import $api from ".";

export default async function registrationSubmit(name, lastname, email, password) {
    const respons = await $api.post("/user/registrationSubmit", {
        name, lastname, email, password
    })
    return respons;
}