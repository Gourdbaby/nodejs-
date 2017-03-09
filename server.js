'use strict';
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

var defaults = require('./router/default');
var config = require('./config/env/development');
var getToken = require('./router/getToken');
var createMenu = require('./router/createMenu');
var contentCallback = require('./router/contentCallback');

var app = express();

app.use(bodyParser.xml({
	limit: '1MB', 
	xmlParseOptions: {
	  normalize: true,   
	  normalizeTags: true,
	  explicitArray: false
	}
}))

app.use(defaults);
app.use(contentCallback);

getToken()

app.listen(config.prot,function(){
	console.log("prot:"+config.prot)
})

