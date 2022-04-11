const mysql = require('mysql');

const connectDb = mysql.createConnection({
    host: 'blmdeqg3nwr2lglcguh6-mysql.services.clever-cloud.com',
    user: 'utmfvpxedzfl1tn7',
    password: 'mufputiDkzUbfhr5I4OA',
    database: 'blmdeqg3nwr2lglcguh6'
  });
  
  connectDb.connect(error => {
    if (error) throw error; 
    console.log('Connected into BD Swimmers')
  })

  module.exports = { connectDb }; 