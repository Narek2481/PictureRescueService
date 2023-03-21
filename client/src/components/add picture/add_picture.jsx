import { useEffect, useState } from "react";
import image_push from "../../action/add_image";
const Add_picture = () => {
    const [image_url, set_image_url] = useState(null);
    const [image_data, set_image_data] = useState(null);
    useEffect(() => {
        if (!image_data) {
            set_image_url(null)
        }
    }, [image_data]);
    const on_image_change = event => {
        if (event.target.files && event.target.files[0]) {
            set_image_data(event.target.files[0]);
            set_image_url(URL.createObjectURL(event.target.files[0]));
            console.log(image_data)
        }

    };
    const img_styles = (image_url) => {
        if (!image_url) {
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
                multiple
            />
            <img
                alt="preview image" src={image_url}
                style={img_styles(image_url)}
                accept="image/*"
            />
            <button
                style={img_styles(image_url)}
                onClick={() => {
                    image_push({ image_data, set_image_data });
                }}>
                Add
            </button>
        </div>
    )
}
export default Add_picture;