var mysql = require('mysql');
var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.engine('.html',ejs.__express);
app.set('view engine','html');

var Sequelize = require('sequelize')
  , sequelize = new Sequelize('student', 'root', 'root', {
      dialect: "mysql", 
      port:    3306, 

})

// var connectedTest = sequelize.authenticate()
//     .then(function () {
//         console.log("成功! ");
//     })
//     .catch(function (err) {
//         console.log("错误");
//     })
//     .done();

    var student_name = sequelize.define('student_name', {
        name: Sequelize.STRING,
    }, {
        tableName: 'student_name',
        timestamps: false
    });

    function get_all_data() {
        student_name.findAll().then(function(data) {
            return data;
        });
    }

    app.get('/', function(req, res) {
        res.render('index', {});
    });


    app.get('/student_names', function(req, res) {
        var result = [];
        student_name.findAll().then(function(data) {
            for (var i = 0; i < data.length; i++) {
                result.push(data[i].dataValues);
            }
        }).then(function() {
            res.send({
                status: 1,
                data: result,
                message: ''
            });
        });
    });

    app.delete('/student_name', function(req, res) {
        var id = req.params.id;
        student_name.destroy({
            where: {
                id: id
            }
        }).done(function() {
            res.send({
                status: 1,
                message: ''
            });
        });
    });


app.post('/table', function(req, res) {
   var name = req.body.name;
    student_name.create({
        name: name,
    }).done(function() {
        res.send({
        status: 1,
        message: ''
        });
    });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
