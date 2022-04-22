const express = require("express")
const { connectDb } = require("../database/config");
const router = express.Router(); 

// //GET ALL swimmers // 
router.route("/swimmer").get((req, res, next) => {
// all the querys i have to almacenar into const
    const sqlQuery = "SELECT * FROM swimmers"
    //REMEMBER TO CALL THE CONNECTION
    connectDb.query(sqlQuery, (err, swimmers) => {
        if (err) {
            return next(err)
        }
        else {

            let hombre = 0;
            let mujer = 0;

            for (let i = 0 ; i < swimmers.length; i++) {
                
                let swimmer = swimmers[i]; 
                console.log(swimmers[i]);
                if ( swimmer.sex === "Hombre"  ){

                hombre =  hombre + 1 ; 
                    
                } else if ( swimmer.sex === "Mujer" ){
                    mujer = mujer + 1 ; 
                }
            };

            console.log("Número de hombres", hombre)
            console.log("Número de mujeres", mujer)
            res.status(200).json(swimmers)
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

//CREATE A NEW SWIMMER
router.post("/swimmer/create", (req, res, next) => {
    const inputData = {
        swimmerId: req.body.swimmerId,
        name: req.body.name,
        sex: req.body.sex, 
        
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

// to get all SWIMMERS + points ORDER BY ASC 
// pto 9
router.route("/swimmer-points").get((req, res, next) => {
    connectDb.query("SELECT name, points FROM swimmers ORDER BY points ASC", (error, response) => {
        if (error) {
            return next(error)
        }
        else {
            res.status(200).json(response)
        }
    })
});

// i have to export, because i need to use it in other places of the project //
module.exports = router; 