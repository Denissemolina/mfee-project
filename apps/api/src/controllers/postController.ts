import Post from '../models/Post';
import Comment from '../models/Comment';

//Get posts list
const getPostList = async (req, res) => {
  try {
    const posts = await Post.find();
    // Return all the categories with a 200 status code
    res.status(200).json(posts);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

//Get post by category
const getPostsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const post = await Post.find({ category }).populate('category');
    if (!post) {
      return res.status(404).json({ message: 'Posts not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

//Get post by id
const getPostById = async (req, res) => {
    
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate('category').populate('comments');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

//Create post
const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

//Create comment for a post id
const createPostComment = async (req, res) => {
  try {
    const { id } = req.params;
    const commentBody = req.body;

    const post = await Post.findById(id);
    const comment = await Comment.create(commentBody);
    post.comments.push(comment._id);
    await post.save();
    return res.status(201).json(comment);
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message });
  }
};

//Update a post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message });
  }
};

//Delete a post by id
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id, {});
    await Comment.deleteMany({ _id: { $in: deletedPost.comments } });
    return res.status(200).json(deletedPost);
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message });
  }
};

export default {
  getPostList,
  getPostById,
  getPostsByCategory,
  createPost,
  createPostComment,
  updatePost,
  deletePost
};