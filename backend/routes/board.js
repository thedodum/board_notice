var express = require('express');
var router = express.Router();

var mysql = require('mysql');

// Connection 객체 생성
var connection = mysql.createConnection({
    host: '61.251.164.24',
    port: 3306,
    user: 'neo',
    password: 'neo!!!',
    database: 'TEST_DB'
});

// Connect
connection.connect(function (err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

// all list
router.get('/', function (req, res) {
    connection.query('SELECT * FROM board', function (err, rows) {
        if (err) throw err;
        res.send(rows);
    });
});

// insert
router.post('/write', function (req, res) {
    var list = {
        'title': req.body.title,
        'email': req.body.email,
        'contents': req.body.desc,
        'date': req.body.date,
        'file': req.body.file
    };
    var query = connection.query('insert into board set ?', list, function (err, result) {
        if (err) {
            console.error(err);
            throw err;
        }
        res.status(200).send('success');
    });
});

// detail
router.get('/:id', function (req, res, next) {
    var id = parseInt(req.params.id, 10);
    connection.query('SELECT * FROM board where no = ' + id, function (err, rows) {
        if (err) throw err;
        res.send(rows);
    });
});

// delete
router.delete('/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);
    connection.query('DELETE FROM board where no = ' + id, function (err, rows) {
        if (err) throw err;
        res.send(rows);
    });
});

// update
router.patch('/:id', function (req, res) {
    var list = {
        'title': req.body.title,
        'email': req.body.email,
        'desc': req.body.desc,
        'date': req.body.date,
        'file': req.body.file
    };
    var id = parseInt(req.params.id, 10);
    var query = connection.query('UPDATE board set title="' + req.body.title + '", contents="' + req.body.desc +'" where no=' + id, function (err, result) {
        if (err) {
            console.error(err);
            throw err;
        }
        res.status(200).send('success');
    });
});



module.exports = router;
