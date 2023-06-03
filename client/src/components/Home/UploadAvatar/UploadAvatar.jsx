import {  useState } from "react";
import Avatar from "react-avatar-edit";
import $api from "../../../action/index";

const UploadAvatar = () => {
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(null);
    const [valid, setValid] = useState("");

    const submitAvatar = () => {
        if (!preview) {
            setValid("Please add your avatar");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", dataURLtoFile(preview, "avatar.png"));

        $api
            .post("/avatar", formData)
            .then((res) => {
                console.log(res.data);
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onClose = () => {
        setPreview(null);
    };

    const onCrop = (view) => {
        setPreview(view);
    };

    // Convert data URL to File object
    const dataURLtoFile = (dataURL, fileName) => {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], fileName, { type: mime });
    };

    return (
        <div className="text-center">
            <h3>{valid ? valid : ""}</h3>
            <Avatar width={300} height={220} onCrop={onCrop} onClose={onClose} src={src} />
            {preview && <img src={preview} alt="" />}
            <br />
            <button className="go_add_image" onClick={submitAvatar}>
                Add Avatar Image
            </button>
        </div>
    );
};

export default UploadAvatar;