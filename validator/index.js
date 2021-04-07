const { isLength, max } = require("lodash");

exports.userSignupValidator = (req, res, next) => {
  //Name
  req.check("name", "Nome é obrigatorio").notEmpty();
  req
    .check("name")
    .isLength({ min: 3 })
    .withMessage("Nome deve conter no mínimo 3 characteres");
  //Email
  req.check("email", "Email é obrigatório").notEmpty();
  req
    .check("email")
    //req.check('email', 'Email deve ter  4 à 32 caracteres')
    .matches(/.+\@.+\..+/)
    .withMessage("Verifique seu email, algo está errado")
    .isLength({
      min: 5,
      max: 32,
    });

  //Phone
  req.check("phone", "Número de telefone é Obrigatório").notEmpty();
  req
    .check("phone")
    .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/)
    .withMessage("Número de Telefone Inválido");

  //Password
  req.check("password", "Senha é obrigatória").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password deve conter no mínimo 6 characteres")
    .matches(/\d/)
    .withMessage("Password deve conter números");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.userUpdate = (req, res, next) => {
  req.check("name", "Nome é obrigatorio").notEmpty();
  req
    .check("name")
    .isLength({ min: 3 })
    .withMessage("Nome deve conter no mínimo 3 characteres");
  //Email
  req.check("email", "Email é obrigatório").notEmpty();
  req
    .check("email")
    //req.check('email', 'Email deve ter  4 à 32 caracteres')
    .matches(/.+\@.+\..+/)
    .withMessage("Verifique seu email, algo está errado")
    .isLength({
      min: 5,
      max: 32,
    });

  //Phone
  req.check("phone", "Número de telefone é Obrigatório").notEmpty();
  req
    .check("phone")
    .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/)
    .withMessage("Número de Telefone Inválido");
  //Password
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password deve conter no mínimo 6 characteres")
    .matches(/\d/)
    .withMessage("Password deve conter números");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
