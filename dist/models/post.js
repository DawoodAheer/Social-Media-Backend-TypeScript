"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const like = require("./like");
const share = require("./share");
const postSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    location: {
        type: String
    },
    like: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "user",
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    totallike: {
        type: Number,
        default: 0
    },
    comment: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "user",
                required: true
            },
            text: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    totalComment: {
        type: Number,
        default: 0
    },
    share: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "user",
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    totalshare: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose_1.default.model("post", postSchema);
