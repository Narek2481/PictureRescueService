import axios from "axios";
export default async function image_loud(state) {
    await axios.get("http://localhost:4000/image_loud")
        .then((res) => {
            state.setData((data) => [...data, ...res.data]);
        })
        .catch(err => {
            alert(err)
        })
        .finally(() => state.setFetching(false))

}