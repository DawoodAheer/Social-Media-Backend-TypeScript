"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt = require('jsonwebtoken');
const router = express_1.default.Router();
const authmiddleware = require("../middleware/authmiddleware");
const { sharecontroller, unsharecontroller } = require('../controllers/share');
router.post('/share/:postId', authmiddleware, sharecontroller);
router.delete('/unshare/:postId/:shareId', authmiddleware, unsharecontroller);
module.exports = router;
