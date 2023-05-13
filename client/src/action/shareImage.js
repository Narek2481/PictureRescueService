import axios from "axios";

export default async function shareImage (data) {
    const req = await axios.post("/share", {
        email:data.email,
        imageId:data.id
    },{withCredentials:true})
    return req
} 