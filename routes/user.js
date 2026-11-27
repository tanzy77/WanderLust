const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router.route("/signup")
  .get(userController.renderSignUp)
  .post(userController.postSignUp);

router.route("/login")
  .get(userController.renderLogIn)
  .post(saveRedirectUrl, 
  passport.authenticate('local', 
  { failureRedirect: '/login', 
    failureFlash: true }), 
    userController.postLogIn
);

router.get("/logout", userController.logOut);

module.exports = router;