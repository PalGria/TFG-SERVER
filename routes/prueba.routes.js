const express = require('express');
const router = express.Router();
const dbConnection = require('../connection.js');
const connection = dbConnection();
const fs = require('fs');
const db = fs.readFileSync('./database.sql', "utf8");
//const VerifyToken = require('../auth/VerifyToken.js');
const uri = '/prueba/'
router.get(uri , (req, res) =>{
    console.log("funca");
    console.log(db);
    connection.query(db, (err, result) => {
        res.json({
            "status" : "Ok",
            "things" : result,
            "err" : err
        });
    });

});
module.exports = router;