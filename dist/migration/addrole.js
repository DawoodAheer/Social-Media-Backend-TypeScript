"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User = require('../models/user');
const migration = async () => {
    try {
        await mongoose_1.default.connect('mongodb://localhost:27017/SocialMedia');
        const result = await User.updateMany({ role: { $exists: false } }, { $set: { role: "user" } });
        console.log(result);
        console.log("Conneted Successfully migrations");
        await mongoose_1.default.connection.close();
    }
    catch (err) {
        console.log("migration error", err);
    }
};
migration();
