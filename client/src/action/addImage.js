import axios from "axios";

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
    formData.append("userToken",userToken);
    console.log(formData);
    axios.post('http://localhost:4000/imagePush', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}