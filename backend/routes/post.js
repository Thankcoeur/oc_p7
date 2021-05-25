const express = require('express');

const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const PostAccesControl = require('../middleware/PostAccesControl');

// Route des posts
router.post('/add', auth, multer, postCtrl.add);
router.delete('/delete', auth, PostAccesControl, multer, postCtrl.delete);
router.get('/', auth, postCtrl.listMsg);

module.exports = router;
