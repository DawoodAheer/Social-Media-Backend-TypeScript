import mongoose from "mongoose"; 
const like = require("./like");
const share = require("./share");

interface ILike {
    user:mongoose.Types.ObjectId,
    createdAt?: Date;
}
interface IComment {
    user:mongoose.Types.ObjectId,
    text:string,
    createdAt?: Date;
}
interface IShare {
    user:mongoose.Types.ObjectId,
    createdAt?: Date;
}

interface IPost {
    user:mongoose.Types.ObjectId,
    title:string,
    description:string,
    createdAt?: Date,
    image?:string,
    location:string,
    like:ILike[],
    comment:IComment[],
    share:IShare[],
    totallike:number,
    totalComment:number,
    totalshare:number;
}

const postSchema = new mongoose.Schema<IPost>({

    user: {
        type: mongoose.Schema.Types.ObjectId,
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
                type: mongoose.Schema.Types.ObjectId,
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
                type: mongoose.Schema.Types.ObjectId,
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
                type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model<IPost>("post", postSchema);