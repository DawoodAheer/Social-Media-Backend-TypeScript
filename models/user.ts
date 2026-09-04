import mongoose from "mongoose";
const mongodb = require("mongodb");
 
interface IUser {
    name:string,
    email:string,
    adress:string,
    password:string,
    role: "admin" | "user",
    createdAt?: Date;
}


const userSchema= new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
       type: String,
       required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        enum:["user", "admin"],
         default: "user"

    },
    adress:String
});
module.exports=mongoose.model<IUser>('user',userSchema)