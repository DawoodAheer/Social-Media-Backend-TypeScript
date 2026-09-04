const mongodb = require("mongodb");
import mongoose from "mongoose";

interface IShare{
   user:mongoose.Types.ObjectId,
   post:mongoose.Types.ObjectId,
   share:number,
   createdAt: Date;
}


const shareSchema= new mongoose.Schema<IShare>({
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
   share:{
    type: Number,
    default: 0
},
   createdAt:{
    type:Date,
    default:Date.now
   }
})
module.exports=mongoose.model<IShare>('share',shareSchema)

