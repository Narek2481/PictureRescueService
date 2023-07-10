import { findeImageForDelete } from "../services/imageService.js"


const deletePrivetImageController = async (req,res,next) =>{
    try{
        const data = await findeImageForDelete(req.query.ImageId);
        if(data === "ok"){
            res.send("OK")
        }else{
            res.status(500)
        }
        res.end
    }catch(e){
        next(e)
    }
}

export default deletePrivetImageController