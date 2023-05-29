import jwt from "jsonwebtoken"
import { Announcement, Image } from "../data_base/tables.js";
import { Sequelize } from "sequelize";
const controllreNotification = async (req) => {
    try {
        console.log("11111111111111111111111111111111111111111111")
        const userId = req.user.clientId
        
        const notification = await Announcement.findAll({
            where: {
                user_ref: userId
            }
        });
        console.log("1111111111111111111111111111111111111111111122")

        let notificationImagesId = [];
        if (notification) {
            notificationImagesId = notification.map((elem) => {
                return elem.image_ref;
            });
        }
        console.log("11111111111111111111111111111111111111111111333")
        
        const notificationImages = await Image.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: notificationImagesId
                }
            }
        })
       
        console.log("11111111111111111111111111111111111111111111444")

        console.log(notificationImages,"notificationImages")
        const sendData = notificationImages.map((elem)=>{
            return {
                image_url : elem.ref_or_path,
                imageWidthHeght :elem.width_heght,
                id:elem.id
            }
        })
        console.log("1111111111111111111111111111111111111111111144")

        return sendData
    } catch (e) {
        return e;
    }
}


const controllreNotificationData = async (req, res, next ) => {
    const data = await controllreNotification(req);
    if(data){
        res.status(200).json(data)
    }else{
        res.status(500).json(data);
    }
}

export default controllreNotificationData;