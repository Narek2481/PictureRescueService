import $api from ".";

const downlodeImageProfile = async () => {
    const response = await $api.get("/getAvatar", { responseType: 'arraybuffer' });
    const blob = new Blob([response.data], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    return url
}

export default downlodeImageProfile;