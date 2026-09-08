const express = require("express");

const Post = require("../models/Post");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {

    try {

        const { title, content } = req.body;

        const post = await Post.create({
            title,
            content,
            author: req.user.id
        });

        res.status(201).json(post);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


router.get("/", async (req, res) => {

    try {

        const posts = await Post.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json(posts);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});
router.get("/:id", async (req, res) => {

    try {

        const post = await Post.findById(req.params.id)
            .populate("author", "name email");

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.json(post);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});
router.put("/:id", auth, async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        post.title = req.body.title;
        post.content = req.body.content;

        await post.save();

        res.json(post);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});
router.delete("/:id", auth, async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        await post.deleteOne();

        res.json({
            message: "Post deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;