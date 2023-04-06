const { json } = require('express');
var express = require('express');
var db_talbe_view = require('../../DB_module/DB_tableview');
var db_getdata = require('../../DB_module/DB_getdata');
var TR_getdata = require('../../TR_module/TR_gettrade');
var LR_getdata = require('../../LR_module/LR_leaderget');
var router = express.Router();


// 데이터베이스의 모든 테이블을 보여줌
router.get('/show_tables', function(req, res, next) {

    db_talbe_view.show_tables()
    .then((rows) => {
      console.log(typeof rows);
      res.json(rows);
      return;
    })
    .catch((errMsg) => {
      console.log(errMsg);
      return;
    });

  
});

// ct_cmm_code 테이블의 모든 데이터를 보여줌
router.get('/show_cmmcode', function(req, res, next) {

    db_talbe_view.showtable_cmmcode()
    .then((rows) => {
      console.log(typeof rows);
      
      res.json(rows);
      return;
    })
    .catch((errMsg) => {
      console.log(errMsg);
      return;
    });

  
});

router.post('/show_allleadertrade', async function(req, res, next) {

  var body = await req.body;
  const seq = body.seq;
  var leader_his = await LR_getdata.get_leaderhis_byID(seq);
  console.log(`router : ${JSON.stringify(leader_his)}`);
  res.json(leader_his);


});

module.exports = router;
``