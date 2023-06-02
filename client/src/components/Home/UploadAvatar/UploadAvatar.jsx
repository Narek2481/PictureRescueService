import { useEffect, useState } from "react";
import Avatar from "react-avatar-edit"
import addAvatar from "../../../action/addAvatar";

const UploadAvatar = () => {
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(null);
    const [valid, setValid] = useState("")
    const submitAvatar = e => {
        // console.log(55555555555555555555)
        // if (preview) {
        //     setValid("Please add your avatar")
        // } else {

        // }
        addAvatar(preview)
            .then(res => {
                console.log(res.data)
            })
            .catch(e => console.log(e))
    }
    const onClose = () => {
        setPreview(null);
    }
    const onCrop = view => {
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
            <button className="go_add_image" onClick={submitAvatar}>Add Avatar Image</button>
        </div>
    )
}

export default UploadAvatar;