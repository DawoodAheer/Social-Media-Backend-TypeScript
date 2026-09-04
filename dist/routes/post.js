"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const router = express_1.default.Router();
// const authmiddleware=require("../middleware/authmiddleware");
const { createpost, readpost, updatepost, deletepost } = require("../controllers/post");
const authmiddleware = require('../middleware/authmiddleware');
router.post("/create", authmiddleware, createpost);
router.get('/view', authmiddleware, readpost);
router.patch('/:postId', authmiddleware, updatepost);
router.delete('/delete/:postId', authmiddleware, deletepost);
module.exports = router;
