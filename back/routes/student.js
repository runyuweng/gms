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
        connection.query('select * from student where fk_'+tutor +'=' + req.params.tutorid
            , function(err, rows, fields) {
          if (err) throw err;
           console.log(rows);
           res.send({"code":"S01","student":rows});
        });
    })





    .get('/studentdetail/:studentid',function(req,res,next){
      connection.query('select * from student where stu_id='+req.params.studentid
            , function(err, rows, fields) {
          if(rows[0].fk_tutorin_id){
            console.log("有校内导师");
            connection.query(
              'select * from student inner join paper on student.fk_paper_id=paper.paper_id inner join tutorin on student.fk_tutorin_id=tutorin.tutorin_id and stu_id='+req.params.studentid
                  , function(err, rows, fields) {
                console.log(rows);
                if (err) throw err;
                 res.send({"code":"S01","student":rows[0]});
              });
          }else{
            console.log("无校内导师");
            connection.query(
              'select * from student inner join paper on student.fk_paper_id=paper.paper_id inner join tutorout on student.fk_tutorout_id=tutorout.tutorout_id and stu_id='+req.params.studentid
                  , function(err, rows, fields) {
                console.log(rows);
                if (err) throw err;
                 res.send({"code":"S01","student":rows[0]});
              });
          }
          // if (err) throw err;
          //  res.send({"code":"S01","student":rows});
        });

    })
module.exports = router;