import express from "express";
const jwt=require('jsonwebtoken');
const router = express.Router();

const authmiddleware = require("../middleware/authmiddleware");
const {createcomment, deletecomment,getcomment } = require('../controllers/comment');
;
router.post('/comment/:postId',authmiddleware, createcomment);

router.delete('/deletecomment/:postId/:commentId', authmiddleware,  deletecomment);


router.get('/get/:postId',authmiddleware, getcomment);
module.exports=router;
