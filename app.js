var express = require('express');
var expresshbs = require('express-handlebars');
var util = require('util');
var sass = require('node-sass-middleware');
var	mongodb = require('mongodb');

var mongoURI = "mongodb://user:Password!@ds019078.mlab.com:19078/heroku_469qwd9p";
var db;

// instantiate application
var app = express();

// database connection
mongodb.MongoClient.connect(mongoURI, function(err, database) {
	if (err) throw err;

	database.collection('kittens', function(err, results) {
		if (err) throw err;

		db = results;
		app.listen(3000);
		appConfig(app);
	})
})

function appConfig(app) {
	// include controllers and pass db reference
	var controllers = require('./controllers/index')(db);

	// views
	app.engine('handlebars', expresshbs({ defaultLayout: 'main' }));
	app.set('view engine', 'handlebars');

	// middleware
	app.use(sass({
		src: __dirname + '/src',
		dest: __dirname + '/public',
		debug: true,
		outputStyle: 'compressed'
	}));
	app.use(controllers);
	app.use(express.static('public'));
	app.use(function(req, res) {
		res.render('error');
	});
};