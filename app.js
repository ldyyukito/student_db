 var getNewArray = require('./sort.js');
 var express = require('express');
 var mysql = require('mysql');

 var app = express();
 var connection;

 var hbs = require('hbs');
 app.set('view engine', 'html');
 app.engine('html', hbs.__express);

 app.use(express.static('public'));
 app.use(express.static('bower_components'));

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
       res.render('index', {
         str: array
       });
       connection.end();

     });
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
     var obj = {};
     obj.id = val.student_id;
     obj.name = val.student_name;
     obj[val.subject_name] = val.score;
     result.push(obj);
   });
   return result;
 }

 app.get('/scores', function(req, res) {
   connection.query('select * from student,score,subject where student.student_id = score.student_id and subject.subject_id = score.subject_id',
     function(err, rows) {
       var sortKey = req.query.sortKey;
       var orderKey = req.query.orderKey;
       array = formArray(rows);
       res.send(getNewArray(sortKey, orderKey, array));
       connection.end();
     });
 });


 app.get('/delete', function(req, res) {
   var id = req.query.id;
   connection.query('delete from score where student_id =' + id,
     function(err, rows) {
       if (err) {
         throw err;
       }
       res.send("true");
       connection.end();
     });
 });

 app.post('/add', function(req, res) {
   var student = req.query.student;
   console.log(student);
   connection.query('insert into student values(' + student.id + ',' + student.name + ')',
     function(err, rows) {
       if (err) {
         throw err;
       }
       connection.query('insert into score values(' + student.id + ',1,' + student.chinese + '),(' + student.id + ',2,' + studentmath + '),(' + id + ',3,' + student.english + ')',
         function(err, rows) {
           if (err) {
             throw err;
           }
           connection.end();
         });
     });
 });



 app.listen(3000);
