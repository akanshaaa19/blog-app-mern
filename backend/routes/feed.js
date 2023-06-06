var express = require('express');
var router = express.Router();

const feedController = require('../controller/feed')

/* GET users listing. */
router.get('/posts', feedController.getFeed);
router.get('/:postId', feedController.getPost)

router.post('/posts', feedController.postPost)

module.exports = router;
