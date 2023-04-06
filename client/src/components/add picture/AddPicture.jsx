import {  useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import imagePush from "../../action/addImage";
import { downloudCategoryPost } from "../../reducers/categorySend/categorySendSlice";
import { downloudCategoryGet } from "../../reducers/categorySend/categorySendSlice";
import Footer from "../footer/Footer";
import SelectCategory from "../Home/SelectCategory/SelectCategory";
import StickyInputLabel from "../sign_in/signInForm/StickyInputLabel/StickyInputLabel";
import "./css/add_picture.scss"

const AddPicture = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [imageData, setImageData] = useState(null);
    const requsetCategoryRedux = useSelector(state => state.categorySearch.category);
    const fetchingCategory = true;
    const [selectValue, setSelectValue] = useState("All")
    const [nesting, setNesting] = useState(0);
    const dispatch = useDispatch();
    const [createCategory, setCreateCategory] = useState("")
    const parent = () => {
        if (selectValue === "All") {
            return ""
        }
        return "with a parent "+selectValue;
    }
    const parentValue = parent()
    useEffect(() => {
        if (!imageData) {
            setImageUrl(null)
        }
    }, [imageData]);
    useEffect(() => {
        // requset category first 
        if (fetchingCategory && nesting <= 0) {
            dispatch(downloudCategoryGet());
        }
        // requset category in  category
        if (nesting > 0) {
            dispatch(downloudCategoryPost(requsetCategoryRedux, selectValue));
        }
    }, [nesting, fetchingCategory]);
    const on_image_change = event => {
        if (event.target.files && event.target.files[0]) {
            setImageData(event.target.files[0]);
            setImageUrl(URL.createObjectURL(event.target.files[0]));
        }

    };
    const create_category_change = useCallback(e => {
        setCreateCategory(e.target.value);
    });
    const img_styles = (imageUrl) => {
        if (!imageUrl) {
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
                requsetCategoryRedux?.map((elem, index) => {
                    return <SelectCategory props={{ elem, setSelectValue, setNesting }} key={index} />
                })
            }
            <StickyInputLabel 
                props={
                    useMemo(() => {
                      return (
                        {
                          text: "a new category "+parentValue,
                          name: "category",
                          type: "text",
                          inputValue: createCategory,
                          setInputValue:setCreateCategory ,
                          class :"mb-5"
                        }
                      )
                    },[createCategory,selectValue])
                }
            />
            <img
                
                alt="preview image" src={imageUrl}
                style={img_styles(imageUrl)}
                accept="image/*"
            />
            <button
                className="mb-5"
                style={img_styles(imageUrl)}
                onClick={() => {
                    if (createCategory !== "") {
                        return imagePush({ imageData, setImageData, selectValue, createCategory })
                    }
                    return imagePush({ imageData, setImageData, selectValue });
                }}>
                Add
            </button>
            <Footer></Footer>
        </div>
    )
}
export default AddPicture;