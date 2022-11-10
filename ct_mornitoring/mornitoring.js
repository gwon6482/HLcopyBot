import request from "request";
import {v4 as uuidv4} from "uuid";
import crypto from "crypto";
import { ModulesOption } from "@babel/preset-env/lib/options";
import _ from 'lodash' 
import { pool } from './model/pool'

let leaders
const getFollower = async(data) => 
{
    const sql = `
    SELECT 
        LEADER_SEQ,
        ACCESS_KEY,
        SECRET_KEY

    FROM 
        ct_leader
    WHERE
        TRADER_ST = "RS01";
    `;

    const conn = await pool.getConnection(async conn => conn);

    try{
        leaders = await conn.query(sql,data);
    }

    catch(err){
        console.log(err);
    }
    finally {
        conn.release();        
        
    }
    console.log("DB에서 리더트레이더 정보 불러오기 완료")
}

const sign = require('jsonwebtoken').sign
const queryEncode = require("querystring").encode



let bodyT = {}

const mornitorting = setInterval(() =>{
    const access_key = leaders[0]['ACCESS_KEY']
    const secret_key = leaders[0]['SECRET_KEY']
    const server_url = process.env.UPBIT_OPEN_API_SERVER_URL
  
    const state = 'done'
  
    const uuids = [
        //...
    ]
    const non_array_body = {
        state: state,
        page: 1,
        limit: 1
    }
    const array_body = {
        uuids: uuids,
    }
    const body = {
        ...non_array_body,
        ...array_body
    }
  
    const uuid_query = uuids.map(uuid => `uuids[]=${uuid}`).join('&')
    const query = queryEncode(non_array_body) + '&' + uuid_query
  
    const hash = crypto.createHash('sha512')
    const queryHash = hash.update(query, 'utf-8').digest('hex')
  
    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
    }
  
    const token = sign(payload, secret_key)
  
    const options = {
        method: "GET",
        url: server_url + "/v1/orders?" + query,
        headers: {Authorization: `Bearer ${token}`},
        json: body
    }
  
    request(options, (error, response, body) => {
        if (error) throw new Error(error);
        if (JSON.stringify(bodyT) !== JSON.stringify (body)){
            bodyT = body;
            const request = require('request');
            // POST 요청하기
        
            let body1=_.cloneDeep(body);
            body1[0].LEADER_SEQ=leaders[0]["LEADER_SEQ"];
            const options = {
                uri:'http://localhost:3020/v1/copytrading',
                method: 'POST',
                
                body: body1,
                json: body1
            }
            console.log(body);

            request.post(options, function (error, response, body) {
                console.log(response.body)
            });
        }
    })

  }, 1000);


  module.exports = getFollower();