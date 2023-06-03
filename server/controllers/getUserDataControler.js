import { User } from "../data_base/tables.js";


const getUserDataControler = async (req, res, next) => {
    try {
        const userId = req.user.clientId;
        const userData = await User.findOne({
            where: {
                id: userId
            }
        });
        const resultData = {
            name: userData.name,
            lastName: userData.last_name
        }
        res.status(200).json(resultData)
    } catch (e) {
        return e;
    }
}

export default getUserDataControler;