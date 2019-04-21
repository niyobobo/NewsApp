import crypto from 'crypto';
import models from '../models';

const { User, Post } = models;

const postController = {
  createPost: async (req, res) => {
    const { id: author } = req.user;
    const { title, body, media } = req.body;
    const slug = `${title.toLowerCase().split(' ').join('-').substring(0, 30)}-${crypto.randomBytes(5).toString('hex')}`;
    try {
      const post = await Post.create({
        title, body, media, slug, author,
      });
      if (!post) {
        return res.status(500).send({
          status: res.statusCode,
          message: 'Failed to create the post',
        });
      }
      return res.status(201).send({
        status: res.statusCode,
        post,
      });
    } catch (error) {
      return res.status(500).send({
        status: res.statusCode,
        message: error.parent.routine,
      });
    }
  },

  getAllPost: async (req, res) => {
    try {
      const posts = await Post.findAll({ where: {} });
      return res.status(200).send({
        status: res.statusCode,
        posts,
      });
    } catch (error) {
      return res.status(500).send({
        status: res.statusCode,
        message: error.parent.routine,
      });
    }
  },

  approvePost: async (req, res) => {
    const { id: approvedBy } = req.user;
    const { id } = req.params;
    try {
      const post = await Post.findOne({ where: { id } });
      if (!post) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'No post found for the provided information',
        });
      }
      if (post.approved) {
        return res.status(400).send({
          status: res.statusCode,
          message: 'The post is already approved',
        });
      }
      const approve = await Post.update({ approved: true, approvedBy }, { where: { id } });
      if (approve) {
        return res.status(200).send({
          status: res.statusCode,
          message: 'Post approved successfuly',
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: res.statusCode,
        message: error,
      });
    }
  },

  updatePost: async (req, res) => {
    const {
      id, title, body, media,
    } = req.body;
    const slug = `${title.toLowerCase().split(' ').join('-').substring(0, 30)}-${crypto.randomBytes(5).toString('hex')}`;
    try {
      const post = await Post.findOne({ where: { id } });
      if (!post) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'No post found for the provided information',
        });
      }
      const update = await Post.update({
        title, body, media, slug, edited: true
      }, { where: { id } });
      if (!update) {
        return res.status(500).send({
          status: res.statusCode,
          message: 'Failed to update the post',
        });
      }
      return res.status(201).send({
        status: res.statusCode,
        message: 'Post updated successfuly',
      });
    } catch (error) {
      return res.status(500).send({
        status: res.statusCode,
        message: error.parent.routine,
      });
    }
  },

  deletePost: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findOne({ where: { id } });
      if (!post) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'No post found for the provided information',
        });
      }
      const deleted = await Post.destroy({ where: { id } });
      if (deleted) {
        return res.status(200).send({
          status: res.statusCode,
          message: 'Post deleted successfuly',
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: res.statusCode,
        error,
      });
    }
  },

  getAllByAuthor: async (req, res) => {
    const { username } = req.params;
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'No author found for this username',
        });
      }
      const posts = await Post.findAll({ where: { author: user.id } });
      return res.status(200).send({
        status: res.statusCode,
        author: {
          fullName: user.fullName,
          username: user.username,
          profileUrl: user.profileUrl,
        },
        totalPosts: posts.length,
        posts,
      });
    } catch (error) {
      return res.status(500).send({
        status: res.statusCode,
        error,
      });
    }
  },

};

export default postController;
