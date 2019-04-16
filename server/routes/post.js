const express = require('express');
const router = express.Router();
const { createPostValidator } = require('../validator');
const { 
  getPosts, 
  createPost, 
  postsByUser,
  postById,
  isPoster,
  updatePost,
  deletePost 
} = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get("/posts", getPosts);
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator);
router.get("/posts/:userId", requireSignin, postsByUser);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;