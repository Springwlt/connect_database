var mysql = require('mysql');
var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.engine('.html',ejs.__express);
app.set('view engine','html');

app.get('/', function (req, res) {
  res.render('index',{})
});

function createConnection() {
   return mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: 'root',
       database: 'student',
       port: 3306
   });
}

app.get('/student_names',function(req,res) {
    var conn = createConnection();
    conn.connect();
    conn.query('select * from student_name', function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });
    conn.end();
});

app.delete('/student_name', function(req, res) {
   var id = req.body.id;
   var conn = createConnection();
   conn.connect();
   var deleteData = 'delete from student_name where id=' + id;
   conn.query(deleteData, function(err, results) {
   });
   conn.end();
});

app.post('/table', function(req, res) {
   var name = req.body.name;
   console.log(name);
   var conn = createConnection();
   conn.connect();
   conn.query('insert into student_name(name) values("'+name+'")', function(err, results) {
   });
   conn.end();
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
