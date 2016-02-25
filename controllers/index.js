module.exports = function(db) {
	var express = require('express');
	var router = express.Router();
	var Kittens = require('../models/kittens')(db); // model
	var util = require('util');

	function isNotEmpty(array) {
		if (array.length > 0) {
			return true;
		} else {
			return false;
		}
	};

	router.get('/:kitten_name', function(req, res, next) {
		Kittens.findByName(req.params.kitten_name, function(results) {

			if (isNotEmpty(results)) {
				var context = {
					kittens : results
				};

				res.render('profile', context);
			} else {
				next();
			}

		});
	});

	router.get('/', function(req, res, next) {
		Kittens.all(function(results) {

			if (isNotEmpty(results)) {
				var context = {
					kittens : results
				}

				res.render('home', context);
			} else {
				next();
			}

		});
	});

	return router;
};