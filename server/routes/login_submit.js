
const login_submit = app => {
    app.post("/login_submit", (req, res) => {
        console.log(req.body);
        res.send("all good");
    });
}
export default login_submit;