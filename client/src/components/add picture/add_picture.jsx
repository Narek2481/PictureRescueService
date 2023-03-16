import { useState } from "react";
import image_push from "../../action/add_image";
const Add_picture = () => {
    const [image, setImage] = useState(null)

    const on_image_change = event => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };
    const img_styles = (image) => {
        if (!image) {
            return { display: "none" }
        }
        return {}

    };
    return (
        <div className="add_price">
            <button
                style={img_styles(image)}
                onClick={() => {
                    image_push({ image ,setImage });
                }}>
                Add
            </button>
            <input type="file" onChange={on_image_change} />
            <img
                alt="preview image" src={image}
                style={img_styles(image)}
                accept="image/*"
            />

        </div>
    )
}
export default Add_picture;