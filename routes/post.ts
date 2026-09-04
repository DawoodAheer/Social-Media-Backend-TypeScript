import express from "express";
const mongoose=require("mongoose");
const router=express.Router()
// const authmiddleware=require("../middleware/authmiddleware");

const {createpost, readpost, updatepost, deletepost}=require("../controllers/post");
const authmiddleware = require('../middleware/authmiddleware');

router.post("/create" ,authmiddleware,  createpost);

router.get('/view',authmiddleware,  readpost);

router.patch('/:postId', authmiddleware,  updatepost);

router.delete('/delete/:postId', authmiddleware, deletepost);

module.exports = router;