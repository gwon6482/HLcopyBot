const { json } = require('express');
var express = require('express');
var router = express.Router();
var db_connect = require('../../DB_connect/test_db_connect');


router.get('/', function(req, res, next) {
    console.log('trade signal api ok - get')
    res.send('trade signal api ok - get')
});

router.post('/', (req, res, next) => {
    temp = req.body
    console.log(JSON.stringify(temp))
    res.end(JSON.stringify(temp))
})

module.exports = router;
