const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { verifyToken, requireAdmin } = require("../middleware/auth");

const isAdmin = (user) =>
  user?.email?.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();

// GET /api/posts — public, published only
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ published: true }).sort({ createdAt: -1 });
    res.json(posts.map((p) => p.toClient()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/posts/all — admin, all posts
router.get("/all", verifyToken, requireAdmin, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts.map((p) => p.toClient()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/posts/:id — public
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post.toClient());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/posts — admin
router.post("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post.toClient());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/posts/:id — admin
router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post.toClient());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/posts/:id — admin
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/posts/:id/like — session-based, no auth needed
router.post("/:id/like", async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ error: "sessionId required" });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    const hasLiked = post.likedBy.includes(sessionId);
    if (hasLiked) {
      post.likedBy = post.likedBy.filter((id) => id !== sessionId);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      post.likedBy.push(sessionId);
      post.likes += 1;
    }
    await post.save();
    res.json({ likes: post.likes, liked: !hasLiked, likedBy: post.likedBy });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/posts/:id/comments — authenticated
router.post("/:id/comments", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    post.comments.push({
      userId: req.user.uid,
      userName: req.user.name || req.user.email.split("@")[0],
      text: req.body.text,
    });
    await post.save();
    const comment = post.comments[post.comments.length - 1];
    res.status(201).json({
      id: comment._id.toString(),
      userId: comment.userId,
      userName: comment.userName,
      text: comment.text,
      createdAt: comment.createdAt,
      replies: [],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/posts/:id/comments/:commentId — own or admin
router.delete("/:id/comments/:commentId", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    if (!isAdmin(req.user) && comment.userId !== req.user.uid) {
      return res.status(403).json({ error: "Not authorized" });
    }
    comment.deleteOne();
    await post.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/posts/:id/comments/:commentId/replies — authenticated
router.post("/:id/comments/:commentId/replies", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    comment.replies.push({
      userId: req.user.uid,
      userName: req.user.name || req.user.email.split("@")[0],
      text: req.body.text,
    });
    await post.save();
    const reply = comment.replies[comment.replies.length - 1];
    res.status(201).json({
      id: reply._id.toString(),
      userId: reply.userId,
      userName: reply.userName,
      text: reply.text,
      createdAt: reply.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/posts/:id/comments/:commentId/replies/:replyId — own or admin
router.delete("/:id/comments/:commentId/replies/:replyId", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    const reply = comment.replies.id(req.params.replyId);
    if (!reply) return res.status(404).json({ error: "Reply not found" });
    if (!isAdmin(req.user) && reply.userId !== req.user.uid) {
      return res.status(403).json({ error: "Not authorized" });
    }
    reply.deleteOne();
    await post.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
