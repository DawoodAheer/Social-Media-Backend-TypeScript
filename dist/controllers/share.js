"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require("../logger/log");
const Post = require("../models/post");
const User = require('../models/user');
// Create Share
const sharecontroller = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const { postId } = req.params;
        if (!postId) {
            return res.status(400).send({ message: "Post ID is required" });
        }
        const postexist = await Post.findById(postId);
        if (!postexist) {
            return res.status(404).send({ message: "Post not found" });
        }
        const newshare = {
            user: req.userId,
            createdAt: new Date()
        };
        postexist.share.push(newshare);
        postexist.totalshare += 1;
        await postexist.save();
        console.log(`${user.role}:  ${user.name}:  Shared post is: ${postId}`);
        logger(`${user.role}:  ${user.name}: Shared post is: ${postId}`);
        return res.status(200).send({ message: "Post shared successfully",
            share: newshare,
            totalshare: postexist.totalshare
        });
    }
    catch (error) {
        console.log("Error while sharing post:", error);
        return res.status(500).send({
            message: "Can't share post"
        });
    }
};
// Unshare 
const unsharecontroller = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const { postId, shareId } = req.params;
        const postexist = await Post.findById(postId);
        if (!postexist) {
            return res.status(404).send({
                message: "Post not found"
            });
        }
        const shareexist = postexist.share.id(shareId);
        if (!shareexist) {
            return res.status(404).send({
                message: "share not found"
            });
        }
        shareexist.deleteOne();
        postexist.totalshare -= 1;
        await postexist.save();
        console.log("unshare post by:", `${user.name}`);
        logger(`unshare post by:${user.name}`);
        return res.status(200).send({
            message: "share delete successfully",
            totalshare: postexist.totalshare
        });
    }
    catch (err) {
        console.log("Error while unliking post:", err);
        return res.status(500).send({
            message: "Error while unliking post"
        });
    }
};
module.exports = { sharecontroller, unsharecontroller };
