const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

//Route des utilisateurs
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get('/getUser', auth, userCtrl.getUser);
router.delete('/delete', auth, userCtrl.delete)

module.exports = router;