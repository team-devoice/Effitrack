const axios = require("axios");
const {getLeetCount , getLeetRating, getLCBadges} = require('../utils/LeetcodeFun');
const { leetcodeModel } = require("../models/leetcodeModel");


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

const setLeetcodeData = async (req, res) => {
    const username = req.user.leetcode;
    try{
        const count_response = await getLeetCount(username)
        if(count_response.message.length === 0){
            return res.status(500).json({error:true, message:"the user didnt solve any problem yet"})
        }
        const TotalCount = count_response.message[0].count;
        const Easy = count_response.message[1].count;
        const Medium = count_response.message[2].count;
        const Hard = count_response.message[3].count;
        const rating_response = await getLeetRating(username)
        if(rating_response.message.length === 0){
            return res.status(500).json({error:true, message:"the user didnt attend any contest yet"})
        }
        const CurrentRating = rating_response.message[0].rating;
        const attendedContestCount = rating_response.message[0].attendedContestsCount;
        const topPercentage = rating_response.message[0].topPercentage;
        const globalRanking = rating_response.message[0].globalRanking;
        const badges = await getLCBadges(username);
        const data = {
            effitrack_username: req.user.username,
            leetcode_username : username,
            TotalCount,
            Easy,
            Medium,
            Hard,
            CurrentRating,
            attendedContestCount,
            topPercentage,
            globalRanking,
            badges
        }
        await leetcodeModel.updateOne({leetcode_username:username},data,{upsert:true},(err,doc)=>{
            if(err){
                return res.status(500).json({error:true, message:err.message})
            }
        })
        res.status(200).json({error:false, message: "lc data updated successfully"})
    }
    catch(error){
        res.status(504).json({error:true, message:error.message})
    }
}

const getLeetcodeData = async (req,res) =>{
    const username = req.user.leetcode;
    try{
        const doc = await leetcodeModel.findOne({leetcode_username:username});
        if(doc === null){
            return res.status(404).json({error:true,message:"user dont have leetcode data"})
        }
        return res.status(200).json({error:false,message:doc});
    }
    catch(err){
        return res.status(500).json({error:true,message:err.message});
    }
}

const  getLeetcodeBatch = async (req,res) =>{
    
    try{
        const leetcode = req.user.leetcode;
        const response = await getLCBadges(leetcode)
        if(response.length === 0){
            return res.status(500).json({error:true,message:"Error occurred while fetching the data from the leetcode api"})
        }
        userBadges = [];
        response.badges.map((badge)=>{
            userBadges.push({
                shortname: badge.shortName,
                icon: badge.icon
            })
        })
        if(userBadges.length === 0){
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
    getLcCount,getLcRating,checkLcUsername , getLeetcodeBatch, setLeetcodeData, getLeetcodeData
}
