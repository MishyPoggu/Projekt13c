const { Comments, Users } = require("../Models/index");
const msg = require("../Response/msg");
const uzn = require("../Response/uzenet");

const createComment = async (req, res) => {
  const { userId, postId, content } = req.body;

  if (!userId || !postId || !content) {
    return res.status(400).json({
      status: 400,
      message: msg.data.failure.unfilled,
      üzenet: uzn.data.failure.unfilled,
    });
  }

  try {
    const newComment = await Comments.create({ userId, postId, content });
    res.status(201).json({
      status: 201,
      commentId: newComment.commentId,
      message: msg.comment.success.created,
      üzenet: uzn.comment.success.created,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.unknown,
      üzenet: uzn.user.failure.unknown,
      err: error,
    });
  }
};

const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comments.findAll({
      where: { postId },
      include: [{ model: Users, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      status: 200,
      data: comments,
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

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comments.findOne({ where: { commentId: id } });
    if (!comment) {
      return res.status(404).json({
        status: 404,
        message: msg.comment.failure.notfound,
        üzenet: uzn.comment.failure.notfound,
      });
    }
    await comment.destroy();
    res.status(200).json({
      status: 200,
      message: msg.comment.success.deleted,
      üzenet: uzn.comment.success.deleted,
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

module.exports = { createComment, getCommentsByPostId, deleteComment };
