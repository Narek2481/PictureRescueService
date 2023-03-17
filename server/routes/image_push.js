
const image_push = (app) => {
    app.post("/image_push", (req, res) => {
        console.log(req.body);
        // console.log(req.body.image);
        res.send("ok");
    });
}
export default image_push;