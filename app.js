const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Config = require("./config");

const app = express();

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

/**
 * Recommended way to use body-parser with Express
 * Adding body parsers specifically to the routes that need them
 */
// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})

app.listen(8000, () => {
    mongoose.connect(Config.MONGODB_URL, {
        useNewUrlParser: true
    })
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => {
    require("./routes/customers")(app);
    console.log(`Server Live on port ${Config.PORT}`)
})