module.exports.controller = (app) => {
	app.get('/users', function(req, res){
		res.render('users', { username: 'Miminari', description: 'This is the description of all the users' })
	})
}