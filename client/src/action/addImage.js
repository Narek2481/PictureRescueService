import $api from ".";

export default async function imagePush(imageData, selectValue, createCategory,publicImage,userToken) {
    const formData = new FormData();
    formData.append('image', imageData);
    // const categorys = {
    //     selectValue : selectValue,
    //     newCategory :createCategory
    // };
    formData.append("selectValue",selectValue);
    formData.append("newCategory",createCategory);
    formData.append("publicImage",publicImage);
    // formData.append("userToken",userToken.login.token);
    console.log(formData);
    const response =  await $api.post('/imagePush', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    },{withCredentials:true});
    return response;
}