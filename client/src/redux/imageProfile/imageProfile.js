import downlodeImageProfile from "../../action/imageProfileApi";
import img from "../../img_logo/istockphoto-1130884625-612x612.jpg"

export function ProfileImageReducer(state = {}, action) {
    if (action.type === "downlode_image_profile") {
        return  action.pyload;
    } else {
        return state;
    }

}


export const initialProfileImage = img;

export function editProfileImage(pyload) {
    return {
        type: "downlode_image_profile",
        pyload: pyload
    }
}

export function downloudProfileImage() {
    return (dispatch) => {
        return (
            downlodeImageProfile()
                .then((url) => {
                    console.log(url);
                    if (url !== undefined) {
                        dispatch(editProfileImage(url));
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        );
    }
}