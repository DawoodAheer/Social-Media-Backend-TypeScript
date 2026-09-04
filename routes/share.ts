import express from "express";
const jwt = require('jsonwebtoken');

const router = express.Router();


const authmiddleware = require("../middleware/authmiddleware");

const {sharecontroller, unsharecontroller} = require('../controllers/share');


router.post('/share/:postId', authmiddleware , sharecontroller);

router.delete('/unshare/:postId/:shareId', authmiddleware , unsharecontroller);

module.exports=router;