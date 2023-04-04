import React, { useEffect, useState, memo, useCallback, useRef } from "react";
import Image_component from "./image_forme/image_component"
import { Link } from "react-router-dom"
import Select_category from "./select_category/select_category";
import { useDispatch, useSelector } from "react-redux";
import { downloud_data, edit_fatching } from "../../reducers/data/data_slice";
import { downloud_category_get, downloud_category_post } from "../../reducers/category/category_slice";
import { ModalContent } from "./modal/Modal";
import "./css/home.css"

function Home() {
    const fatch_redux = useSelector((state) => state.downlode_data.fatching);
    const past_data = useSelector((state) => state.downlode_data.data);
    const requset_category_redux = useSelector(state => state.category_search.category);
    const fetching_category = true;
    const [select_value, set_select_value] = useState("All")
    const [nesting, set_nesting] = useState(0);
    const dispatch = useDispatch();
    const modal_data = useSelector((state) => state.modal);
    const loaderRef = useRef(null);

    if (modal_data.modal_data.modal) {
        document.body.style.overflowY = "hidden"
    } else {
        document.body.style.overflowY = "scroll"
    }

    useEffect(() => {
        if (fatch_redux) {
            setTimeout(()=>{
                dispatch(downloud_data(past_data, edit_fatching({ fatching: false })));
            },2000)
        }
    }, [fatch_redux]);
    // requset category
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
    // function scroll event 
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        // Remove the observer when the component unmounts
        return () => {
            if (loaderRef.current) {
                dispatch(edit_fatching({ fatching: true }));
            }
        };
    }, []);

    function handleObserver(entries) {
        const target = entries[0];
        if (target.isIntersecting) {
            dispatch(edit_fatching({ fatching: true }));
        }
    }

    return (
        <div className="home">
            {modal_data.modal_data.modal && (
                <ModalContent>
                    <div className="modal_center">
                        <img className="img-fluid" src={modal_data.modal_data.modal_img} alt="" />
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
                requset_category_redux?.map((elem, index) => {
                    return <Select_category props={{ elem, set_select_value, set_nesting }} key={index} />
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
                    // an array from the backend that is being rendered for component Image_component
                    past_data.map((elem) => {
                        return (
                            <Image_component props={elem} key={Math.random() * 100} />
                        )
                    })
                }
            </div>
            <div className={"text-center "} style={{ height: "200px" }} ref={loaderRef}>
               <div className={fatch_redux ? "loader" : ""}></div>
            </div>
        </div>
    );

}
export default Home;