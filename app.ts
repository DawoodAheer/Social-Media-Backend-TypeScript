require("dotenv").config();
import { Request,Response } from "express";
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const mongodb=require('mongodb');

app.use(express.json());
// user Routes 
const userRoutes = require("./routes/user");
app.use("/", userRoutes);
//post Routes 
const postRoutes = require("./routes/post");
app.use("/", postRoutes);
//comment Routes 
const commentRoutes=require("./routes/comment");
app.use("/", commentRoutes);
//like Routes 
const likeRoutes=require("./routes/like");
app.use("/", likeRoutes);
//share Routes 
const shareRoutes=require("./routes/share");
app.use("/", shareRoutes);
// const postRoutes= require('./routes/post');
const adminRoutes=require('./routes/admin');
app.use("/admin", adminRoutes);

mongoose.connect("mongodb://localhost:27017/SocialMedia")
.then( () => console.log("connected Successfully to DB"))
.catch((err:Error) => console.log(err));

app.get('/', (req:Request, res:Response) =>{
    console.log('we are creating something');
    res.status(200).send("Post created Successfully");
})


app.listen(3000);