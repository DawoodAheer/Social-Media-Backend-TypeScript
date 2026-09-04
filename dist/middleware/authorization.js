"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/user');
const authorization = async (req, res, next) => {
    try {
        console.log(req.role);
        if (!req.role) {
            console.log("Role not found");
            return res.status(404).send({ message: 'Role not found' });
        }
        if (req.role !== "admin") {
            return res.status(403).send("Only admin can perform this action");
        }
        next();
    }
    catch (err) {
        console.log("Error while checking admin role", err);
        return res.status(500).send({ message: "Error while checking admin role" });
    }
};
module.exports = authorization;
