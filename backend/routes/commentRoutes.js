const express = require("express");

const Comment = require("../models/Comment");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/:postId", auth, async (req, res) => {

    try {

        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const comment = await Comment.create({
            content: req.body.content,
            user: req.user.id,
            post: req.params.postId
        });

        const result = await comment.populate(
            "user",
            "name"
        );

        res.status(201).json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});
router.get("/:postId", async (req, res) => {

    try {

        const comments = await Comment.find({
            post: req.params.postId
        })
        .populate("user", "name")
        .sort({ createdAt: -1 });

        res.json(comments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});
module.exports = router;