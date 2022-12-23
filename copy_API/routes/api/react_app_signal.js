const { json } = require('express');
var express = require('express');
var router = express.Router();
var db_connect = require('../../DB_connect/test_db_connect');


router.post('/', function(req, res, next) {
    console.log('react app signal send api ok - get')
    res.send('react app send api ok - get')
});


module.exports = router;
