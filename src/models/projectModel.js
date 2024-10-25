const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    des: { type: String, required: true },
    img: { type: String, required: true },
    iconLists: [{ type: String, required: true }],
    link: { type: String, required: true },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;