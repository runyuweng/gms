var express = require('express'),
        router = express.Router(),
        connection = require("../mysql/db");

router
    .get('/search/:currency/:name',function(req,res,next){
        var table;
        if(req.params.currency=='stu'){
            table='student';
        }else{
            table=req.params.currency;
        }
        var query = 'select * from '+table+' where '+req.params.currency+'_name like "%'+req.params.name+'%"';
        console.log(query);
        connection.query(query, function(err, rows, fields) {
          if (err) throw err;
          if(rows[0]){
            res.send({"code":"S01","result":rows});
        }else{
            res.send({"code":"F01"});
        }
        });
    })
module.exports = router;