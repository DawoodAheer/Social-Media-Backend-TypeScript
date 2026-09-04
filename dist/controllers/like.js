"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require("../logger/log");
const Post = require("../models/post");
const User = require('../models/user');
// Like Post
const likepost = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const { postId } = req.params;
        console.log("post ID is : ", postId);
        const postexist = await Post.findById(postId);
        if (!postexist) {
            return res.status(404).send({
                message: "Post not found"
            });
        }
        for (let i = 0; i < postexist.like.length; i++) {
            if (postexist.like[i].user.toString() === req.userId) {
                return res.status(400).send({
                    message: "You already liked this post"
                });
            }
        }
        const newlike = {
            user: req.userId,
            createdAt: new Date()
        };
        postexist.like.push(newlike);
        postexist.totallike += 1;
        await postexist.save();
        console.log(`${user.email} : liked the post `);
        logger(`${user.email} : liked the post`);
        return res.status(200).send({
            message: "Post liked successfully",
            like: newlike,
            totallike: postexist.totallike
        });
    }
    catch (err) {
        console.log("Error while liking post:", err);
        return res.status(500).send({
            message: "Can't like post"
        });
    }
};
// Unlike Post
const unlikepost = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const { postId, likeId } = req.params;
        const postexist = await Post.findById(postId);
        if (!postexist) {
            return res.status(404).send({
                message: "Post not found"
            });
        }
        const likeexist = postexist.like.id(likeId);
        if (!likeexist) {
            return res.status(404).send({
                message: "Like not found"
            });
        }
        likeexist.deleteOne();
        postexist.totallike -= 1;
        await postexist.save();
        console.log(`${user.name} : unliked the post `);
        logger(`${user.name} : unliked the post`);
        return res.status(200).send({
            message: "Post unliked successfully",
            totallike: postexist.totallike
        });
    }
    catch (err) {
        console.log("Error while unliking post:", err);
        return res.status(500).send({
            message: "Error while unliking post"
        });
    }
};
module.exports = {
    likepost,
    unlikepost
};
