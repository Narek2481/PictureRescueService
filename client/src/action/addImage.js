import axios from "axios";

export default async function imagePush(image_data) {
    // image_data.create
    const new_category = image_data.image_data.create_category || "null"
    const formData = new FormData();
    formData.append('image', image_data.image_data);
    console.log(formData);
    axios.post('http://localhost:4000/imagePush', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: {
            select_value : image_data.select_value,
            new_category
        }
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}