const { json } = require('express');
var express = require('express');
var router = express.Router();
var db_connect = require('../../DB_connect/test_db_connect');


router.post('/', function(req, res, next) {
    console.log('alarm send api ok - post')
    res.send('alarm send api ok - post')
});


module.exports = router;
