import express from "express";
import request from "request";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import getFollowers from "./getfollowers";

const sign = require("jsonwebtoken").sign;
const queryEncode = require("querystring").encode;

const router = express.Router();

const followers = getFollowers();

router.post("/", async (req, res) => {
  const followers1 = await followers;
  const targetFollowers = followers1.filter(
    (obj) => obj["LEADER_SEQ"] === req.body[0].LEADER_SEQ
  );

  targetFollowers.forEach((follower) => {
    const access_key = follower.ACCESS_KEY;
    const secret_key = follower.SECRET_KEY;
    const server_url = process.env.UPBIT_OPEN_API_SERVER_URL;

    let calculatedVol;

    if (follower.COPY_TRADE_TYPE === "CT01") {
      calculatedVol = follower.FIXED_AMOUNT / req.body[0].price;
    } else if (follower.COPY_TRADE_TYPE === "CT02") {
      calculatedVol = (req.body[0].volume * follower.FIXED_RATIO) / 100;
    }

    const body = {
      market: req.body[0].market,
      side: req.body[0].side,
      volume: calculatedVol.toString(),
      price: req.body[0].price,
      ord_type: req.body[0].ord_type,
    };

    const query = queryEncode(body);

    const hash = crypto.createHash("sha512");
    const queryHash = hash.update(query, "utf-8").digest("hex");

    const payload = {
      access_key: access_key,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: "SHA512",
    };

    const token = sign(payload, secret_key);

    const options = {
      method: "POST",
      url: server_url + "/v1/orders",
      headers: { Authorization: `Bearer ${token}` },
      json: body,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      console.log(body);
    });

    console.log(req.body);
  });
  res.json("업비트 서버에 전송완료");
});

module.exports = router;
