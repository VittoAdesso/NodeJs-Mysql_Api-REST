const express = require("express");
const bodyParser = require("body-parser")
const app = express();

// DEFINE AND REQUIRE THE ROUTE !!! 
const swimmer = require("./api/routes/swimmer.routes");
const competition = require("./api/routes/competition.routes");
const registration = require("./api/routes/registration.routes");

// define headers to response (res) in every petition express going to create cabecere with configuration what we determinate
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//////general routes//////
// app.use('/', express.static('public'));
app.use('/api', swimmer); 
app.use('/api', competition);
app.use('/api', registration);

// MAKE LISTEN API IN PORT
app.listen(5000, () => {
    console.log('Server is running at port 5000');
});