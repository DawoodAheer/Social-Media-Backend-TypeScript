import mongoose from "mongoose"; 
const bcrypt = require("bcrypt");
const User = require("./user");

interface SeedUsers{
 name:string,
 email:string,
 adress:string,
 password:string,
 role: "admin" | "user";
}

const users:SeedUsers[] = [
    {
        name: "Dawood Aheer",
        email: "aheerdawood014@gmail.com",
        adress: "Lahore Johar Town",
        password: "dawood123",
        role: "admin"
    },
    {
        name: "Zain",
        email: "zain@gmail.com",
        adress: "Wapda Town ",
        password: "zain123",
        role: "admin"
    },
    {
        name:"Faizan Arif",
        email:"faizan@gmail.com",
        adress: "Pia Road",
        password: "faizan123",
        role: "user"
    },
    {
     name: "Ali Marjan",
     email: "marjan@gmail.com",
     adress: "Girote",
      password: "marjan123",
     role: "user"
    }
];
const SeedUsers = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/SocialMedia");
        console.log("Connected to MongoDB through seed");

         for (const user of users) {

            const userexist = await User.findOne({email: user.email});
            if (userexist) {
                console.log(`User already exists: ${user.email}`);
                continue;
            }
            const hashedpassword = await bcrypt.hash(user.password, 10);
            await User.create({
                name: user.name,
                email: user.email,
                password: hashedpassword,
                adress: user.adress,
                role: user.role
            });
            console.log(`User created: ${user.email}`);
        }
        console.log("Users created successfully");
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    } catch (err) {
        console.log("Error while seeding", err);
    }
};
SeedUsers();