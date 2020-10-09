const User = require('../models/user');

exports.userById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {

		if(err || !user) {
			return res.status(400).json({
				error: 'Usuário não encontrado'
			});
		}

		req.profile = user;
		next();

	});
};
 //User Profile
exports.read = (req, res) =>{
	req.profile.hashed_password = undefined;
	req.profile.hashed_salt = undefined;
	return res.json(req.profile);
}

//Update user profile
exports.update = (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.profile._id }, 
		{ $set: req.body }, 
		{ new: true },
		(err,user) => {
			if(err, user) {
				return res.status(400).json({
					error: 'Voce não está autorizado a efetuar está ação'
				})
			}
			user.hashed_password = undefined;
			user.salt = undefined;
			res.json(user);
		}
		);
}