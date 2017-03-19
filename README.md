# nodejs-
一个基于nodejs开发的微信公众号！    

使用方法：  

1.git clone 项目地址 把代码下载到本地  

2.进入项目根目录 执行 npm install 下载 依赖  

3.找到 config文件夹 下 env文件夹 下  development.js修改成你自己的 appid和AppSecret  

4.代码部署到服务器 注意：本项目使用的服务器 是百度 BAE 专业版 无需 自己主动操作服务器 只需要把文件上传到服务器上 即可  

5.如果您也使用百度BAE 建议不要修改 项目的入口文件 server.js  

6.不上传服务器可以把你的appid和AppSecret填写好以后 在本地命令行执行 npm start即可查看 token获取情况等信息。  

7.代码详解 有时间我会持续更新 敬请期待。  

8.代码简介：  
config目录下为你的开发配置文件，导出一个JSON对象，开发时可配置例如你的端口号，你的数据库连接信息，开发微信 可以用于配置你的appid和secret等等一些微信配置的信息..一般config目录下会包涵一个env目录 用于里面会有development.js和product.js 一个是开发环境的配置文件一个是生产环境的配置文件 我们可以在config的根目录下 写一个 config.js用于根据环境变量取不同的env目录下的环境配置文件..  
router文件 顾名思义 路由文件 所有的路由写在 router里  
根目录的server.js目录的入口文件  
```
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
```
引入require('body-parser-xml')(bodyParser);
```
require('body-parser-xml')(bodyParser);
```
使用body-parser-xml是我们做自动消息回复的时候 微信会给我们填写的服务器URL上发送一个POST的请求 我们收到的数据就是一个XML的数据 我们需要把XML的数据转换成JSON方便我们操作。  
主要说一下 我们微信的获取token的方式吧。因为 我们在微信开发的时候所有的接口都要有token才能使用微信的接口方法。这个很重要...  
```
'use strict';

var fs = require('fs');
var request = require('request');

var config = require('../config/env/development');
var createMenu = require('./createMenu');

function getAccess(){
	var accessGet = {
		method:'GET',
		url:"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+config.appid+"&secret="+config.secret+""
	}
	
	return new Promise((reslove, reject) => {
		request(accessGet, (err,res,body) => {
			if(err){
				 reject(err);
				 return false;
			}
			var bodys = JSON.parse(body);
			var res = JSON.stringify(res);
			console.log("res:"+res);
			console.log("body:"+body);
			reslove(bodys)
		})
	})
}

function saveToken(){
	getAccess().then(res => {
		let token = res['access_token'];
		fs.writeFile('./token',token,function(err){
		})
		createMenu(token);
	}).catch(err => {
		console.log(err)
	})
}

function refreshToken() {
  saveToken();
  setInterval(function () {
    saveToken();
  }, 7000*1000);
};

module.exports = refreshToken
```
微信的token每2小时失效一次所以我们一定要在2小时之内从新获取一次token否则我们所有的微信的方法都失效...  
首先getAccess方法 请求微信提供的获取token的接口 携带我们的appid和secret  
node的所有IO操作都是异步的 所以我们这里用了Promise让这个方法返回出去一个Promise以便我们调用的时候使用.then操作服 同步操作  
saveToken方法我们使用fs模块创建一个名为token的文件 将我们获取到的token保存在我们根目录下  
refreshToken每7000\*1000ms 我们从新获取一次 token并保存到我们的token文件中 以便我们以后使用
