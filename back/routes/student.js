var express = require('express'),
        router = express.Router(),
        connection = require("../mysql/db");

router
    .get('/students',function(req,res,next){
        connection.query('select * from student'
            , function(err, rows, fields) {
          if (err) throw err;
           res.send({"code":"S01","student":rows});
        });
    })
module.exports = router;