// set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methosOverride = require('method-override');

// config
mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); // log requests to the console
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// model
var Todo = mongoose.model('Todo', {
  text : String
});

// listen
app.listen(8080);
console.log("App listening on port 8080");
