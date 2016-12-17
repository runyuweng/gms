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
        })
      })

    .post('/deleteStudent',function(req,res,next){
        var data = req.body;
        var list =[];
        for(var i=0;i<data.list.length;i=i+2){
          list.push(data.list[i])
        }
        console.log(list);
        for(var id of list){
            connection.query('delete from student where stu_id="'+id+'"'
                , function(err, rows, fields) {
              if (err) throw err;
              res.send("删除成功");
            });
        }
    })

    .post('/updateStudent',function(req,res,next){
        var data = req.body;
        
        connection.query("select * from student where stu_id="+data.stu_id
          , function(err, rows, fields) {
            console.log(rows[0]);
            var stu_name = data.stu_name?data.stu_name:rows[0].stu_name,
                  stu_age = data.stu_age?data.stu_age:rows[0].stu_age,
                  stu_major = data.stu_major?data.stu_major: rows[0].stu_major,
                  stu_orign = data.stu_orign?data.stu_orign:rows[0].stu_orign;
            var query="update student set stu_name = '"+stu_name+"', stu_age = '"+stu_age+"',stu_major='"+stu_major+"',stu_orign='"+stu_orign+"'where stu_id='"+data.stu_id+"';"
            console.log(query);
            connection.query(query, function(err, rows, fields) {
              if (err) throw err;
              res.send("更新成功");
            });
        });
    })

    .post('/insertStudent',function(req,res,next){
        var data = req.body;
        var tutor = data.tutor;
        if(tutor.split(',')[0]=='校内导师'){
          connection.query('select * from tutorin where tutorin_name="'+tutor.split(',')[1]+'";',
          function(err,rows,fields){
            var tutorin_id = rows[0].tutorin_id;
            connection.query('insert into paper(paper_title,paper_require) values ("'+data.paper_title+'","'+data.paper_require+'");',function(err,rows,fields){
              connection.query('select * from paper where paper_title="'+data.paper_title+'";',function(err,rows,fields){
                var paper_id = rows[0].paper_id;
                var query ='insert into student (stu_name,stu_sex,stu_age,stu_major,stu_orign,fk_tutorin_id,fk_paper_id) values ("'+data.stu_name+'","'+data.stu_sex+'","'+data.stu_age+'","'+data.stu_major+'","'+data.stu_orign+'","'+tutorin_id+'","'+paper_id+'");';
                connection.query(query,function(err,rows,fields){
                  res.send("插入成功");
                })
              })
            })
          })
        }else{
          connection.query('select * from tutorout where tutorout_name="'+tutor.split(',')[1]+'";',
            function(err,rows,fields){
              var tutorout_id = rows[0].tutorout_id;
              connection.query('insert into paper(paper_title,paper_require) values ("'+data.paper_title+'","'+data.paper_require+'");',function(err,rows,fields){
                connection.query('select * from paper where paper_title="'+data.paper_title+'";',function(err,rows,fields){
                  var paper_id = rows[0].paper_id;
                  var query ='insert into student (stu_name,stu_sex,stu_age,stu_major,stu_orign,fk_tutorout_id,fk_paper_id) values ("'+data.stu_name+'","'+data.stu_sex+'","'+data.stu_age+'","'+data.stu_major+'","'+data.stu_orign+'","'+tutorout_id+'","'+paper_id+'");';
                  connection.query(query,function(err,rows,fields){
                    res.send("插入成功");
                  })
                })
              })
            })
        }
        // connection.query("select"
        //   , function(err, rows, fields) {
        //   if (err) throw err;
        //   console.log('插入成功');
        // });
        // connection.query(query
        //     , function(err, rows, fields) {
        //   if (err) throw err;
        //   console.log(插入成功)；
        // });
    })




module.exports = router;