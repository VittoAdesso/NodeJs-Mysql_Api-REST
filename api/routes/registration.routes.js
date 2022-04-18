const express = require("express")
const { connectDb } = require("../database/config");
const router = express.Router(); 

//GET ALL registrations // 
router.route("/registration").get((req, res, next) => {
// all the querys i have to almacenar into const
    const sqlQuery = "SELECT * FROM registrations"
    //REMEMBER TO CALL THE CONNECTION
    connectDb.query(sqlQuery, (err, response) => {
        if (err) {
            return next(err)
        }
        else {
            res.status(200).json(response)
        }
    })
});

//GET SINGLE registration BY ID with params !!!  // 
router.route("/registration/:id").get((req, res, next) => {
    const registerId = req.params.id
    const sqlQuery = `SELECT * FROM registrations WHERE id=${registerId}`
        connectDb.query(sqlQuery, (error, response) => {
            if (error) {
                return next(error)
            }
            else {
                res.status(200).json(response)
            }
        })
});

// create one registry of competition
router.post("/registration/createOne", (req, res, next) => {
    const inputData = {
        swimmerId: req.body.swimmerId,
        competitionId: req.body.competitionId,
        whatPosition: req.body.whatPosition, 
        // createdAt: req.body.createdAt, 
        // updatedAt: req.body.updatedAt
    }
    connectDb.query("INSERT INTO registrations SET ?", [inputData], (error, result) => {
        if (error) {
            res.status(500).send({msg: "We can't register"})
            return next(error)
        } else {
            res.status(200).send({msg: "Registry is complete"})
        }
    })
});

// create MANY registry of competition
router.post("/registration/createMany", (req, res, next) => {
// MAKE ANY OBJETS THAT I WANT TO CREATE

//have to manage only 20 insc and minimun 8
const manyInscriptions = [
        [
            "silb",
            "croll50",
            0 
        ],
        [
            "fire",
            "croll50",
            0 
        ]
    ];
    // HERE IS THE MAGIC
    connectDb.query("INSERT INTO registrations(swimmerId,competitionId,whatPosition) VALUES ?", [manyInscriptions], (error, result) => {
        if (error) {
            res.status(500).send({msg: "We can't register"})
            return next(error)
        } else {
            res.status(200).send({msg: "Registry is complete"})
        }
    })
})


// added querys to celebrate new competition... simple querys ... i have to controll it now

// to celebrate & create incription of 8 people
// const sqlQueryA = INSERT INTO registrations ( swimmerId, competitionId, whatPosition)  // TRY TO ADD CONT ALSO HERE 
// VALUES ? ; // ADD COMNSTANT WITH OBEJT ( ,, ), ( ,, )

// // want to see swimmers 1 to 5 position 
// const sqlQueryB = SELECT * FROM registrations WHERE competitionId = 'shark' ORDER BY competitionId ASC LIMIT 5; 

// // i have 8 people, also u have 5 places winners now i need to update table competition to celebrate 

// const sqlqQueryC = UPDATE competitions SET isCelebrate = 1 WHERE competitionId = 'shark';


// i have to export, because i need to use it in other places of the project //
module.exports = router; 