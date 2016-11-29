var express = require('express'),
        router = express.Router(),
        connection = require("../mysql/db");

router
    .get('/papers',function(req,res,next){
        connection.query('select * from paper'
            , function(err, rows, fields) {
          if (err) throw err;
           res.send({"code":"S01","paper":rows});
        });
    })
module.exports = router;