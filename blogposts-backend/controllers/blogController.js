const Post = require('../models/postModel');
const asyncHandler = require('express-async-handler');


//@desc Get all blog posts of the logged in user
//@route GET /api/posts
//@access private
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ user_id: req.user.id });
    res.status(200).json(posts);
});

//@desc Create new blog post of the logged in user
//@route POST /api/posts
//@access private
const createPost = asyncHandler(async (req, res) => {
    console.log('The blog post to be created is:', req.body);
    const { title, keywords, body } = req.body;
    if ( !title || !body ) {
        res.status(400);
        throw new Error(`A ${ !title && !body ? 'title and body' : !title ? 'title' : 'body' } is/are mandatory.`);
    } 
    
    const post = await Post.create({
        title,
        keywords,
        body,
        user_id: req.user.id,
    });

    res.status(201).json(post);
});

//@desc Get a blog post of any user
//@route GET /api/posts/:id
//@access private
const getPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if ( !post ) {
        res.status(404);
        throw new Error("This post doesn't exist!");
    }
    res.status(200).json(post);
});

//@desc Update blog post of the logged in user
//@route PUT /api/posts/:id
//@access private
const updatePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if ( !post ) {
        res.status(404);
        throw new Error("This post doesn't exist!");
    }

    if ( post.user_id.toString() !== req.user.id ) {
        res.status(403);
        throw new Error("User don't have permission to update other user posts");
    };

    const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // show the updated post in response
    )

    res.status(201).json(updatedPost);
});

//@desc Delete blog post of the logged in user
//@route DELETE /api/posts/:id
//@access private
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if ( !post ) {
        res.status(404);
        throw new Error("This post doesn't exist!");
    }

    if ( post.user_id.toString() !== req.user.id ) {
        res.status(403);
        throw new Error("User don't have permission to update other user posts");
    };

    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedPost);
});

module.exports = {
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost
};