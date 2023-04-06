import React, { useEffect, useState, useRef } from "react";
import ImageComponent from "./images/ImageComponent"
import { Link } from "react-router-dom"
import SelectCategory from "./SelectCategory/SelectCategory";
import { useDispatch, useSelector } from "react-redux";
import { downloudData, editFatching } from "../../reducers/data/dataSlice";
import { downloudCategoryGet, downloudCategoryPost } from "../../reducers/category/categorySlice";
import { ModalContent } from "./modal/Modal";
import "./css/home.scss"
import { useCookies } from "react-cookie";



function Home() {
    const fatchDataRedux = useSelector((state) => state.downlodeData.fatching);
    const nowData = useSelector((state) => state.downlodeData.data);
    const requsetCategoryRedux = useSelector(state => state.categorySearch.category);
    const fetchingCategory = true;
    const [selectValue, setSelectValue] = useState("All")
    const [nesting, setNesting] = useState(0);
    const dispatch = useDispatch();
    const modalData = useSelector((state) => state.modal);
    const loaderRef = useRef(null);
    const [cookie, setCookie, removeCookie] = useCookies(["auth"]);
    console.log(cookie);
    

    useEffect(() => {
        if (fatchDataRedux) {
            dispatch(downloudData(nowData, editFatching({ fatching: false })));
        }
        // removeCookie(["auth"])
    }, [fatchDataRedux]);
    // requset category
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
    // function scroll event 
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };
        const observer = new IntersectionObserver(handle_observer, options);
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        // Remove the observer when the component unmounts
        return () => {
            if (loaderRef.current) {
                dispatch(editFatching({ fatching: true }));
            }
        };
    }, []);

    function handle_observer(entries) {
        const target = entries[0];
        if (target.isIntersecting) {
            dispatch(editFatching({ fatching: true }));
        }
    }

    return (
        <div className="home">
            {modalData.modalData.modal && (
                <ModalContent>
                    <div className="modal_center">
                        <img className="img-fluid" src={modalData.modalData.modalImg} alt="" />
                    </div>
                </ModalContent>
            )}
            <div className="add_container">
                {/* route for adding pictures */}
                <Link className="go_add_image" to={"/add_image"}>
                    Add Image
                </Link>
            </div>
            {/* category for pictures */}
            {
                requsetCategoryRedux?.map((elem, index) => {
                    return <SelectCategory props={{ elem, setSelectValue, setNesting }} key={index} />
                })
            }
            <div style={
                {
                    textAlign: "center",
                    padding: "20px 0 0 0"
                }
            }>

            </div>
            <div className="row">
                {
                    // an array from the backend that is being rendered for component ImageComponent
                    nowData.map((elem) => {
                        return (
                            <ImageComponent props={elem} key={Math.random() * 100} />
                        );
                    })
                }
            </div>
            <div className={"text-center "} style={{ height: "200px" }} ref={loaderRef}>
                <div className={fatchDataRedux ? "loader" : ""}></div>
            </div>
        </div>
    );

}
export default Home;