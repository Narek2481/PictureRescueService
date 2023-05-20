import { User, Announcement } from "../../data_base/tables.js"



const controllreShare = async req => {
    try {
        const sendToUser = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        const author = await jwt.verify( req.cookies.token,process.env.SECRET);
        if(sendToUse && author.exp > 0) {
            const AnnouncementIndb =  Announcement.create({
                user_ref:sendToUser.id,
                author_id:author.id,
                image_ref:req.body.imageId
            })
            return "ok";
        }else{
            return "Such user does not exist"
        }
    } catch (e) {
        return e;
    }
}

export default controllreShare;