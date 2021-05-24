const jwt = require('jsonwebtoken');
let models = require('../models');
require('dotenv').config()
// verify is Admin
module.exports = async (req, res, next) => {


    try {

        if (req.user.isAdmin) {

            next()
            return
        }




    } catch (e) {

    }
};