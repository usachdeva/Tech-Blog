const router = require("express").Router();
const { Blog, User } = require("../../models");

// add data for new user
router.post("/signup", async (req, res) => {
    try {
        const userData = await User.create({
            userName: req.body.userName,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// login the right user
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { userName: req.body.userName },
        });

        if (!userData) {
            res.status(400).json({
                message: "Incorrect username, please try again",
            });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: "Incorrect password, please try again",
            });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// for user logout
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
