var express = require('express')
var app = express()
var cors = require('cors')
 
app.use(cors())

// Database to store data, don't forget autoload: true
// var Datastore = require('nedb');
// var db = new Datastore({filename: "data2.db", autoload: true});

app.use(express.static("."));

// app.get('/data3', function (req, res) {
// 	// Find all of the existing docs in the database
// 	db.find({}, function(err, docs) {
// 		res.send(docs);
// 		// // Loop through the results, send each one as if it were a new chat message
// 		// for (var i = 0; i < docs.length; i++) {
// 		// 	console.log(docs[i].name + " " + docs[i].message);
// 		// }
// 	});
// })

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);

app.get('/', function(req, res) {
    res.render('index', {
      Name: req.query.form_input_name
    });
  });

app.listen(7000, function () {
  console.log('Example app listening on port 7000!')
})


// // Create a JavaScript Object with data to store
// var datatosave = {
// 	name: "Shawn",
// 	message: "Hello world"
// };
		


