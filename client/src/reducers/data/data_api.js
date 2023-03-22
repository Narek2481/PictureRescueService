import axios from "axios";

export async function loude_data () {
        return await axios.get("http://localhost:4000/image_loud")
            // .then((res) => {
            //     console.log([...data, ...res.data]);
            //     return [...data, ...res.data];
            // })
            // .catch(err => {
            //     alert(err)
            // })
    }
