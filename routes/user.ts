import { Request, Response } from "express";
const express=require('express');
const mongoose=require("mongoose");
const router=express.Router();

const { RegisterController,LoginController, deleteuser } = require("../controllers/user");
const authmiddleware = require('../middleware/authmiddleware');


router.post('/register', RegisterController );

router.post('/login', LoginController);


router.delete('/:userId',authmiddleware, deleteuser);

module.exports = router;