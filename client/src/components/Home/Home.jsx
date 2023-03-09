import { useEffect, useState } from "react";
import home from "../../action/home";
import Image_component from "./image_forme/image_component";


export default function Home({ category }) {
    const [fetching, setFetching] = useState(true);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        // setLoading(true);
        if (fetching) {
            home(category)
            .then((res) => {
                setData(res.data);
            });
        }

        // setLoading(false);
    }, [fetching])
    useEffect(() => {
        document.addEventListener("scroll", scroll_hendler)

        return function () {
            document.removeEventListener("scroll", scroll_hendler)
        }
    }, []);

    const scroll_hendler = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop+ window.innerHeight)<100){
            console.log("scroll")
            setFetching(true);
        }
       
    }


    // if (fetching) {
    //     return (
    //         <div className="home">
    //             loading...
    //         </div>
    //     );
    // } else {
    return (
        <div className="home">
            {
                data.map((elem, index) => {
                    return (
                        <Image_component props={elem} key={index + Date.now()}></Image_component>
                    )
                })
            }
        </div>
    );

}