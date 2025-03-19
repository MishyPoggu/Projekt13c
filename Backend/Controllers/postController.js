const { Posts, Users } = require("../Models/index");
const connections = require("../Connections/connections");
const msg = require("../Response/msg");
const uzn = require("../Response/uzenet");

const createPost = async (req, res) => {
  const { userId, title, content } = req.body;

  if (!userId || !title || !content) {
    return res.status(400).json({
      status: 400,
      message: msg.data.failure.unfilled,
      üzenet: uzn.data.failure.unfilled,
    });
  }

  try {
    const newPost = await Posts.create({ userId, title, content });
    res.status(201).json({
      status: 201,
      postId: newPost.postId,
      message: msg.post.success.created,
      üzenet: uzn.post.success.created,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.unknown,
      üzenet: uzn.user.failure.unknown,
      err:error
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll({
      include: [{ model: Users, attributes: ["username"] }],
      order: [["createdAt", "DESC"]]
    });
    res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.fetcherror,
      üzenet: uzn.user.failure.fetcherror,
    });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Posts.findOne({
      where: { postId: id },
      include: [{ model: Users, attributes: ["username"] }],
    });
    if (!post) {
      return res.status(404).json({
        status: 404,
        message: msg.post.failure.notfound,
        üzenet: uzn.post.failure.notfound,
      });
    }
    res.status(200).json({
      status: 200,
      data: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.unknown,
      üzenet: uzn.user.failure.unknown,
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Posts.findOne({ where: { postId: id } });
    if (!post) {
      return res.status(404).json({
        status: 404,
        message: msg.post.failure.notfound,
        üzenet: uzn.post.failure.notfound,
      });
    }
    await post.destroy();
    res.status(200).json({
      status: 200,
      message: msg.post.success.deleted,
      üzenet: uzn.post.success.deleted,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.unknown,
      üzenet: uzn.user.failure.unknown,
    });
  }
};

module.exports = { createPost, getAllPosts, getPostById, deletePost };