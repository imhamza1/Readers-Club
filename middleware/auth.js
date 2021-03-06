const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/user");

async function auth(req, res, next) {
  let token = req.cookies.authorization;
  if (!token) return res.status(400).redirect("/users/not_login");
  try {
    let user = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = await User.findById(user._id);
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
  next();
}

module.exports = auth;
