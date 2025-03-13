const express = require("express");
const cors = require("cors");
const multer = require("multer");
const linkRoutes = require('./links');
const bodyParser = require('body-parser');


const PORT = 3001;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const upload = multer();

let home = {
    image: "https://uploads.relink.is/usercontent/Screenshot_20241108-115229_ez0y5NvZ.png",
    fullName: "Nicat Manafov",
    description: "15+ years experience e-commerce ⚡"
};

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/home", (req, res) => {
    res.json(home);
});

app.put("/home", upload.none(), (req, res) => {
    const newHome = {
        image: req.body.image,
        fullName: req.body.fullName,
        description: req.body.description
    };
    console.log(newHome);
    home = newHome;
    res.json(newHome);
});

app.use('/links', linkRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;