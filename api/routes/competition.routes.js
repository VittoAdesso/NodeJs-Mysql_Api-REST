const express = require("express")
const { connectDb } = require("../database/config");
const router = express.Router(); 


//GET ALL competitions // 
router.route("/competition").get((req, res, next) => {
// all the querys i have to almacenar into const
    const sqlQuery = "SELECT * FROM competitions"
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

//GET SINGLE competition BY ID with params !!!  // 

router.route("/competition/:id").get((req, res, next) => {
    const competitionId = req.params.id
    const sqlQuery = `SELECT * FROM competitions WHERE id=${competitionId}`
        connectDb.query(sqlQuery, (error, response) => {
            if (error) {
                return next(error)
            }
            else {
                res.status(200).json(response)
            }
        })
})

router.post("/competition/create", (req, res, next) => {
    const inputData = {
        competitionId: req.body.competitionId,
        nameCompetition: req.body.nameCompetition,
        isCelebrate: req.body.isCelebrate, 
        // createdAt: req.body.createdAt, 
        // updatedAt: req.body.updatedAt
    }
    connectDb.query("INSERT INTO competitions SET ?", [inputData], (error, result) => {
        if (error) {
            res.status(500).send({msg: "We can't register"})
            return next(error)
        } else {
            res.status(200).send({msg: "Registry is complete"})
        }
    })
})

// i have to export, because i need to use it in other places of the project //
module.exports = router; 