const {userModel} = require("../models/userSchema");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {signupbodyValidation,loginbodyValidation} = require('../utils/validationSchema');
const {generateTokens} = require("../utils/generateToken");
const { userToken } = require("../models/userToken");

const register = async (req,res) =>{

    try{
        var {username,password,email} = req.body;
        const {error} = signupbodyValidation(req.body);
        username = username.trim();
        if(error)   
            return res.status(406).json({error:true,message:error.details[0].message});

        const data = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
              ],
        });

        if(data){
            return res
                    .status(406)
                    .json({error:true,message:"Username or Email already registered"});
        }

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = new userModel({
            username: username,
            password:hashedPassword,
            email:email
        })

        await user.save();

        if(!user){
            return res
                .status(406)
                .json({error:true,message:"Invalid user data"});
        }

        const {accessToken} = await generateTokens(user);
        return res.status(201).json({error:false,message:{name:username,email:email,accessToken:accessToken}})  
        //  201 is for successful creation

    } catch(err){
        res.status(409).json({error:true,message:err.message});
    }
}


const login = async  (req,res) =>{
    
    try{
        const {username,password} = req.body;
        const user = await userModel.findOne({username:username});
        if(!user){
            return res
                .status(404)
                .json({error:true,message:"user not found"});
        }
        const verifiedPassword = await bcrypt.compare(password,user.password);
        if(!verifiedPassword){
            return res
                .status(401)
                .json({error:true,message:"Invalid password"});
        }
        const {accessToken} = await generateTokens(user);
        res.status(200).json({
            error:false,
            accessToken:accessToken,
            message:"Logged In Successfully",
        })

    }catch(e){
        return res.status(502).json({error:true,message:"Interval server error"});
    }
}

const getMe = async(req,res) =>{
    const user = await req.user;
    res.status(200).json({error:false,message:user})
}


// logout 
const logout = async(req,res) =>{

    try{
        const refreshToken = req.body.refreshToken;
        const token = await userToken.findOne({token:refreshToken});
        if(!userToken){
            return res
                    .status(200)
                    .json({error:false,message:"Logged out successfully"});
        }
        await userToken.deleteOne({token:refreshToken})
        res.status(200).json({error:false,message:"Logged out successfully"})
    }catch(err){
        res.status(500).json({error:true,message:"Interval Server Error"})
    }
}

const verifedUsername = async (req,res) =>{

    try{
        const {leetcode,codechef,codeforces,github} = req.body;
        const doc = await userModel.findOneAndUpdate(req.user,{leetcode,codeforces,codechef,github},{
            new:true,
        });
        if(!doc){
            return res.status(404).json({error:true,message:'Cant able to change the username'})
        }
        return res.status(200).json({error:false,message:'Successfully modified'});
        // The HTTP status code 204 No Content indicates that the server successfully processed the request, but there is no content to send in the response body. 
    } catch(err){
        return res.status(400).json({error:true,message:err.message})
    }
}

module.exports = {
    register,login,getMe, logout , verifedUsername
}





