var express = require('express');
var crypto = require('crypto');

var router = express.Router();
var token = "wangmingj5211";

router.get('/',function(req,res){
	var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
    
    var arr = [token,timestamp,nonce].sort();
    var str = arr.toString().replace(/,/g,"");
    
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str,'utf-8').digest("hex");
    console.log("code:"+code)
   
    if(code===signature){
        res.send(echostr)
    }else{
        res.send("error");
    }
})

module.exports = router;