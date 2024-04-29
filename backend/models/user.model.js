import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName:{
            type: String,
            required: true,
        },
        userName:{
            type: String,
            required: true,
            unique: true, //không trùng lặp
        },
        passWord:{
            type: String,
            required: true,
            minlenght: 6,
        },
        gender:{
            type:String,
            required: true,
            enum: ["male", "female"],
        },
        profilePic:{
            type:String,
            default:"",
        },
        //CreateAt, UpdateAt => Member since <createAt>
    }, 
    {timestamps:true} 
);

const User = mongoose.model("User", userSchema);

export default User;