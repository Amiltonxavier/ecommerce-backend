const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');

//Preocurar categoria pele id
exports.categoryById = (req,res, next, id) => {
	Category.findById(id).exec((err, category) => {
		if(err || !category){
			return res.status(400).json({
				error: errorHandler(err)
			})
		}
		req.category = category;
		next();
	})
}

exports.create = (req, res) =>{
	const category = new Category(req.body)
	category.save ((err, data) =>{
		if(err){
			return res.status(400).json({
				error: "Está categoria não existe"
			});
		}

		res.json({ data });
	});
};


//Reat
exports.read = (req, res) => {
	return res.json(req.category);
};


//Update
exports.update = (req, res) =>{
	const category = req.category
	category.name = req.body.name
	category.save((err, data) => {
		if(err){
			return res.status(400).json({
				error: errorHandler(error)
			})
		}
		res.json(data);
	})
}

//Remove
exports.remove = (req, res) =>{
	const category = req.category
	category.remove((err, data) => {
		if(err){
			return res.status(400).json({
				error: errorHandler(error)
			})
		}
		res.json({
			message: 'Catagoria apagada'
		});
	})
}
exports.list = (req, res) =>{
	Category.find().exec((err, data) => {
		if(err){
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
		res.json(data);
	})
}