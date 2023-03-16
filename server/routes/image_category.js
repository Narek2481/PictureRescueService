const select = [
    {
        value: "poxos"
    },
    {
        value: "hopar"
    },
    {
        value: "chgitem"
    },
    {
        value: "anhayt"
    },
    {
        value: "errrr"
    },
];

const image_category = app => {
    app.post("/image_category", (req, res) => {
        console.log(req.body)
        res.send([select]);
    });
}
export default image_category;