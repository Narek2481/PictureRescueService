import { useEffect, useState, memo, useCallback } from "react";
import Image_component from "./image_forme/image_component";
import { Link } from "react-router-dom"
import Select_category from "./select_category/select_category";
import image_loud from "../../action/image_loud";
import { image_category_get, image_category_post } from "../../action/image_category";

function Home() {

    const [fetching, setFetching] = useState(true);
    const [fetching_category, set_fetching_category] = useState(true);
    const [select_value, set_select_value] = useState("All")
    const [requset_category, set_requset_category] = useState([]);
    const [data, setData] = useState([]);
    const [nesting, set_nesting] = useState(0);

    // requset image download
    useEffect(() => {
        if (fetching) {
            image_loud()
                .then((res) => {
                    setData((data) => [...data, ...res.data]);

                })
                .catch(err => {
                    alert(err)
                })
                .finally(() => setFetching(false))
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
            image_category_get()
                .then((res) => {
                    set_requset_category(res.data);
                })
                .catch(err => {
                    alert(err)
                })
                .finally(() => set_fetching_category(false))
        }
        // requset category in  category
        if (nesting > 0) {
            image_category_post({ category: select_value, nesting })
                .then((res) => {
                    set_requset_category((state) => [...state, ...res.data]);
                })
                .catch(err => {
                    alert(err)
                });
        }
    }, [nesting, fetching_category]);

    // function scroll event 
    const scroll_hendler = useCallback((e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            // console.log("scroll")
            setFetching(true);
        }
    })

    console.log(data);
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
                    return <Select_category props={{ elem, set_select_value, set_nesting }} key={index}/>
                })
            }
            <div style={
                {
                    textAlign: "center",
                    padding: "20px 0 0 0"
                }
            }>
                {
                    // backend request for images upload
                    fetching ? "Loading..." : ""
                }
            </div>
            {
                // an array from the backend that is being rendered for component Image_component
                data.map((elem) => {
                    return (
                        <Image_component props={elem} key={Math.random() * 100}/>
                    )
                })
            }

        </div>
    );

}
export default memo(Home);