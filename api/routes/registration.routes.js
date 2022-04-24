const express = require("express")
const { connectDb } = require("../database/config");
const router = express.Router(); 

//thinking to use express validator and check

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
// pto 5
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
//have to manage only 20 insc and minimun 8 // pto 6
    const manyInscriptions = [
        [ "silb", "pecho200", 0],
        [ "fire", "pecho200", 0],
        [ "juanV", "pecho200", 0],
        [ "marCast", "pecho200", 0],
        [ "vitAd", "pecho200", 0],
        [ "daBal", "pecho200", 0],
        [ "anBri", "pecho200", 0],
        // You can try comment one 
        [ "alG", "pecho200", 0],
    ];

    if ( manyInscriptions.length < 8 ) {
        res.status(400).send({msg: "We can't register, The competition has minimun 8 swimmers"})
        // return next(error)return next(error)
    }else {
    // HERE IS THE MAGIC
        connectDb.query("INSERT INTO registrations(swimmerId,competitionId,whatPosition) VALUES ?", [manyInscriptions], (error, result) => {
            if (error) {
                res.status(500).send({msg: "We can't register"})
                return next(error)
            } else {
                res.status(200).send({msg: "Registry is complete"})
            }
        })
    };
});

// PTO 7 por partes
// (remember have to put check and express validator + check install )
// post to create & put to uodate 
router.route("/registration/bigQuery").post((req, res, next) => {

const happySwimmers = [
    [ "silb", "arrow50", 2],
    [ "fire", "arrow50", 1],
    [ "juanV", "arrow50", 7],
    [ "marCast", "arrow50", 3],
    [ "vitAd", "arrow50", 4],
    [ "daBal", "arrow50", 5],
    [ "anBri", "arrow50", 6],
    // You can try comment one 
    [ "alG", "arrow50", 8],
];

// const nameCompetition = 'arrow150'; 
// possibility put check()
// first query
    if ( happySwimmers.length < 8 ) { 
        res.status(500).send({
            msg: "We can't register, The competition has minimun 8 swimmers"
        })
    } else {
    connectDb.query("INSERT INTO registrations (swimmerId, competitionId, whatPosition) VALUES ? ", [happySwimmers], (err, response) => {
        if (err) {
            return next(err)
        }
        else {
        res.status(200).json(response)
        }
    }
    )};  
    // else if 

    // have to create a new endpoint???? or secuenzial???
    if ( happySwimmers.length > 8 ) {
        connectDb.query("SELECT * FROM registrations WHERE competitionId ? ORDER BY competitionId ASC LIMIT 5",[nameCompetition],(err, response) => {
            if (err) {
                return next(err)
            }
            else {
            res.status(200).json(response)
            }
        }
    )};   
    if ( response ) {
        connectDb.query("UPDATE competition SET isCelebrate = 1 WHERE competitionId = ?",[nameCompetition],(err, response) => {
            if (err) {
                return next(err)
            }
            else {
            res.status(200).json(response)
            }
        }
    )}; 
});

// TO USE INTO DBEAVER === REMEMBER USE ONE QUERY AT TIME.... YOU CANT USE BIG QUERY WITH INSET UPDATE ETC 
// added querys to celebrate new competition... simple querys ... i have to controll it now
// querys to use into dbeaver and show tables 
// to celebrate & create incription of 8 people
// const sqlQueryA = INSERT INTO registrations ( swimmerId, competitionId, whatPosition)  // TRY TO ADD CONT ALSO HERE 
// VALUES ? ; // ADD COMNSTANT WITH OBEJT ( ,, ), ( ,, )
// // want to see swimmers 1 to 5 position 
// const sqlQueryB = SELECT * FROM registrations WHERE competitionId = 'shark' ORDER BY competitionId ASC LIMIT 5; 
// // i have 8 people, also u have 5 places winners now i need to update table competition to celebrate 
// const sqlqQueryC = UPDATE competitions SET isCelebrate = 1 WHERE competitionId = 'shark';


// i have to export, because i need to use it in other places of the project //
module.exports = router; 