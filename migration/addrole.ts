import mongoose from "mongoose";

const User = require('../models/user');


const migration= async() =>{
   try {
    await mongoose.connect('mongodb://localhost:27017/SocialMedia');
    const result = await User.updateMany(
    { role: { $exists: false } },
    { $set: { role: "user" } }
);
console.log(result);
    
    console.log("Conneted Successfully migrations");
    await mongoose.connection.close();
   } catch (err) {
    console.log("migration error", err);
   }
};
migration();