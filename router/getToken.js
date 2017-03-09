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