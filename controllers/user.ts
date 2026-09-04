import { Request, Response } from "express";

const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const logger = require('../logger/log')

const RegisterController= async (req: Request, res: Response): Promise<Response> =>{
    try {
    const {name , email,  password,adress}=req.body;
    if(!name || !email || !password || !adress){
        console.log("All info must bee filled ");
       return res.status(400).send({message:" All field are required for the registration"});
    }
    const existingUser= await User.findOne({ email })
    if(existingUser){
        console.log("User exist in the DB");
       return res.status(409).send({message:" user is present in the database"});
    }
    const hashed=await bcrypt.hash(password, 10)
    const newuser=new User({
        name,
        email,
        password:hashed,
        adress
    });
    await newuser.save()
    logger("User is Registered ", `${email}`);
       return res.status(201).send({message:"User is Successfully registered", newuser});
    }
   catch(err){
    console.log("User not Registered");
     return res.status(501).send({message:"Eror in registration"});
   }
}
//Login controller 
const LoginController = async (req: Request ,res: Response ) => {
    try {
         console.log("REQ BODY:", req.body);

        const {email ,password } =req.body;
        if(!email || !password){
            console.log("Email and password required ");
            return res.status(400).send({message:" All field are required "});
        }
        const user = await User.findOne({ email })
        if(!user){
            console.log("No user found in Db");
            return res.status(404).send({message:"No user found  "});
        
        }
        const isPresent= await bcrypt.compare(password, user.password);
        if(!isPresent) {
        return res.status(401).send({message:"Email or password are incorrect ! Try again "});
        };
    
         const token = jwt.sign(
            {id: user._id,email: user.email,role:user.role},
              process.env.SECRET_KEY, 
            {expiresIn: "50m" });
            console.log("Token is ", token)
            console.log(`User Successfully Login, ${user.email}`)
        
           return res.status(200).send({message:"Successfully Login  ", token});
           

} catch(err){
        console.log("can't loged in",err);
        return res.status(500).send({message: "Error in loged in check it "})
    }
}

// delete User
const deleteuser= async (req: Request ,res:Response)=>{
     try{
        const user = await User.findById(req.userId);
        const deleteduser=await User.findByIdAndDelete({_id:req.params.userId});
        if(!deleteduser){
            console.log("User not present in DB", deleteduser);
            return res.status(404).send("user not found");

        }
        console.log(` ${user.role}: ${user.name} => deleted userId: ${deleteduser._id}`);
        logger(` ${user.role}: ${user.name} => deleted userId ${deleteduser._id}`);
        res.status(200).send({message:"User deleted Successfully", deleteduser})
        } catch(err){
            res.status(500).send({message:"error while deleting the user / user not deleted "});
             console.log("we are going to deleted user from our DB",err);
        }
    }

    module.exports = {RegisterController,LoginController,deleteuser};