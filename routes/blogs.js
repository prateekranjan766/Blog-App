const express = require("express");
const auth = require("../middleware/auth");
const Blog = require("./../models/Blog");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// @route           GET /api/blogs
// @description     Get all blogs
// @access          Private
router.get("/", auth, async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           GET /api/blogs/my-blogs
// @description     Get all the user blogs
// @access          Private
router.get("/my-blogs", auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           POST /api/blogs
// @description     Add a new blog
// @access          Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("data", "data is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
    }

    const { title, description, data } = req.body;

    try {
      const newBlog = new Blog({
        title,
        description,
        data,
        user: req.user.id,
      });

      const blog = await newBlog.save();
      res.send(blog);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route           PUT /api/blogs/:id
// @description     Update blog
// @access          Private
router.put("/:id", auth, async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated Successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           DELETE /api/blogs/:id
// @description     DELETE blog
// @access          Private
router.delete("/:id", auth, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.send("Successfully Deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
