
const image_push = (app) => {
    app.post("/image_push", (req, res) => {
        let data = req.data;
        // console.log(req.body.image);
        res.send("ok");
    });
}
export default image_push;