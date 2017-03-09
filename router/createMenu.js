'use strict';
let fs = require('fs');
let request = require('request');
let config = require('../config/env/development');

function createMenu(token){
	console.log("token:====="+token)
	let options = {
		method:'POST',
	    url: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + token,
	    form: JSON.stringify(config.menus),
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded'
	    }
	};
	request.post(options, function (err, res, body) {
	    if (err) {
	      console.log("MenuErr:"+err)
	    }else {
	      console.log("Menubody:"+body);
	    }
	  })
}

module.exports = createMenu;
