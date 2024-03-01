const axios = require("axios");
const {getLeetCount , getLeetRating, getLeetcodeBadges} = require('../utils/LeetcodeFun');


const getLcCount = async (req,res) =>{
    
    try{
        const username = req.user.leetcode;
        const submitStats = await getLeetCount(username);
        if(username === "unknown"){
            return res.status(404).json({message:true,message:"No data from Leetcode Api"})
        }
        if(submitStats.length === 0){
            return res.status(404).json({message:true,message:"No data from Leetcode Api"})
        }
        return res.status(200).json({error:false,message:submitStats.message});
    }catch(err){
        return res.status(500).json({error:true,message:"Error occurred while fetching the data from the leetcode api"})
    }
}


const getLcRating =async (req,res) =>{
    
    try{
        const username = req.user.leetcode;
        var submitStats =await getLeetRating(username);
        if(username === "unknown"){
            return res.status(404).json({error:true,message:'Username not found or network problem'})
        }
        if(submitStats.error){
            return res.status(404).json({error:true,message:'Username not found or network problem'})
        }
        const attendContest = submitStats.message[1].filter((data)=>{
             if(data.attended)return true;
             else return false;
        })
        return res.status(200).json({error:false,message:attendContest});
    }
    catch(err){
        return res.status(500).json({error:true,message:err.message});
    }
}


const checkLcUsername = async (req,res) =>{
    
    try{
        const username = req.body.username;
        const submitStats = await getLeetCount(username);
        if(submitStats.error){
            return res.status(404).json({error:true})
        }
        return res.status(200).json({error:false})
    }catch(err){
        return res.status(500).json({error:true,message:"Error occurred while fetching the data from the leetcode api"})
    }
}


const  getLeetcodeBatch = async (req,res) =>{
    
    try{
        const leetcode = req.user.leetcode;
        const response = await getLeetcodeBadges(leetcode)
        userBadges = [];
        response.badges.map((badge)=>{
            userBadges.push({
                shortname: badge.shortName,
                icon: badge.icon
            })
        })
        if(userBadges.length() === 0){
            return res.status(200).json({error:false, message: "user dont have badges"})
        }
        return  res.status(200).json({error:false,message: userBadges});
        // 200 success
    }   
    catch(err){
        return res.status(504).json({error:true,message:err.message});
        // 504 This error response is given when the server is acting as a gateway and cannot get a response in time.
    }
}


module.exports = {
    getLcCount,getLcRating,checkLcUsername , getLeetcodeBatch
}
