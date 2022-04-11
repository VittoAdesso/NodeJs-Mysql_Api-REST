const mysql = require('mysql');

// i have to make .env more professional and secure 
const connectDb = mysql.createConnection({
    host: 'blmdeqg3nwr2lglcguh6-mysql.services.clever-cloud.com',
    user: 'utmfvpxedzfl1tn7',
    password: 'mufputiDkzUbfhr5I4OA',
    database: 'blmdeqg3nwr2lglcguh6'
});

// connect the DB //
connectDb.connect(error => {
    if (error) throw error; 
    console.log('Connected into BD Swimmers')
  })

  // i have to export, because i need to use it in other places of the project //
module.exports = { connectDb }; 