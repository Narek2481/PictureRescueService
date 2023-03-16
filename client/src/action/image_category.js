import axios from "axios";
async function image_category_get(state) {
    await axios.post("http://localhost:4000/image_category")
        .then((res) => {
            state.set_requset_category(res.data);
        })
        .catch(err => {
            alert(err)
        })
        .finally(() => state.set_fetching_category(false))

}

async function image_category_post(state) {
    await axios.post("http://localhost:4000/image_category", state.data)
        .then((res) => {
            state.set_requset_category((state) => [...state, ...res.data]);
        })
        .catch(err => {
            alert(err)
        });
}

export { image_category_get, image_category_post } 