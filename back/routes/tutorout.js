var express = require('express'),
        router = express.Router(),
        connection = require("../mysql/db");

router
    .get('/tutorsout',function(req,res,next){
        connection.query('select * from tutorout'
            , function(err, rows, fields) {
          if (err) throw err;
           res.send({"code":"S01","tutorout":rows});
        });
    })
module.exports = router;