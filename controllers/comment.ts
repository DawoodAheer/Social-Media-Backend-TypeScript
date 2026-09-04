import {Request ,Response} from "express";
const logger = require("../logger/log");
const comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");

// Create Comment
const createcomment = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).send({
                message: "Comment is required"
            });
        }
        const user=await User.findById(req.userId)
        const postexist = await Post.findById(req.params.postId);
        if (!postexist) {
            return res.status(404).send({
                message: "Post not found"
            });
        }
        const newcomment = {
            user: req.userId,
            text: text,
            createdAt: new Date()
        };
        postexist.comment.push(newcomment);
        postexist.totalComment += 1;
        await postexist.save();
        console.log(`Admin : ${user.name} Comment is: ${newcomment.text} `);
        logger(` ${user.name} Comment is: ${newcomment.text}`)
        return res.status(200).send({
            message: "Comment added successfully",
            comment: newcomment,
            totalComment: postexist.totalComment
        });

    } catch (err) {
        console.log("Error while commenting:", err);
        return res.status(500).send({
            message: "Can't comment"
        });
    }
};
// Get Comments
const getcomment = async (req: Request , res: Response) => {
    try {
        const user=await User.findById(req.userId);
        const postexist = await Post.findById(req.params.postId)
        if (!postexist) {
            return res.status(404).send({
                message: "Post not found"
            });
        }
        console.log(` ${user.name} with ${user.email } Comment length: ${comment.length} `);
        logger(` ${user.name} with ${user.email } Comment lenght: ${comment.length}`)
        
        return res.status(200).send({
            totalComment: postexist.totalComment,
            comment: postexist.comment
        });

    } catch (err) {

        console.log("Error while getting comments:", err);

        return res.status(500).send({
            message: "Can't get comments"
        });
    }
};
// Delete Comment
const deletecomment = async (req: Request, res: Response) => {

    try {
        const user=await User.findById(req.userId)
        const { postId, commentId } = req.params;
        const postexist = await Post.findById(postId);
        if (!postexist) {
            return res.status(404).send({
                message: "Post not found"});
        }

        const commentexist = postexist.comment.id(commentId);
        if (!commentexist) {
            return res.status(404).send({
                message: "Comment not found"
            });
        }

        const isCommentOwner =
            commentexist.user.toString() === req.userId;
        const isPostOwner =
            postexist.user.toString() === req.userId;
        if (!isCommentOwner && !isPostOwner) {
            return res.status(403).send({
                message: "You cannot delete this comment"});
        }
        commentexist.deleteOne();
        postexist.totalComment -= 1;
        await postexist.save();
        console.log(`${user.name} : delete the comment`);
         logger(`${user.name} : delete the comment `)
        return res.status(200).send({
            message: "Comment deleted successfully",
            totalComment: postexist.totalComment
        });
    } catch (err) {
        console.log("Error while deleting comment:", err);
        return res.status(500).send({message: "Error while deleting comment"});
    }
};
module.exports = {
    createcomment,
    getcomment,
    deletecomment
};