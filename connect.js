var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'student',
    port: 3306
});
conn.connect();
var insert = 'insert into student_name values("5","小李")';
var select = 'select * from student_name';
conn.query(insert,function(err,rows,fields) {
    if(err) throw err;
})
conn.query('desc student_name', function(err, rows, fields) {
    if (err) throw err;
});

conn.query(select,function(err,rows,fields) {
    if(err) throw err;
    console.log(rows);
})
conn.end();
