const router = require("express").Router();
const { Blog, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        // Get all blogs
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ["userName"],
                },
            ],
        });

        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render("homepage", {
            blogs,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        // Find all blogs by the logged-in user
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [{ model: User, attributes: ["userName"] }],
        });

        console.log("Welcome to dashboard");

        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render("dashboard", {
            blogs,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect("dashboard");
        return;
    }

    res.render("login");
});

// add data for new user
router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("dashboard");
        return;
    }

    res.render("signup");
});

// to add a new blog
router.get("/newBlog", withAuth, (req, res) => {
    res.render("newblog", {
        logged_in: req.session.logged_in,
    });
});

// to get to the blog page
router.get("/blog/:id", withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            where: {
                user_id: req.session.user_id,
            },
            include: [{ model: User, attributes: ["userName"] }],
        });

        const blog = blogData.get({ plain: true });

        res.render("blog", {
            blog,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
