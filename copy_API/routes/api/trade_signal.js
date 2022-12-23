const { json } = require('express');
var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
    console.log('trade send api ok - get')
    res.send('trade send api ok - get')
});


module.exports = router;
