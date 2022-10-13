import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import index from "./routes";
import version1Router from "./routes/v1/index";

// import express  from "express";
import createHttpError from "http-errors";
import {pool} from "./model/pool"

import request from "request";
import {v4 as uuidv4} from "uuid";
import crypto from "crypto";
import { ModulesOption } from "@babel/preset-env/lib/options";
const sign = require('jsonwebtoken').sign
const queryEncode = require("querystring").encode

let bodyT ={}

const mornitoring = setInterval(() =>{
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
      if (error) throw new Error(error);
      if (JSON.stringify(bodyT) !== JSON.stringify (body)){
        bodyT = body;
        console.log(body);
      }
  })
}, 1000);

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", index);
app.use("/v1", version1Router);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  let apiError = err;

  if (!err.status) {
    apiError = createError(err);
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  return res.status(apiError.status).json({ message: apiError.message });
});

// bin/www 를 그대로 사용하기 위해서 예외적으로 commonJs 문법을 적용
module.exports = app;
