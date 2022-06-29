var User = require('../models/User');

module.exports.controller = (app) => {

	// get all users
	app.get('/users', (req, res) => {
		User.find({}, 'name email', (err, users) => {
			if (err) {console.log(err)}
			res.send(users)
		})
	});

	// get user by id
	app.get('/users/:id', (req, res) => {
		User.findById(req.params.id, 'name email', (err, user) => {
			if (err) {console.log(err)}
			res.send(user)
		})
	});

	// add new user
	app.post('/users', (req, res) => {
		const user = new User({
			name: req.body.name,
			email: req.body.email
		})

		user.save((err, user) => {
			if (err) {console.log(err)}
			//res.send(user)

			res.send({
				success: true,
				code: 200,
				msg: `User ${user.name} added!`
			})
		})
	});

	// update user
	app.put('/users/:id', (req, res) => {
	    User.findById(req.params.id, 'name email', (err, user) => {
	    	if (err) { console.error(err)}
	     
	    	user.name = req.body.name
	    	user.email = req.body.email

	     	user.save(function (err, user) {
	        	if (err) {console.log(err)}
	        	res.send(user)
	      	})
		})
	});	

	// del
	app.delete('/users/:id', (req, res) => {
		User.remove({
			_id: req.params.id
		}, (err, user) => {
			if (err) {console.log(err)}
	        res.send({
	        	success: true
	        })
		})
	});
}