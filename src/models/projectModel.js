const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String },
    des: { type: String },
    img: { type: String },
    iconLists: [{ type: String }],
    link: { type: String },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
