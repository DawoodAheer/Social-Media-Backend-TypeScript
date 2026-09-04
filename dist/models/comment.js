"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    post: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "post",
        required: true
    },
    Comment: {
        type: Number,
        default: 0
    },
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose_1.default.model('comment', commentSchema);
