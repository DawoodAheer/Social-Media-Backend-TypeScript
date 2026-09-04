import mongoose from "mongoose";

interface ILike {
  user:mongoose.Types.ObjectId,
  post:mongoose.Types.ObjectId,
  createdAt?: Date;
}

const likeSchema = new  mongoose.Schema<ILike>({
//dawood code

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model<ILike>("like", likeSchema);