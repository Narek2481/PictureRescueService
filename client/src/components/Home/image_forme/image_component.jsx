import { memo } from "react";



export default memo(function Image_component({ props }) {
    const img = require("/home/narek/Desktop/app_/server/img/"+ props.image_url);
    return (
        <div className="col-12 col-md-4 col-sm-6 iamage_container" >
            <h4>img  width height</h4>
            <img className="img-fluid" src={img} alt="" />
        </div>
    )
})