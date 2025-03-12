const express = require("express");
const {
  createComment,
  getCommentsByPostId,
  deleteComment,
} = require("../Controllers/commentController");

const router = express.Router();

router.post("/create", createComment);
router.get("/post/:postId", getCommentsByPostId);
router.delete("/:id", deleteComment);

module.exports = router;