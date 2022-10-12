const mariadb = require('mariadb');
const vals = require('./db_info.js');

// 테이블과 접속을 윈한 connection pool을 설정합니다. 
const pool = mariadb.createPool({
    host: vals.DBhost, port:vals.DBport,
    user: vals.DBuser, password: vals.DBpass,
    connectionLimit: 5
});

// 테이블에서 Leader trade history를 조회하여 return  합니다.
async function Get_LT_history(){
    let conn, rows;
    try{
        conn = await pool.getConnection();
        conn.query('USE test_db');
        rows = await conn.query('SELECT * FROM ct_leader_history');
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows[0];
    }
}

// 테이블에서 Leader 정보를 조회하여 return  합니다.
async function Get_LT_info(){
    let conn, rows;
    try{
        conn = await pool.getConnection();
        conn.query('USE test_db');
        rows = await conn.query('SELECT * FROM ct_leader');
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows[0];
    }
}

/*
db접속 예제

Get_LT_history()
  .then((rows) => {
    console.log(rows);
    return;
  })
  .catch((errMsg) => {
    console.log(errMsg);
    return;
  });
*/

 
module.exports = {
    Get_LT_history: Get_LT_history,
    Get_LT_info: Get_LT_info
}
