import { logout } from "../services/loginRegisterService.js";

const logoutcontroller =  async (req, res,next) => {
    try {
        const { refreshToken } = req.cookies;
        await logout(refreshToken);
        res.clearCookie("refreshToken", { path: "/", expires: new Date(0) });
        res.status(200).end();

    } catch (e) {
        next(e)
    }
}

export default logoutcontroller;