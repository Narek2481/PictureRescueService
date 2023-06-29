import { logout } from "../services/loginRegisterService.js";

const logoutcontroller =  async (req, res,next) => {
    try {
        res.clearCookie("refreshToken");
        res.send("ok")
    } catch (e) {
        next(e)
    }
}

export default logoutcontroller;