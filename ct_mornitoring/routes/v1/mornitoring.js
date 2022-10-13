import express  from "express";
import createHttpError from "http-errors";
import {pool} from "../../model/pool"

import request from "request";
import {v4 as uuidv4} from "uuid";
import crypto from "crypto";
import { ModulesOption } from "@babel/preset-env/lib/options";
const sign = require('jsonwebtoken').sign
const queryEncode = require("querystring").encode



const router = express.Router();

router.post("/", async(req,res,next)=>{
    const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY
    const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY
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
        if (error) throw new Error(error)
        res.send(body)
    })

    })

module.exports = router;