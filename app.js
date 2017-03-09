var express = require('express');
var defaults = require('./router/default');
var config = require('./config/env/development');
var app = express();

app.use('/',defaults)

