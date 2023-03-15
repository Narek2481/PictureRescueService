import { memo } from "react";



export default memo(function Image_component({ props }) {
    const img = require('../../../public_image/' + props.image_url);
    return (
        <div className="iamage_container" >
            <h4>img  width height</h4>
            <img src={img} alt="" />
        </div>
    )
})