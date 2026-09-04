"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const posts = require('../models/post');
const User = require('../models/user');
const logger = require('../logger/log');
// In this CRUD operations perform 
const createpost = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const { title, description, image, location } = req.body;
        const postcreated = new posts({
            user: req.userId,
            title: title,
            description: description,
            image: image,
            location: location
        });
        const savedpost = await postcreated.save();
        res.status(200).send({ message: "Post saved ", savedpost });
        console.log(`${user.role} name is ${user.name} create a post`);
        logger(`Role is ${user.role} name is: ${user.name} create a post`);
    }
    catch (err) {
        console.log("post can't save ", err);
        res.status(500).send({ message: "error while saving the post ", err });
    }
};
const readpost = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const viewpost = await posts.find();
        console.log(`${user.role}: name is ${user.name} => email is ${user.email} Get the all post `);
        logger(` ${user.role}: name is: ${user.name} => email is ${user.email}  Get all post`);
        return res.status(200).send({ message: "Get all post", posts: viewpost });
    }
    catch (err) {
        res.status(500).send({ message: "error in getting the post", err });
        console.log("there is some error in readPost/ getpost ", err);
    }
};
const updatepost = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const updatedpost = await posts.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title, location: req.body.location, image: req.body.image, description: req.body.description } });
        console.log(`Role is ${user.role} name is ${user.name} email is ${user.email} Updated  the post `);
        logger(`Role is ${user.role} name is: ${user.name} : email is ${user.email}  Updated  a post`);
        return res.status(200).send({ message: "Post updated Successfully", updatedpost });
    }
    catch (err) {
        res.status(500).send({ message: "error in updating the post", });
        console.log("there is some error in updating the psot kindly check it  ");
    }
};
const deletepost = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const deletedpost = await posts.findByIdAndDelete({ _id: req.params.postId });
        console.log(`${user.role}:  name is ${user.name} email is ${user.email} Deleted  the post `);
        logger(`${user.role} : name is: ${user.name} : email is ${user.email}  Deleted  the post`);
        return res.status(200).send({ message: "Post deleted Successfully", deletedpost });
    }
    catch (err) {
        res.status(500).send({ message: "error while deleting the post " });
        console.log("post deleted Successfully from DB", err);
    }
};
module.exports = { createpost, readpost, updatepost, deletepost };
