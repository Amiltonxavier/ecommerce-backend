const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const User = require("../models/user");
const jwt = require("jsonwebtoken"); //para gerar token assinado
const expressJwt = require("express-jwt"); // para verificação de autorização
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Este email já está sendo usado",
      });
    }

    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

//Signin

exports.signin = (req, res) => {
  // encontre a base de usuários no e-mail
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "O usuário com este email não existe. Porfavor",
      });
    }

    // se o usuário for encontrado, certifique-se de que o e-mail e a senha correspondem
    // criar método de autenticação no modelo do usuário
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email e Password não correspondem",
      });
    }
    //gerar um token assinado com ID de usuário e segredo
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persista o token como 't' no cookie com data de validade
    res.cookie("t", token, { expire: new Date() + 9999 });
    //resposta de retorno com cliente de interface de token de usuário
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

//Signout

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Deslogado com sucesso" });
};

exports.requireSignin = expressJwt({
  //secret: 'my-secret',
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["sha1", "RS256", "HS256"],
  //algorithms: ['sha1', 'RS256', 'HS256']
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Acesso negado",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resoure! Acesso negado",
    });
  }
  next();
};
