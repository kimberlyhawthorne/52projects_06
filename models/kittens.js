module.exports = function(db) {
	var model = {
		all: function(callback) {
			db.find().toArray(function(err, results) {
				if (err) throw err;

				callback(results);
			});
		},

		findByName: function(name, callback) {
			db.find({name : name}).toArray(function(err, results) {
				if (err) throw err;

				callback(results);
			})
		}
	}

	return model;
};