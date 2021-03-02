const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// validation layer for documents with data types
const UserSchema = new Schema({
	name: String,
	email: String
});

// define the Schema
const User = mongoose.model('User', UserSchema);
module.exports = User

/*
// создать юзера
const user_resource = new User({ 
	name: 'John Doe',
	email: 'john@doe.com'
})
user_resource.save((error) => {
	if(error)
		console.log(error);
		res.send({
			success: true,
			code: 200,
			msg: 'User added!'
		})
})*/