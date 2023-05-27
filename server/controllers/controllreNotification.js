import jwt from "jsonwebtoken"
import { Announcement, Image } from "../data_base/tables.js";
const controllreNotification = async (req) => {
    try {
        const id = await jwt.verify(req.cookies.token, process.env.SECRET).clientId;
        const notification = await Announcement.findAll({
            where: {
                user_ref: id
            }
        });
        let notificationImagesId = [];
        if (notification) {
            notificationImagesId = notification.map((elem) => {
                return elem.image_ref;
            });
        }
        const notificationImages = await Image.findAll({
            where: {
                id: {
                    [Op.in]: notificationImagesId
                }
            }
        })
        const sendData = notificationImages.map((elem)=>{
            return {
                image_url : elem.ref_or_path,
                imageWidthHeght :elem.width_heght,
                id:elem.id
            }
        })
    } catch (e) {
        return e;
    }
}

export default controllreNotification;