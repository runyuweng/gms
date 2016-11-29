var express = require('express'),
        router = express.Router(),
        connection = require("../mysql/db");

router
    .post('/login',function(req,res,next){
        var data = req.body;
        console.log(data);
        connection.query('select * from user where username="'+data.username+'"'
            , function(err, rows, fields) {
          if (err) throw err;
          if(rows[0]){
              if(rows[0].pass==data.pass){
                res.send({"code":"S01","message":"登陆成功"});
              }else{
                res.send({"code":"F01","message":"密码错误"});
              }
          }else{
                 res.send({"code":"F02","message":"用户名不存在"});
          }
        });
    })
    // .get('/out',function(req,res,next){
    //     console.log("收到请求");
    //     req.session.user = null;
    //     res.send({"code":"S01","message":"已成功登出"});
    // });
module.exports = router;