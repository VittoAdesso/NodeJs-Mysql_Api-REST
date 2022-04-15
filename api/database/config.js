const mysql = require('mysql');
// to use .env i have to require
const dotenv = require("dotenv")

//calll it to config and use
dotenv.config(); 
//.env more professional and secure 
const connectDb = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
});

// connect the DB //
connectDb.connect(error => {
    if (error) throw error; 
    console.log('Connected into BD Swimmers')
  })

  // i have to export, because i need to use it in other places of the project //
module.exports = { connectDb }; 