// set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

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

// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {
      Todo.find(function(err, todos) {
        if (err)
          res.send(err)

        res.json(todos);
      });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req,res) {

      Todo.create({
        text: req.body.text,
        done: false
      }, function(err, todo) {
        if (err)
          res.send(err);

        Todo.find(function(err, todos) {
          if (err)
            res.send(err)
          res.json(todos);
          });
        });
      });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {

       Todo.remove({
           _id : req.params.todo_id
       }, function(err, todo) {
           if (err)
               res.send(err);

           // get and return all the todos after you create another
           Todo.find(function(err, todos) {
               if (err)
                   res.send(err)
               res.json(todos);
           });
       });
    });


// listen
app.listen(8080);
console.log("App listening on port 8080");
