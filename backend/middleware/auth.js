const jwt = require("jsonwebtoken");
let models = require("../models");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token == null) throw new Error("token null");

    const decodedToken = jwt.verify(token, process.env.TOKENUSER);
    const user = await models.User.findByPk(decodedToken.userId);
    if (user == null) throw new Error("utilisateur n existe plus");
    req.user = user;

    next();
    return;
  } catch (e) {
    res
      .status(500)
      .json({ message: e.message || "erreur d' authentification" });
  }
};
