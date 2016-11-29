var express = require('express'),
        router = express.Router(),
        connection = require("../mysql/db");

router
    .get('/tutorsin',function(req,res,next){
        connection.query('select * from tutorin'
            , function(err, rows, fields) {
          if (err) throw err;
           res.send({"code":"S01","tutorin":rows});
        });
    })
module.exports = router;