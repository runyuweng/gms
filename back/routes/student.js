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
    .get('/studentlist/:table/:tutorid',function(req,res,next){
        if(req.params.table=='tutorin'){
          var tutor = 'tutorin_id';
        }else{
          var tutor = 'tutorout_id';
        }
        var tutor = "tutorin_id";
        connection.query('select * from '+req.params.table +' where '+tutor +'=' + req.params.tutorid
            , function(err, rows, fields) {
          if (err) throw err;
           console.log(rows);
           res.send({"code":"S01","student":rows});
        });
    })
    .get('/studentdetail/:studentid',function(req,res,next){
        connection.query('select * from student where stu_id='+req.params.studentid
            , function(err, rows, fields) {
          if (err) throw err;
           res.send({"code":"S01","student":rows});
        });
    })
module.exports = router;