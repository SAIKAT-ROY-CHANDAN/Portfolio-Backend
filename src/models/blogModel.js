const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tags: [String],
    content: { type: String, required: true },
    coverImage: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;


