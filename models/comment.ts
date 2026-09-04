const mongodb = require("mongodb");
import mongoose from "mongoose";

interface IComment{
   user:mongoose.Types.ObjectId,
   post:mongoose.Types.ObjectId,
   Comment:number,
   text:string,
   createdAt?: Date

}

const commentSchema=new mongoose.Schema<IComment>({
   user:{
    type: mongoose.Schema.Types.ObjectId,
     ref:"user",
    required:true
   },
  post:{
    type: mongoose.Schema.Types.ObjectId,
     ref:"post",
    required:true
   },
   Comment: {
    type: Number,
    default: 0
},
   text:String,
   createdAt:{
    type:Date,
    default:Date.now
   }
});
module.exports=mongoose.model<IComment>('comment',commentSchema)