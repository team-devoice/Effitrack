const {userModel} = require("../models/userSchema");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {signupbodyValidation,loginbodyValidation} = require('../utils/validationSchema');
const {generateTokens} = require("../utils/generateToken");
const { userToken } = require("../models/userToken");
const OTP = require("../models/otpModel")
const emailSender = require("../utils/emailSender");
const userAddModel = require("../models/userAddModel");
const { setLeetcodeDataHelper } = require("./leetcodeControllers");
const { setCfDataHelper } = require("./codeForcesControllers");
const { setCodeChefDataHelper } = require("./codechefControllers");

const getUserByFilter = async(req, res) =>{
    const filterrole = req.body.filterrole;
    try{
        if(filterrole.length === 0){
            const docs = await userAddModel.find().sort({effiscore: -1}).limit(10);
            console.log(docs)
            return res.status(200).json({error:false,message:docs});
        }
        console.log(filterrole)
        const doc = await userAddModel.find({role:{ $in: filterrole }});
        console.log(doc)
        return res.status(200).json({error:false,message:doc});
    }
    catch(err){
        return res.status(400).json({error:true, message:err.message})
    }
}

const getTheePlatformRating = async (req) =>{
    try{
        const leetCodeData = await setLeetcodeDataHelper(req);
        const codeforcesData = await setCfDataHelper(req);
        const codeChefData = await setCodeChefDataHelper(req);
        const lcr = Number(leetCodeData.CurrentRating);
        const cfr = Number(codeforcesData.maxRating);
        const ccr = Number(codeChefData.highestRating);
        let effiscore = 0;
        if (lcr) {
            effiscore += lcr;
        }
        if (cfr) {
            effiscore += cfr;
        }
        if (ccr) {
            effiscore += ccr;
        }
        console.log("lcr:", lcr, "cfr:", cfr, "ccr:", ccr);
        return Number(Math.trunc(effiscore/10));
    }
    catch(err){
        return err;
    }

}


const getUserByRanking = async (req, res) => {
    try{
        const docs = await userAddModel.find().sort({effiscore: -1}).limit(10);
        console.log(docs)
        res.status(200).json({error:false,message:docs});
    }
    catch(err){
        res.status(400).json({error:true,message:err.message});
    }
}

// const getUserByRanking = async (req, res) => {
//     try {
//         const docs = await userModel.aggregate([
//             {
//                 $lookup: {
//                     from: 'useradds',
//                     localField: 'username',
//                     foreignField: 'username',
//                     as: 'userAdditional'
//                 }
//             },
//             {
//                 $unwind: '$userAdditional'
//             },
//             {
//                 $sort: {
//                     'userAdditional.effiscore': -1 // Sort by effiscore descending
//                 }
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     username: 1,
//                     email: 1,
//                     // Include other fields from the User schema as needed
//                     effiscore: '$userAdditional.effiscore' // Include effiscore from userAddModel
//                 }
//             }
//         ]);

//         if (docs.length === 0) {
//             return res.status(404).json({ error: true, message: "No users found" });
//         }

//         console.log(docs)

//         return res.status(200).json({ error: false, message: docs });
//     } catch (err) {
//         return res.status(400).json({ error: true, message: err.message });
//     }
// }



const SetUserRanking = async(req,res)=>{
    const effiscore = await getTheePlatformRating(req);
    try{
        const doc = await userAddModel.updateOne({username: req.user.username}, {$set: {effiscore}}, {upsert:true});
        const users = await await userAddModel.find().sort({effiscore: -1}).limit(10);
        res.status(200).json({error:false, message:users})
    }
    catch(err){
        res.status(406).json({error:true, message:err.message})
    }
}

const register = async (req,res) =>{

    try{
        var {username,password,email,otp} = req.body;
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

        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0 || otp !== response[0].otp) {
            return res.status(400).json({
                error: true,
                message: 'The OTP is not valid',
            });
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

const checkUserExist = async (req,res) =>{
    const username = req.body.username;
    try{
        const user = await userModel.findOne({username:username});
        if(user){
            return res.status(406).json({error:true,message:"Username already exists"});
        }
        return res.status(200).json({error:false,message:"New user"});
    } catch(err){
        return res.status(409).json({error:true,message:"Internet Error"})
    }   
}   

const checkEmailExist =async (req, res) => {
    const email = req.body.email;
    try{
        const doc = await userModel.findOne({email:email});
        if(doc){
            return res.status(406).json({error:true,message:"Email already exists"});
        }
        return res.status(200).json({error:false,message:"Email user"});
    } catch(err){
        return res.status(409).json({error:true,message:"Internet Error"})
    }
}

module.exports = {
    register,login,getMe, logout , verifedUsername , checkUserExist , checkEmailExist, getUserByRanking, SetUserRanking, SetUserRanking, getTheePlatformRating, getUserByFilter
}





