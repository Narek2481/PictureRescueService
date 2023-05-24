import $api from ".";

export default async function  addAvatar(data) {
    const formData = new FormData();
    formData.append('Avatar', data);
    
    const res = await $api.post('/avatarPush', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return res;
}