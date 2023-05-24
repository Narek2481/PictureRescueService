import axios from "axios";

const checkeAuth = async (dispatch, editCurrentUser) => {
    try {
        const respons = await axios.get("/refresh", { withCredentials: true })
        localStorage.setItem("token", respons.data.accessToken)
        dispatch(editCurrentUser({ register_or_login: true }));
        return "ok"
    } catch (e) {
        return "eror"
    }
}

export default checkeAuth;