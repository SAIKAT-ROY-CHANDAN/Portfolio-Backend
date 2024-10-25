const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Blog = require("./models/blogModel");
const Project = require("./models/projectModel");
const WorkExperience = require("./models/workExperience");

// const cors = require('cors');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// https://portfolio-backend-tawny-gamma.vercel.app/

// Allowed emails
const allowedUsers = {
  "saikotroydev@gmail.com": { role: "admin" },
  "test@gmail.com": { role: "admin" },
};
const predefinedPassword = "PROGRAMMER2002@";

// POST: Login with predefined emails
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (allowedUsers[email] && password === predefinedPassword) {
    res.status(200).json({
      message: "Login successful",
      email,
      role: allowedUsers[email].role,
    });
  } else {
    res.status(401).json({ message: "Unauthorized: Invalid email or password" });
  }
});

// GET: Fetch all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// POST: Create a new blog
app.post("/api/blogs", async (req, res) => {
  const { title, tags, content, coverImage } = req.body;

  try {
    const newBlog = new Blog({ title, tags, content, coverImage });
    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", data: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Failed to create blog" });
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id);
  try {
    const blog = await Blog.findById(id);

    // if (!blog) {
    //     return res.status(404).json({ error: 'Blog not found' });
    // }
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// GET: Fetch all projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// POST: Create a new project
app.post("/api/projects", async (req, res) => {
  const { id, title, des, img, iconLists, link } = req.body;

  try {
    const newProject = new Project({ id, title, des, img, iconLists, link });
    await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully", data: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

app.get("/api/experience", async (req, res) => {
  try {
    const experiences = await WorkExperience.find();
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving work experiences" });
  }
});

app.post("/api/experience", async (req, res) => {
  const { id, title, desc, className, thumbnail } = req.body;

  const newExperience = new WorkExperience({
    id,
    title,
    desc,
    className,
    thumbnail,
  });

  try {
    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (error) {
    res.status(400).json({ message: "Error creating work experience", error });
  }
});

app.get("/", (req, res) => {
  res.send("Portfolio is here");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
