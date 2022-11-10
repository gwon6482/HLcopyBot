import express  from "express";

const router = express.Router();

router.post("/", async(req,res,next)=>{
    /*
    
    */
        res.send("OK")
    })


module.exports = router;