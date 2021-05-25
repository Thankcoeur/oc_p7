const express = require('express')

const router = express.Router()
const ExpressBrute = require('express-brute')

const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')
const AcountAcces = require('../middleware/AcountAcces')
const isAdmin = require('../middleware/isAdmin')

const store = new ExpressBrute.MemoryStore()
const bruteforce = new ExpressBrute(store)

router.post('/signup', userCtrl.signup)
router.post('/login', bruteforce.prevent, userCtrl.login)
router.get('/getUsers', auth, isAdmin, userCtrl.getUsers)
router.delete('/delete/:id', auth, AcountAcces, userCtrl.delete)
router.get('/getUser/:id', auth, userCtrl.getUser)
module.exports = router
