var express = require('express')
var app = express()
var cors = require('cors')
var mustacheExpress = require('mustache-express')
var bodypars = require('body-parser')
let url= require('url')
let path = require('path')
let { Client } = require('pg')
 
app.use(cors())
app.use(express.static("."));

let client;

if (process.env.data){
    client = new Client({connectionString: process.env.data, ssl: true})
}

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);

app.get('/', function(req, res) {
    res.render('index', {
      Name: req.query.form_input_NAME
    });
  });

  app.get('/', function(req, res) {
    res.render('index', {
      Name: req.query.form_input_JOB
    });
  });

  app.get('/', function(req, res) {
    res.render('index', {
      Name: req.query.form_input_PERSON
    });
  });

// app.listen(7000, function () {
//   console.log('Example app listening on port 7000!')
// })

app.listen(process.env.PORT || 7000, function () {
    console.log('Example app listening on port 7000!')
  })



