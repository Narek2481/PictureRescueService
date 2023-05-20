import axios from "axios";
export default async function getNotification() {

    const respons = await axios.get("/getNotification",{withCredentials:true}) 
        .then(req => {
            return []
        })
        .catch(e => {
            console.log(e)
            return []
        })
    ;

    return respons;

}