import { useEffect, useState } from "react"
import img from "../../../img_logo/istockphoto-1130884625-612x612.jpg"
import { useCookies } from "react-cookie";



const ImageProfile = ({props}) => {
    const [cookie] = useCookies();
     const [name,setName]=useState("")
    
    useEffect(() => {
        try{
            if(cookie.login.name){
                setName(cookie.login.name)
            } 
        }catch(e){

        }
       
    },[cookie]);
    
    return(
        <li style={props.style} className="profileImage">
            <> {name}</>
            <img  src={img} alt="" />
        </li>
        
    )
}
export default ImageProfile;