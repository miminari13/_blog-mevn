module.exports.controller = (app) => {
	// get home
	app.get('/', function(req, res){
		res.render('index', { title: 'Express' })
	})
}
