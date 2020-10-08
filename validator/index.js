exports.userSignupValidator = (req, res, next) => {
	req.check('name', 'Nome é obrigatorio').notEmpty();
	req.check('email', 'Email deve ter  4 à 32 caracteres')
		.matches(/.+\@.+\..+/)
		.withMessage('Email deve conter @')
		.isLength({
			min: 4, 
			max: 32
		});

	req.check('password', 'Password é obrigatoria').notEmpty();
	req.check('password')
		.isLength({min: 6})
		.withMessage('Password deve conter no minimo 6 characteres')
		.matches(/\d/)
		.withMessage('Password deve conter numeros');
	const errors = req.validationErrors()
	if (errors) {
		const firstError = errors.map(error => error.msg)[0];
		return res.status(400).json({error: firstError});
	}
	next();
};