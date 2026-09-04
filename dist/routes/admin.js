"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//dawood
const authmiddleware = require('../middleware/authmiddleware');
const authorization = require('../middleware/authorization');
const { deleteUserbyAdmin, deletedpostbyAdmin, deletedcommentbyAdmin, getAllUsersByAdmin, getAllPostsByAdmin } = require('../controllers/admin');
router.delete('/userdeleted/:userId', authmiddleware, authorization, deleteUserbyAdmin);
router.delete('/postdeleted/:postId', authmiddleware, authorization, deletedpostbyAdmin);
router.delete('/commentdeleted/:postId/:commentId', authmiddleware, authorization, deletedcommentbyAdmin);
router.get('/getuser', authmiddleware, authorization, getAllUsersByAdmin);
router.get('/getpost', authmiddleware, authorization, getAllPostsByAdmin);
const { RegisterController, LoginController } = require('../controllers/user');
router.post('/registered', RegisterController);
router.post('/login', LoginController);
const { createpost, readpost, updatepost, deletepost } = require('../controllers/post');
// // Admin delete and Register
// router.post('/registerd', RegisterController);
// router.delete('/deleted/:userId', authmiddleware, deleteuser);
// // Admin perform CRUD operations
router.post('/created', authmiddleware, createpost);
router.get('/geted', authmiddleware, readpost);
router.patch('/uptodated/:postId', authmiddleware, updatepost);
router.delete('/deletedd/:postId', authmiddleware, deletepost);
module.exports = router;
