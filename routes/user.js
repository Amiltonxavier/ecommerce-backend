const express = require("express");
const router = express.Router();

// Tercei Erro Reparado
const { userById, read, update, purchaseHistory, list } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
   res.json({
      user: req.profile
   })
});

//View all User
router.get('/user', list);

router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);


router.param("userId", userById);

module.exports = router;