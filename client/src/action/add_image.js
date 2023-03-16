import axios from "axios";
export default async function image_push(image_data) {
    await axios.post("http://localhost:4000/image_push")
        .then((res) => alert(res.data))
        .catch((e) => alert(e))
        .finally(() => image_data.setImage(null))

}