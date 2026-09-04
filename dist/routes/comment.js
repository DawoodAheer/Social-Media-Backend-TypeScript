"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt = require('jsonwebtoken');
const router = express_1.default.Router();
const authmiddleware = require("../middleware/authmiddleware");
const { createcomment, deletecomment, getcomment } = require('../controllers/comment');
;
router.post('/comment/:postId', authmiddleware, createcomment);
router.delete('/deletecomment/:postId/:commentId', authmiddleware, deletecomment);
router.get('/get/:postId', authmiddleware, getcomment);
module.exports = router;
