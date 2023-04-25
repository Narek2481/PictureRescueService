import { useEffect, useState } from "react";
import Avatar from "react-avatar-edit"

const UploadAvatar = () => {
    const [src,setSrc] = useState(null);
    const [preview,setPreview] = useState(null);

    const onClose = ()=>{
        setPreview(null);
    }
    const onCrop = view =>{
        setPreview(view)
    }
    return (
        <div className="text-center" style={{overflowY:"scroll"}}>
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