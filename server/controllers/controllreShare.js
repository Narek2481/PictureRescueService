import { User, Announcement } from "../data_base/tables.js"



const controllreShare = async req => {
    try {
        console.log(req.user.id,"userreq.userreq.user")
        console.log(req.user,"userreq.userreq.user")
        const sendToUser = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        console.log(req.user,"userreq.userreq.user")
        await Announcement.create({
            user_ref: sendToUser.id,
            author_id: req.user.clientId,
            image_ref: req.body.imageId
        })
        return "ok";

    } catch (e) {
        return e;
    }
}

export default controllreShare;