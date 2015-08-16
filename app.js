 // var array = require("./array.js");
 // var sort = require('./sort.js');
  var express = require('express');
 var mysql = require('mysql');

 var app = express();
 var connection;

 app.get('*', function(res, req, next) {
   connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '19940826',
     database: 'student_score'
   });
   connection.connect(function(err) {
     next();
   });
 });

 var array = [];
 app.get('/', function(req, res) {
   connection.query('select * from student,score,subject where student.student_id = score.student_id and subject.subject_id = score.subject_id',
     function(err, rows) {
       if (err) throw err;
       array = formArray(rows);
       console.log(array);
     });
     res.render('index', {
       str: array
     });
   connection.end();

 });

 function formArray(tempArray) {
   var result = [];
   tempArray.forEach(function(val) {
     for (var i = 0; i < result.length; i++) {
       if (val.student_id === result[i].id) {
         result[i][val.subject_name] = val.score;
         return;
       }
     }
     //不能用数组做，数组最后没法让属性等于不同的科目；
     var obj = {};
     obj.id = val.student_id;
     obj.name = val.student_name;
     obj[val.subject_name] = val.score;
     result.push(obj);
   });
   return result;
 }

 // app.get('/', function(req, res) {
 //   res.render('index', {
 //     str: array
 //   });
 // });


 var hbs = require('hbs');
 app.set('view engine', 'html');
 app.engine('html', hbs.__express);

 app.use(express.static('public'));
 app.use(express.static('bower_components'));



 // app.get('/scores', function(req, res) {
 //   var sortKey = req.query.sortKey;
 //   var orderKey = req.query.orderKey;
 //   res.send(sort(sortKey, orderKey, array));
 // });

 app.listen(3000);
