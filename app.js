const express = require("express");
const bodyParser = require("body-parser")
const app = express();

// DEFINE AND REQUIRE THE ROUTE !!! 
const swimmer = require("./api/routes/swimmer.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//////general routes//////
// app.use('/', express.static('public'));
app.use('/api', swimmer); 

// MAKE LISTEN API IN PORT
app.listen(5000, () => {
    console.log('Server is running at port 5000');
});