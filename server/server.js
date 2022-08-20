const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();

//app
const app = express()

//database
mongoose.connect(process.env.DATABASE || 'url', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => console.log('DB CONNECTED'))
    .catch(err => console.log('DB CONNECTION ERR', err));

// if (process.env.NODE_ENV == "production") {
//     app.use(express.static("client/build"));
//     const path = require("path");
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     })
// }

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes midleware
readdirSync('./routes').map((r) => app.use("/api", require('./routes/' + r)));

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server is Running")
});
