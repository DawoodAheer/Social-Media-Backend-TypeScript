"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const authmiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        console.log("token is", token);
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
            req.role = user.role;
        }
        else {
            return res.status(402).send({ message: "User Unaurthorized" });
        }
        next();
    }
    catch (err) {
        console.log("error in token Verification ", err);
        return res.status(502).send({ message: "Unauthorizeed user" });
    }
};
module.exports = authmiddleware;
