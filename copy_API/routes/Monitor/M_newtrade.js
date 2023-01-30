const { json } = require('express');
var express = require('express');
var db_connect = require('../../DB_connect/test_db_connect');
var router = express.Router();

// Leader trader의 새로운 거래기록 발생
router.post('/', async function(req, res, next) {
    
    body = req.body;
    //console.log(body)
    res.statusCode = 200
    res.end('ok');

    //
    db_connect.PUT_LT_history(body);
    console.log('리더 거래기록 갱신 완료')
    LEADER_SEQ = body.LEADER_SEQ
    console.log('거래발생 리더순번 : ',body.LEADER_SEQ)

    console.log('구독자를 조회합니다.')
    const sub_data = await db_connect.Get_Sub_User(LEADER_SEQ)
    delete sub_data.meta
    
    
    for (var i =0; i < sub_data.length; i++ ) {
        console.log(`
            ------------------------------------------------
            PUBLIC SEQ: ${sub_data[i].PUBLIC_SEQ}
            FOLLOWING TYPE: ${sub_data[i].FOLLOWING_TYPE}
            FIXED AMOUNT: ${sub_data[i].FIXED_AMOUNT} 
            FIXED RATIO: ${sub_data[i].FIXED_RATIO} 
            TAKE RATIO: ${sub_data[i].TAKE_RATIO} 
            
            TRADE VOLUME : ${body.TRADE_VOLUME}
            TRADE PRICE : ${body.TRADE_PRICE}
            TRADE MARKET : ${body.TRADE_MARKET}
            ------------------------------------------------
        `)
    }
    

});


module.exports = router;