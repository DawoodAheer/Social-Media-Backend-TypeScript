"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const shareSchema = new mongoose_1.default.Schema({
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
    share: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose_1.default.model('share', shareSchema);
