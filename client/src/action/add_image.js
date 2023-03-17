import axios from "axios";

export default async function image_push(image_data) {
    // const data = new FormData();
    // data.append('file', image_data);
    // await axios.post("http://localhost:4000/image_push",
    //     { image: data }
    // )
    //     .then((res) => alert(res.data))
    //     .catch((e) => alert(e))
    // // .finally(() => image_data.set_image_data(null))
    let formData = new FormData();
    formData.append("image", image_data.image_data);
    await axios.post('http://localhost:4000/image_push', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((data) => {
            alert(data.status)
            console.log(data)
        })
        .catch((e) => alert(e))

}