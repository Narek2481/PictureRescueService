import axios from "axios";
export default async function home(category) {
    try {
        const respons = await axios.get("http://localhost:4000/image_loud",category);
        // console.log(respons.data);
        return respons
    }catch(e){
        return e
    }
}