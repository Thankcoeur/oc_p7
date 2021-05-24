const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const  AcountAcces = require('../middleware/AcountAcces')
const isAdmin = require('../middleware/isAdmin')
var ExpressBrute = require('express-brute');
 
var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store);



router.post("/signup",bruteforce.prevent, userCtrl.signup);
router.post("/login",bruteforce.prevent, userCtrl.login);
router.get('/getUsers', auth,isAdmin , userCtrl.getUsers);
router.delete('/delete/:id', auth,AcountAcces, userCtrl.delete)
router.get('/getUser/:id',auth, userCtrl.getUser)
module.exports = router;