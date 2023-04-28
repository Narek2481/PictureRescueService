import img from "../../../img_logo/istockphoto-1130884625-612x612.jpg"
import { useSelector } from "react-redux";



const ImageProfile = ({props}) => {
    const name = useSelector((state) => state.currentUser.name)
    
    return(
        <li style={props.style} className="profileImage">
            <> {name}</>
            <img  src={img} alt="" />
        </li>
        
    )
}
export default ImageProfile;