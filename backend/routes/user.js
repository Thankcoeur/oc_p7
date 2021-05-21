const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const  AcountAcces = require('../middleware/AcountAcces')

//Route des utilisateurs
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get('/getUsers', auth, userCtrl.getUsers);
router.delete('/delete/:id', auth,AcountAcces, userCtrl.delete)
router.get('/getUser/:id',auth,AcountAcces, userCtrl.getUser)
module.exports = router;