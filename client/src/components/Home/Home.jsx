import { useEffect, useState } from "react";
import axios from "axios";
import Image_component from "./image_forme/image_component";
import { Link } from "react-router-dom"
// import Image_submit from "./image_submit/image_submit";



export default function Home() {
    const [fetching, setFetching] = useState(true);
    const [data, setData] = useState([]);
    console.log(data)
    useEffect(() => {
        if (fetching) {
            console.log("fetchhing")
            axios.get("http://localhost:4000/image_loud")
                .then((res) => {
                    setData((data) => [...data, ...res.data]);
                })
                .catch(err => {
                    alert(err)
                })
                .finally(() => setFetching(false))
        }

        // setLoading(false);
    }, [fetching]);
    useEffect(() => {
        document.addEventListener("scroll", scroll_hendler);
        return function () {
            document.removeEventListener("scroll", scroll_hendler)
        }
    }, []);
    const scroll_hendler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            console.log("scroll")
            setFetching(true);
        }
    }
    return (
        <div className="home">
            <div className="add_container">
                <Link className="go_add_image" to={"/add_image"}>
                    Add Image
                </Link>

            </div>
            <div style={
                {
                    textAlign: "center",
                    padding: "20px 0 0 0"
                }
            }>
                {fetching ? "Loading..." : ""}
            </div>
            {
                data.map((elem) => {
                    return (
                        <Image_component props={elem} key={Math.random() * 100}></Image_component>
                    )
                })
            }

        </div>
    );

}