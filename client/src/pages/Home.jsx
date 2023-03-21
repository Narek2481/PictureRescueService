import { useEffect, useState, memo, useCallback } from "react";
import Image_component from "../components/Home/image_forme/image_component"
import { Link } from "react-router-dom"
import Select_category from "../components/Home/select_category/select_category";
import image_loud from "../action/image_loud";
import { image_category_get, image_category_post } from "../action/image_category";
import { useDispatch, useSelector } from "react-redux";


function Home() {
    useSelector((state)=>{
        return state.downlode_data.data
    })
    const [fetching, setFetching] = useState(true);
    const [fetching_category, set_fetching_category] = useState(true);
    const [select_value, set_select_value] = useState("All")
    const [requset_category, set_requset_category] = useState([]);
    const [data, setData] = useState([]);
    const [nesting, set_nesting] = useState(0);
    const dispatch = useDispatch()
    // requset image download
    useEffect(() => {
        if (fetching) {
            image_loud({ setData, fetching, setFetching }); 
            
        }
    }, [fetching]);
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
        if (fetching_category) {
            image_category_get({ set_requset_category, set_fetching_category })

        }
        // requset category in  category
        if (nesting > 0) {
            image_category_post({ data: { category: select_value, nesting }, set_requset_category })
        }
    }, [nesting, fetching_category]);
    // function scroll event 
    const scroll_hendler = useCallback((e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            console.log("scroll")
            setFetching((state) => !state);
        }
    })


    return (
        <div className="home">
            <div className="add_container">
                {/* route for adding pictures */}
                <Link className="go_add_image" to={"/add_image"}>
                    Add Image
                </Link>
            </div>
            {/* category for pictures */}
            {
                requset_category.map((elem, index) => {
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
                    data.map((elem) => {
                        return (
                            <Image_component props={elem} key={Math.random() * 100} />
                        )
                    })
                }
            </div>
            <div className=" text-center"   style={{height:"150px"}}>
                {
                    // backend request for images upload
                    fetching ? "Loading..." : ""
                }
            </div>
        </div>
    );

}
export default memo(Home);