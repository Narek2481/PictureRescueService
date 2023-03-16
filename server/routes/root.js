
export default function root_route(app) {
    app.get("/", (req, res) => {
        console.log(req.body);
        res.send("ok");
    });
}