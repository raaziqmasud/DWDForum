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

if (process.env.data) {
    client = new Client({ connectionString: process.env.data, ssl: true })
}

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);


app.get('/', function (req, res) {
    console.log('index is running!')
    res.render('index', {});
})


app.post('/name', function (req, res) {
    console.log(req.body.NAME)
    res.render('page', {
        Name: req.body.NAME
    });
});

app.post('/next', function (req, res) {
    console.log(req.body)
    res.render('index', {
        Job: req.body.JOB
    });
    res.render('index', {
        Person: req.body.PERSON
    });
});

// app.post('/person', function (req, res) {
//     console.log(req.body)
//     res.render('index', {
//         Person: req.body.PERSON
//     });
// });

// app.listen(7000, function () {
//   console.log('Example app listening on port 7000!')
// })

app.listen(process.env.PORT || 7000, function () {
    console.log('Example app listening on port 7000!')
})



