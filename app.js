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

// config port , is better this way
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server is listenning at port ${PORT}`);
});