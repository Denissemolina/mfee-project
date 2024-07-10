import express from 'express';

import postController from '../controllers/postController';

const router = express.Router();

// Get all posts
router.get('/', postController.getPostList);

// Get post by id
router.get('/:id', postController.getPostById);

// Get post by category id
router.get('/category/:category', postController.getPostsByCategory);

// Create post
router.post('/', postController.createPost);

// Create a comment in a post
router.post('/:id/comments', postController.createPostComment);

// Update post
router.patch('/:id', postController.updatePost);

// Delete post
router.delete('/:id', postController.deletePost);

export default router;