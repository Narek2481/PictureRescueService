import { User, Announcement } from "../../data_base/tables.js"



const controllreShare = async req => {
    try {
        const sendToUser = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        console.log(req.user)
        const AnnouncementIndb = Announcement.create({
            user_ref: sendToUser.id,
            author_id: req.user,
            image_ref: req.body.imageId
        })
        return "ok";

    } catch (e) {
        return e;
    }
}

export default controllreShare;