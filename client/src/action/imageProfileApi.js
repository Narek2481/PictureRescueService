import $api from ".";

const downlodeImageProfile = async () => {
    const response = await $api.get("/getAvatar", { responseType: 'arraybuffer' });
    if (response.data.byteLength>0) {
        const blob = new Blob([response.data], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        return url
    }else{
       return undefined
    }

    
}

export default downlodeImageProfile;