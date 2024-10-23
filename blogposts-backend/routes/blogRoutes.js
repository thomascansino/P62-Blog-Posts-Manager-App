const express = require('express');
const router = express.Router();
const {
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost
} = require('../controllers/blogController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.route('/').get(getPosts).post(createPost);

router.route('/:id').get(getPost).put(updatePost).delete(deletePost);

module.exports = router;