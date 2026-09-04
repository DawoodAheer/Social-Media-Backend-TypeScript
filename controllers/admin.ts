import { Request, Response } from "express";
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const logger = require("../logger/log");


// deleted user by admin 
    const deleteUserbyAdmin= async (req: Request,res: Response)=>{
         try{
            const user= await User.findById(req.userId)
            const deleteduser=await User.findByIdAndDelete({_id:req.params.userId});
            if(!deleteduser){
                console.log("User not present in DB", deleteduser);
                return res.status(404).send("user not found");
    
            }
            const Delete=await User.findById(req.userId);
            console.log( `Admin :  ${Delete.name} =>  Deleted the user`, );
            logger(`Admin :  ${Delete.name} => Delete the user `)
            return res.status(200).send({message:"User deleted Successfully", deleteduser})
            } catch(err){
                res.status(500).send({message:"error while deleting the user / user not deleted ",err});
                 console.log("error at deleting the user by admin ",err);
            }
        }

// deleted post by admin
 const deletedpostbyAdmin= async (req:Request,res: Response)=>{
         try{
            const user=await User.findById(req.userId)
            const deletedpost =await Post.findByIdAndDelete({_id:req.params.postId});
            if(!deletedpost){
                console.log("post not present in DB", deletedpost);
                return res.status(404).send("post not found");
    
            }
            console.log(`Admin: ${user.name} Deleted the post =>   ${deletedpost.title}`)
            logger(`Admin: ${user.name} delete the post =>  ${deletedpost.title}`)
            res.status(200).send({message:"post deleted Successfully", deletedpost})
            } catch(err){
                res.status(500).send({message:"error while deleting the post/ post not deleted "});
                 console.log("error at deleting the post by admin ",err);
            }
        }
// deleted comment 

const deletedcommentbyAdmin = async (req: Request, res:Response) => {
    try {
        const user=await User.findById(req.userId)
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).send("Post not found");
        }
    
        let commentIndex = -1;
        for (let i = 0; i < post.comment.length; i++) {
            if (post.comment[i]._id.toString() === req.params.commentId) {
                commentIndex = i;
                break;
            }
        }
        if (commentIndex === -1) {
            return res.status(404).send("Comment not found");
        }
        post.comment.splice(commentIndex, 1);
        post.totalComment = post.comment.length;
        console.log(`Admin: ${user.name} and  id is : ${user._id} => deleted comment`);
        logger(`Admin: ${user.name} and id is : ${user._id} =>  deleted comment` );
        await post.save();
        return res.status(200).send({
            message: "Comment deleted successfully"
        });
    } catch (err) {

        console.log("Error at deleting comment by admin:", err);

        res.status(500).send({
            message: "Error while deleting the comment"
        });

    }
};
// admin view users 
const getAllUsersByAdmin = async (req:Request, res: Response) => {
    try {
        const users = await User.find();
        const user = await User.findById(req.userId)
        console.log(`Admin: ${user.name} => has viewed all the users: ${users.length}`);
        logger(`Admin: ${user.name} =>  has viewed all the users : ${users.length}`);
        return res.status(200).send({
            message: "All users fetched successfully",users});
    } catch (err) {
        console.log("Error while fetching users by admin", err);
        res.status(500).send({
            message: "Error while fetching users"
        });
    }
};
// admin can vew 
const getAllPostsByAdmin = async (req:Request, res: Response) => {
    try {
        const user= await User.findById(req.userId);
        const post = await Post.find();
        console.log(`Admin:: ${user.name} has viewed all the post: ${post.length}`);
        logger(`Admin:: ${user.name} has viewed all the post: ${post.length}`)
        return res.status(200).send({message: "All posts fetched successfully",post});
}catch(err){
        console.log("Error while fetching posts by admin", err);
        res.status(500).send({message: "Error while fetching posts"});
    }
};

module.exports={deleteUserbyAdmin, deletedpostbyAdmin, deletedcommentbyAdmin,getAllUsersByAdmin,getAllPostsByAdmin};