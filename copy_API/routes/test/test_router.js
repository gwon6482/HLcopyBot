const { json } = require('express');
var express = require('express');
var router = express.Router();

var LT_infoRouter = require('./DB_test/LT_info')
var LT_historyRouter = require('./DB_test/LT_history')

router.use('/db/LT_info', LT_infoRouter)
router.use('/db/LT_history', LT_historyRouter);


module.exports = router;
