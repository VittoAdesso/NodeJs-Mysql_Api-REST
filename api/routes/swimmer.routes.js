const express = require("express")
const { connectDb } = require("../database/config");
const router = express.Router(); 


//GET ALL swimmers // 
router.route("/swimmer").get((req, res, next) => {
// all the querys i have to almacenar into const
    const sqlQuery = "SELECT * FROM swimmers"
    //REMEMBER TO CALL THE CONNECTION
    connectDb.query(sqlQuery, (err, response) => {
        if (err) {
            return next(err)
        }
        else {
            res.status(200).json(response)
        }
    })
})


  // i have to export, because i need to use it in other places of the project //
module.exports = router; 