const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  userId: String,
  userName: String,
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replies: [replySchema],
});

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: String,
    readTime: Number,
    category: String,
    imageUrl: { type: String, default: "" },
    tags: [String],
    published: { type: Boolean, default: true },
    author: { type: String, default: "Bizwire Team" },
    likes: { type: Number, default: 0 },
    likedBy: [String],
    comments: [commentSchema],
  },
  { timestamps: true }
);

const toClient = (obj) => {
  const o = obj.toObject ? obj.toObject({ virtuals: false }) : { ...obj };
  o.id = o._id.toString();
  delete o._id;
  delete o.__v;
  o.comments = (o.comments || []).map((c) => {
    c.id = c._id.toString();
    delete c._id;
    c.replies = (c.replies || []).map((r) => {
      r.id = r._id.toString();
      delete r._id;
      return r;
    });
    return c;
  });
  return o;
};

postSchema.methods.toClient = function () {
  return toClient(this);
};

module.exports = mongoose.model("Post", postSchema);
