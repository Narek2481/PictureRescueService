// import img from "/home/narek/Desktop/app_/client/src/public_image/1559455754_1.jpg"
// import x from "../../../public_image"
export default function Image_component({ props }) {
    const img = require('../../../public_image/'+props.image_url);
    // console.log(img)
    if (props) {
        return (
            <div className="iamage_container" >
                <h4>img  width height</h4>
                <img src={img} alt="" />
            </div>
        )
    } else {
        return <>
            eror
        </>
    }

}