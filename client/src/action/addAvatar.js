import axios from "axios";

export default async function  addAvatar(data) {
    const formData = new FormData();
    formData.append('Avatar', data);
    
    const res = await axios.post('/avatarPush', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    },{withCredentials:true})
    return res
}