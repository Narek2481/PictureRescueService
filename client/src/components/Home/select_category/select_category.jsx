import { useState, useEffect } from "react";
import axios from "axios";

const Select_category = ({ props }) => {
    const [requset_category, set_requset_category] = useState([]);
    const [fetching_select, set_fetching_select] = useState(true);
    const [select_value, set_select_value] = useState("All")
    useEffect(() => {
        axios.get("http://localhost:4000/image_get", { x: "po" })
            .then((res) => {
                set_requset_category(res.data);
            })
            .catch(err => {
                alert(err)
            })
            .finally(() => set_fetching_select(false))
        // console.log(requset_category);
    }, [fetching_select]);
    

    return (
        <div className="category_container">
            <label htmlFor="category">choose a category:</label>
            <select
                name="category" id=""
                defaultValue={"All"}
                onChange={(e) => {
                    props.set_nesting((state) => ++state)
                    set_select_value(e.target.value)
                }}
            >
                <option value={"All"}>All</option>
                {
                    requset_category.map((elem, i) => <option value={elem.value} key={i}>{elem.value}</option>)
                }
            </select>
        </div>
    )
};

export default Select_category;