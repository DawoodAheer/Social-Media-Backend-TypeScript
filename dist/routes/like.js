"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authmiddleware = require("../middleware/authmiddleware");
const { likepost, unlikepost } = require('../controllers/like');
router.post('/like/:postId', authmiddleware, likepost);
router.delete('/unlike/:postId/:likeId', authmiddleware, unlikepost);
module.exports = router;
