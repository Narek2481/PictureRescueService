import { useEffect, useState , memo, useCallback} from "react";
import axios from "axios";
import Image_component from "./image_forme/image_component";
import { Link } from "react-router-dom"
import Select_category from "./select_category/select_category";

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
            axios.get("http://localhost:4000/image_loud")
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
            axios.post("http://localhost:4000/image_category")
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
            axios.post("http://localhost:4000/image_category",{category:select_value,nesting})
                .then((res) => {
                    set_requset_category((state) => [...state,...res.data]);
                })
                .catch(err => {
                    alert(err)
                })
        }
    }, [nesting, fetching_category]);
    // function scroll event 
    const scroll_hendler = useCallback((e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            // console.log("scroll")
            setFetching(true);
        }
    })
    console.log(requset_category);
    return (
        <div className="home">
            <div className="add_container">
                {/* route for adding pictures */}
                <Link className="go_add_image" to={"/add_image"}>
                    Add Image
                </Link>
            </div>
            {/* category for pictures */}
            {requset_category.map((elem,index) => {
                return <Select_category props={{elem,set_select_value,set_nesting}} key={index}></Select_category>
            })}
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
                        <Image_component props={elem} key={Math.random() * 100}></Image_component>
                    )
                })
            }

        </div>
    );

}
export default memo(Home);