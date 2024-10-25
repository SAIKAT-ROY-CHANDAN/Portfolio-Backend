const mongoose = require("mongoose");

const workExperienceSchema = new mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String },
    desc: { type: String },
    className: { type: String },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

const WorkExperience = mongoose.model("WorkExperience", workExperienceSchema);

module.exports = WorkExperience;
