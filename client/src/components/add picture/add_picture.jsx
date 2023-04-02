import {  useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import image_push from "../../action/add_image";
import { downloud_category_post } from "../../reducers/category/category_slice";
import { downloud_category_get } from "../../reducers/category_send/category_send_slice";
import Footer from "../footer/Footer";
import Select_category from "../Home/select_category/select_category";
import StickyInputLabel from "../sign_in/sign_in_form/StickyInputLabel/StickyInputLabel";
import "./css/add_picture.css"

const Add_picture = () => {
    const [image_url, set_image_url] = useState(null);
    const [image_data, set_image_data] = useState(null);
    const requset_category_redux = useSelector(state => state.category_search.category);
    const fetching_category = true;
    const [select_value, set_select_value] = useState("All")
    const [nesting, set_nesting] = useState(0);
    const dispatch = useDispatch();
    const [create_category, set_create_category] = useState("")
    const parent = () => {
        if (select_value === "All") {
            return ""
        }
        return select_value;
    }
    useEffect(() => {
        if (!image_data) {
            set_image_url(null)
        }
    }, [image_data]);
    useEffect(() => {
        // requset category first 
        if (fetching_category && nesting <= 0) {
            dispatch(downloud_category_get());
        }
        // requset category in  category
        if (nesting > 0) {
            dispatch(downloud_category_post(requset_category_redux, select_value));
        }
    }, [nesting, fetching_category]);
    const on_image_change = event => {
        if (event.target.files && event.target.files[0]) {
            set_image_data(event.target.files[0]);
            set_image_url(URL.createObjectURL(event.target.files[0]));
        }

    };
    const create_category_change = useCallback(e => {
        set_create_category(e.target.value);
    });
    const img_styles = (image_url) => {
        if (!image_url) {
            return { display: "none" }
        }
        return {}

    };
    return (
        <div className="add_price">
            <input
                className="file-input"
                id="inputGroupFile01"
                type="file"
                accept="image/*"
                onChange={on_image_change}
            />
            {
                requset_category_redux?.map((elem, index) => {
                    return <Select_category props={{ elem, set_select_value, set_nesting }} key={index} />
                })
            }
            <StickyInputLabel 
                props={
                    useMemo(() => {
                      return (
                        {
                          text: "New category",
                          name: "category",
                          type: "text",
                          inputValue: create_category,
                          setInputValue:set_create_category ,
                          class :"mb-5"
                        }
                      )
                    },[create_category])
                }
            />
            <img
                
                alt="preview image" src={image_url}
                style={img_styles(image_url)}
                accept="image/*"
            />
            <button
                className="mb-5"
                style={img_styles(image_url)}
                onClick={() => {
                    if (create_category !== "") {
                        return image_push({ image_data, set_image_data, select_value, create_category })
                    }
                    return image_push({ image_data, set_image_data, select_value });
                }}>
                Add
            </button>
            <Footer></Footer>
        </div>
    )
}
export default Add_picture;