'use strict';
let express = require('express');
let router = express.Router();

router.post('/', function (req, res) {

  res.writeHead(200, {'Content-Type': 'application/xml'});

  var data = req.body.xml;
  console.log(JSON.stringify(data))
  if(data.msgtype === 'text'){//文本消息
  		if(data.content == "一个女生"){
  			data.content = "我知道一个她的秘密。你想知道吗？"
  		}
  		if(data.content == "想" || data.content == "想知道"){
  			data.content = "她喜欢XXX，哈哈哈哈哈哈！"
  		}
  		if(data.content == "阿B" || data.content == "大哥"){
  			data.content = "狠，没瑕疵"
  		}
      msssage(res,data);
  }else if(data.msgtype === 'image'){//图片消息
      data.content = '你好暂不支持图片回复';
      msssage(res,data);
  }else if(data.msgtype === 'video'){//视频消息
      data.content = '你好暂不支持视频回复';
      msssage(res,data);
  }else if(data.msgtype === 'voice'){//语言消息
      data.content = '你好暂不支语音回复';
      msssage(res,data);
  }
});

function msssage(res,data){
	  var resMsg = '<xml>' +
	    '<ToUserName><![CDATA[' + data.fromusername + ']]></ToUserName>' +
	    '<FromUserName><![CDATA[' + data.tousername + ']]></FromUserName>' +
	    '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
	    '<MsgType><![CDATA[text]]></MsgType>' +
	    '<Content><![CDATA['+data.content+']]></Content>' +
	    '</xml>';
	  res.end(resMsg);
}

module.exports = router;