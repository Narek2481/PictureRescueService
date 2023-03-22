import axios from "axios";

export default async function image_push(image_data) {
    const formData = new FormData();
    formData.append('image', image_data.image_data);
    console.log(formData);
    axios.post('http://localhost:4000/image_push', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}