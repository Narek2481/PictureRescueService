import { useState, useEffect } from "react";
import axios from "axios";

const Select_category = () => {
    const [requset_category, set_requset_category] = useState([]);
    const [fetching, setFetching] = useState(true);
    useEffect(() => {
        axios.get("http://localhost:4000/image_loud")
            .then((res) => {
                set_requset_category([res.data]);
            })
            .catch(err => {
                alert(err)
            })
            .finally(() => setFetching(false))
    }, [fetching]);
    return (
        <div className="">
            <label for="cars">choose a category</label>
            <select name="category" id="">
                {
                    requset_category.map((elem) => {
                        return (
                            <option value={elem.value}>{elem.value}</option>
                        )
                    })
                }
            </select>
        </div>
    )
};

export default Select_category;