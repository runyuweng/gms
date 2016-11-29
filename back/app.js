var express = require('express');
var app = express();
var user = require('./routes/user');
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
var cors = require('cors'),
    student = require('./routes/student');
    paper = require('./routes/paper'),
    tutorout = require('./routes/tutorout'),
    tutorin = require('./routes/tutorin');

// app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(user);
app.use(student);
app.use(paper);
app.use(tutorout);
app.use(tutorin);


app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
