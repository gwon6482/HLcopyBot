import express  from "express";

const router = express.Router();

router.post("/", async(req,res)=>{
    console.log(req.body);
    res.json("카피트레이딩 서버에 전송완료");
})


module.exports = router;