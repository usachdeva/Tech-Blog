const router = require("express").Router();
const { Blog, User } = require("../../models");
const withAuth = require("../../utils/auth");

// to get all the blogs
router.get("/", async (req, res) => {
    try {
        const blogData = await Blog.find({});
        res.status(200).json(blogData);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

// to get the single blog
router.get("/:blogId", async (req, res) => {
    try {
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

// to add new Blog
router.post("/", async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

// to update the blog

// to delete the blog
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const blog = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blog) {
            res.status(404).json({ message: "No blog found with this id!" });
            return;
        }

        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
