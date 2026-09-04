import express from "express";
const router = express.Router();

const authmiddleware = require("../middleware/authmiddleware");
const {likepost,unlikepost} = require('../controllers/like');

router.post('/like/:postId', authmiddleware ,likepost);

router.delete('/unlike/:postId/:likeId', authmiddleware,unlikepost);

module.exports=router;