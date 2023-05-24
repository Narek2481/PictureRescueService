import $api from ".";

export default async function shareImage (data) {
    const req = await $api.post("/share", {
        email:data.email,
        imageId:data.id
    },{withCredentials:true})
    return req
} 