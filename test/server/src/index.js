const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const linkRoutes = require('./links');

const PORT = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/links', linkRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});