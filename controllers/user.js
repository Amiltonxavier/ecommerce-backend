const User = require('../models/user');
const { Order } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');

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

// Pegar todos os usuários
exports.list = (req, res) => {
   User.find({}, function(err, users){
       let userMap = {};

            users.forEach(function(user){
                userMap[user._id] = user;
        });
        res.send(userMap); 
   })
}

//Atualizando o Perfil do Usuário
exports.update = (req, res) => {
 
    const { name, password } = req.body;

    User.findOne({ _id: req.profile._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Usuário não encontrado'
            });
        }
        if (!name) {
            return res.status(400).json({
                error: 'Nome é Obrigatório por favor não deixe em branco'
            });
        } else {
            user.name = name;
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'A Senha deve minimo 6 carateres ou mais'
                });
            } else {
                user.password = password;
            }
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('Erro ao atualizar', err);
                return res.status(400).json({
                    error: 'Atualização de perfil falhou'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};
exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];

    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        });
    });

    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { history: history } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Ocorreu um erro ao atualizar o Histório de Compra'
            });
        }
        next();
    });
};

exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};

//Delete User
exports.remove = async(req, res, next) =>{
    //mongoose.set('useFindAndModify', false);
    const user= await User.findById(req.params.clientId)
    if(!user){
        return res.status(400).json({
            error: errorHandler(err)
        });
    }

    await user.remove();
    res.status(200).json({
        success: true,
        user
    })
}
