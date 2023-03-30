import { useEffect, useState, memo, useCallback } from "react";
import Image_component from "../components/Home/image_forme/image_component"
import { Link } from "react-router-dom"
import Select_category from "../components/Home/select_category/select_category";
import { useDispatch, useSelector } from "react-redux";
import { downloud_data, edit_fatching } from "../reducers/data/data_slice";
import { downloud_category_get, downloud_category_post } from "../reducers/category/category_slice";
import { ModalContent } from "../components/Home/modal/Modal";
import { edit_modal } from "../reducers/modal/modal_slice";


function Home() {
    const fatch_redux = useSelector((state) => state.downlode_data.fatching);
    const past_data = useSelector((state) => state.downlode_data.data);
    const requset_category_redux = useSelector(state => state.category_search.category);
    const fetching_category = true;
    const [select_value, set_select_value] = useState("All")
    const [nesting, set_nesting] = useState(0);
    const dispatch = useDispatch();
    const modal_data  = useSelector((state) => state.modal);
    let  style_scroll = {}
    if(modal_data.modal_data.modal){
        style_scroll = {overflow: "visible"}
    }
    // const {is_open,img} = modal_data
    // const is_open = useSelector((state) => state.modal_data.modal)
    // requset image download
    useEffect(() => {
        if (fatch_redux) {
            dispatch(downloud_data(past_data));
            dispatch(edit_fatching({ fatching: false }))
        }
    }, [fatch_redux]);
    // requset image download
    useEffect(() => {
        document.addEventListener("scroll", scroll_hendler);
        return () => {
            document.removeEventListener("scroll", scroll_hendler)
        }
    }, []);
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
    const scroll_hendler = useCallback((e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            console.log("scroll");
            dispatch(edit_fatching({ fatching: true }));
        }
    }, [fatch_redux]);
    return (
        <div className="home" style={style_scroll}>
            {modal_data.modal_data.modal && (
                <ModalContent>
                    <img className="img-fluid" src={modal_data.modal_data.modal_img} alt="" />
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
            <div className=" text-center" style={{ height: "150px" }}>
                {
                    // backend request for images upload
                    fatch_redux ? "Loading..." : ""
                }
            </div>
        </div>
    );

}
export default memo(Home);