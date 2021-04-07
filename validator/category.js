const { isLength, max } = require("lodash");

exports.categoryValidator = (req, res, next) => {
  //Name
  req.check("name", "Nome da Categoria é obrigatorio").notEmpty();
  req
    .check("name")
    .isLength({ min: 3 })
    .withMessage("Nome da categoria muito curto");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
