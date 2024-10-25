const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const Blog = require('./models/blogModel'); 

// const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes

// GET: Fetch all blogs
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

// POST: Create a new blog
app.post('/api/blogs', async (req, res) => {
    const { title, tags, content, coverImage } = req.body;

    try {
        const newBlog = new Blog({ title, tags, content, coverImage });
        await newBlog.save();
        res.status(201).json({ message: 'Blog created successfully', data: newBlog });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Failed to create blog' });
    }
});

app.get('/api/blogs/:id', async (req, res) => {
    const { id } = req.params;

    console.log(id);
    try {
        const blog = await Blog.findById(id);

        console.log(blog);
        // if (!blog) {
        //     return res.status(404).json({ error: 'Blog not found' });
        // }
        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
});


// GET: Fetch all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// POST: Create a new project
app.post('/api/projects', async (req, res) => {
    const { id, title, des, img, iconLists, link } = req.body;

    try {
        const newProject = new Project({ id, title, des, img, iconLists, link });
        await newProject.save();
        res.status(201).json({ message: 'Project created successfully', data: newProject });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
