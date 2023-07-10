import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imagePush from "../../action/addImage";
import { downloudCategoryPost } from "../../redux/categorySend/categorySendSlice";
import { downloudCategoryGet } from "../../redux/categorySend/categorySendSlice";
import Footer from "../footer/Footer";
import SelectCategory from "../Home/SelectCategory/SelectCategory";
import StickyInputLabel from "../sign_in/signInForm/StickyInputLabel/StickyInputLabel";
import "./css/add_picture.scss"
import ImageStatus from "./ImageStatus/ImageStatus";
import { selectValueCategory } from "../../redux/valueCategory/valueCategorySlice";

const AddPicture = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [imageData, setImageData] = useState(null);
    const requsetCategoryRedux = useSelector(state => state.categorySearch.category);
    const fetchingCategory = true;
    const [selectValue, setSelectValue] = useState("All")
    const [nesting, setNesting] = useState(0);
    const dispatch = useDispatch();
    const [createCategory, setCreateCategory] = useState("");
    const [publicImage, setPublicImage] = useState(true);
    const [requsetSuccessful, setRequsetSuccessful] = useState(false);
    const [reqMessige, setReqMessige] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const categoryValue = useSelector(selectValueCategory).value;
 
    const navigate = useNavigate();

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
            dispatch(downloudCategoryPost(requsetCategoryRedux, selectValue,categoryValue));
        }
    }, [nesting, fetchingCategory]);
    const onImageChange = useCallback(event => {
        if (event.target.files && event.target.files[0]) {
            setImageData(event.target.files[0]);
            setImageUrl(URL.createObjectURL(event.target.files[0]));
        }
    }, []);
    const img_styles = imageUrl => {
        if (!imageUrl) {
            return { display: "none" }
        }
        return {}

    };

    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    return (
        <div className="add_price">
            <input
                className="file-input"
                id="inputGroupFile01"
                type="file"
                accept="image/*"
                onChange={onImageChange}
            />
            {
                useMemo(() => {
                    return requsetCategoryRedux?.map((elem, index) => {
                        return <SelectCategory props={{ elem, setSelectValue, setNesting,index }} key={index} />
                    })
                }, [requsetCategoryRedux])
            }
            <div className="pt-5">
                <div className="check_private form-check" >
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        onChange={useCallback(() => setPublicImage((stete) => !stete), [])}
                    />
                    <span className="form-check-label" >
                        Want to make the photo private?
                    </span>
                </div>
            </div>
            <StickyInputLabel
                props={
                    useMemo(() => {
                        return (
                            {
                                text: "Create a new category ",
                                name: "category",
                                type: "text",
                                inputValue: createCategory,
                                setInputValue: setCreateCategory,
                                class: "mb-5"
                            }
                        )
                    }, [createCategory])
                }
            />
            <img

                alt="preview image" src={imageUrl}
                style={img_styles(imageUrl)}
                accept="image/*"
            />
            {
                requsetSuccessful ? <ImageStatus props={{ requsetSuccessful, reqMessige, closeModal }} />: ""
            }
            <button
                className="mb-5"
                style={img_styles(imageUrl)}
                onClick={() => {
                    imagePush(
                        imageData, selectValue, createCategory, publicImage
                    ).then((req) => {
                        setRequsetSuccessful(true);
                        setReqMessige(req.data)
                        openModal()
                        setTimeout(() => {
                            navigate("/home"); 
                        }, 3000);
                    }).catch((e) => {
                        setReqMessige(e)
                    })
                }}>
                Add
            </button>
            <Footer></Footer>
        </div>
    )
}
export default AddPicture;