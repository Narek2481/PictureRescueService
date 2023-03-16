const registration_submit = app => {
    app.post("/registration_submit", (req, res) => {
        res.send("ok");
        console.log(req.body);
    });
}
export default registration_submit;