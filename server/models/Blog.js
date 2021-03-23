const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: { type: String, max: 50 },
  image: { type: String },
  // USER ID ADDED FROM AUTH MIDDLEWARE TO EASILY ISOLATE USER  BLOGS
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = { Blog };
