const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
} = require("../Controllers/postController");

const router = express.Router();

router.post("/create", createPost);
router.get("", getAllPosts);
router.get("/:id", getPostById);
router.delete("/:id", deletePost);

module.exports = router;