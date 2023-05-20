import { useEffect, useState } from "react";
import Avatar from "react-avatar-edit"
import addAvatar from "../../../action/addAvatar";

const UploadAvatar = () => {
    const [src,setSrc] = useState(null);
    const [preview,setPreview] = useState(null);
    const [valid,setValid] = useState("")
    const submitAvatar = e => {
        if(preview){
            setValid("Please add your avatar")
        }else{
            addAvatar(preview)
        }
    }
    const onClose = ()=>{
        setPreview(null);
    }
    const onCrop = view =>{
        setPreview(view)
    }
    return (
        <div className="text-center">
            <h3>{valid ? valid : ""}</h3>
            <Avatar
                width={300}
                height={220}
                onCrop={onCrop}
                onClose={onClose}
                src={src}
            />
            {preview && <img src={preview} alt="" />}
            <br />
            <button className="go_add_image">Add Avatar Image</button>
        </div>
    )
}

export default UploadAvatar;