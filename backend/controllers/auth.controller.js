import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const {fullName, userName, passWord, confirmPassword, gender } = req.body;

        if (passWord !== confirmPassword) {
            return res.status(400).json({error:"PassWord don't match"});
        }

        const user = await User.findOne({userName});

        if (user) {
            return res.status(400).json({error:"Username already exists"});
        }

        //HASE PASSWORD HERE
        const salt  = await bcrypt.genSalt(10); // mã hóa password
        const hashedPassword = await bcrypt.hash(passWord, salt);

        // https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            passWord: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic 
        });

        if (newUser) {
            //generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            });
        }
        else{
            res.status(400).json({error:"Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const login = (req, res) => {
    res.send("loginUser");
    console.log("loginUser");
};

export const logout = (req, res) => {
    res.send("logoutUser");
    console.log("logoutUser");
};
