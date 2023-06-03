import axios from "axios";

const checkeAuth = async (dispatch, editCurrentUser) => {
    try {
        const respons = await axios.get("/user/refresh", { withCredentials: true })
        localStorage.setItem("token", respons.data.token.accessToken)
        dispatch(editCurrentUser({ register_or_login: true ,name:respons.data.name}));
        return "ok"
    } catch (e) {
        return "eror"
    }
}

export default checkeAuth;