var express = require('express')
var app = express()
var cors = require('cors')
var mustacheExpress = require('mustache-express')
var bodypars = require('body-parser')
var urlencodedParser = bodypars.urlencoded({ extended: true });
let url = require('url')
let path = require('path')
let { Client } = require('pg')

app.use(cors())
//app.use(express.static("."));
app.use(urlencodedParser);

let client;

if (process.env.DATABASE_URL){
    client = new Client({connectionString: process.env.DATABASE_URL, ssl: true});
  } else {
    client = new Client({database: 'DWDForum'});
  }
  client.connect();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);


app.get('/', function (req, res) {
    console.log('index is running!')
    res.render('index', {});
})

app.get('/', function(req, res1){
    client.query('SELECT * FROM posts', (err, res2) => {
      if (err) throw err;
      for (let row of res2.rows) {
        console.log(JSON.stringify(row));
      }
      let messagesArray = res2.rows;
      res1.render('index', {
        messagesArray
      });
      // client.end();
    });

});

app.post('/post',function (req, res3){
var mytext = req.body.NAME;
  if (mytext === undefined){
    res3.sendFile(path.join(__dirname + '/index.html'))
  }else{
    client.query('INSERT INTO posts (message) VALUES (\'' + mytext + '\')', function (error, results) {
    if (error) throw error;
    res3.redirect('/post');
  });
  }
})

app.post('/name', function (req, res) {
    console.log(req.body.NAME)
    res.render('index', {
        Name: req.body.NAME
    });
});

app.post('/job', function (req, res) {
    console.log(req.body)
    res.render('index', {
        Job: req.body.JOB
    });
});

app.post('/person', function (req, res) {
    console.log(req.body)
    res.render('index', {
        Person: req.body.PERSON
    });
});

// app.listen(7000, function () {
//   console.log('Example app listening on port 7000!')
// })

app.listen(process.env.PORT || 7000, function () {
    console.log('Example app listening on port 7000!')
})



