const { Posts, Users } = require("../Models/index");
const upload = require("../Middleware/uploadImage");
const msg = require("../Response/msg");
const uzn = require("../Response/uzenet");

const createPost = async (req, res) => {
  console.log('Bejövő kérés:', req.body, req.file);
  try {
    const {
      userId,
      title,
      content,
      companyName,
      street,
      city,
      zipcode,
      state,
      country,
    } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    console.log('Feldolgozott adatok:', { userId, title, content, companyName, street, city, zipcode, state, country, imageUrl });

    if (!userId || (!title && !content && !companyName)) {
      return res.status(400).json({
        status: 400,
        message: msg.data.failure.unfilled,
        üzenet: uzn.data.failure.unfilled,
      });
    }

    const newPost = await Posts.create({
      userId,
      title: title || `${companyName || "Ismeretlen cég"} - Új helyszín`,
      content: content || "Nincs további tartalom",
      companyName,
      streetAddress: street,
      city,
      postalCode: zipcode,
      stateOrRegion: state,
      country,
      imageUrl,
      type: companyName ? 'location' : 'forum'
    });

    res.status(201).json({
      status: 201,
      postId: newPost.postId,
      message: msg.post.success.created,
      üzenet: uzn.post.success.created,
      data: newPost 
    });
  } catch (error) {
    console.error('Hiba a poszt létrehozásakor:', error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.unknown,
      üzenet: uzn.user.failure.unknown,
      error: error.message
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const { type } = req.query;
    const whereClause = type ? { type } : {};
    const posts = await Posts.findAll({
      where: whereClause,
      include: [{ model: Users, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
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

module.exports = {
  createPost: [upload.single("image"), createPost], 
  getAllPosts,
  getPostById,
  deletePost
};