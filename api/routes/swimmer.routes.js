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

//GET SINGLE swimmer BY ID with params !!!  // 

router.route("/swimmer/:id").get((req, res, next) => {
    const userId = req.params.id
    const sqlQuery = `SELECT * FROM swimmers WHERE id=${userId}`
        connectDb.query(sqlQuery, (error, response) => {
            if (error) {
                return next(error)
            }
            else {
                res.status(200).json(response)
            }
        })
})

//GET SINGLE swimmer BY ID -- mannually  // 
// router.route("/swimmer/1").get((req, res, next) => {
//     const swimmerId = 'vitAd'; 
//     // all the querys i have to almacenar into const
//     const sqlQuery = 'SELECT * FROM swimmers WHERE swimmerId = ?'
//         //REMEMBER TO CALL THE CONNECTION
//         connectDb.query(sqlQuery, [swimmerId], (err, response) => {
//             if (err) {
//                 return next(err)
//             }
//             else {
//                 res.status(200).json(response)
//             }
//         })
//})

router.post("/swimmer/create", (req, res, next) => {
    const inputData = {
        swimmerId: req.body.swimmerId,
        name: req.body.name,
        sex: req.body.sex, 
        createdAt: req.body.createdAt, 
        updatedAt: req.body.updatedAt
    }
    connectDb.query("INSERT INTO swimmers SET ?", [inputData], (error, result) => {
        if (error) {
            res.status(500).send({msg: "We can't register"})
            return next(error)
        } else {
            res.status(200).send({msg: "Registry is complete"})
        }
    })
})

// to get all users and points
router.route("/swimmer/points").get((req, res, next) => {
    connectDb.query("SELECT * FROM swimmers ORDER BY points ASC", (error, response) => {
        if (error) {
            return next(error)
        }
        else {
            res.status(200).json(response)
        }
    })
})

// i have to export, because i need to use it in other places of the project //
module.exports = router; 