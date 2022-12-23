var express = require('express');
var router = express.Router();
var swaggerUi = require("swagger-ui-express");
var YAML = require("yamljs");
var path = require("path");


var MoniterRouter = require('./api/moniter_signal')
var AlarmRouter = require('./api/alarm_signal')
var tradeRouter = require('./api/trade_signal')
var ReactAppRouter = require('./api/react_app_signal')
var testRouter = require('./test/test_router');



router.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(YAML.load(path.join(__dirname, "./swagger/swagger.yaml"))),
);

// 루트 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 테스트 url
router.use('/test',testRouter);

// api url
router.use('/api/MT_signal',MoniterRouter)
router.use('/api/AL_signal',AlarmRouter)
router.use('/api/TR_signal',tradeRouter)
router.use('/api/RA_signal',ReactAppRouter)




module.exports = router;
