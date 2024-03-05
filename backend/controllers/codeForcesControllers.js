const { codeforceModel } = require("../models/codeFrocesModel");
const {getForceCount,getForceRating}  = require("../utils/CodeForceFun");

const setCfData = async (req, res) => {
    try {
        const username = req.user.codeforces;
        if(username === "unknown" || username === undefined || username === ""){
            return res.status(404).json({error:true,message:"No Codeforces Username Found"})
        }
        const response = await getForceCount(username);

        if(response.error){
            return res.status(404).json({error:true,message:response.message})
        }
        const effitrack_username = req.user.username;
        const cf_username = username;
        const current_rating = response.message[0].rating;
        const friendOfCount = response.message[0].friendOfCount;
        const contribution = response.message[0].contribution;
        const current_rank = response.message[0].rank;
        const maxRating = response.message[0].maxRating;
        const maxRank = response.message[0].maxRank;
        const contestData = await getForceRating(username);
        const contest = contestData.message;

        const data = {
            effitrack_username,
            cf_username : username,
            current_rating,
            friendOfCount,
            contribution,
            current_rank,
            maxRating,
            maxRank,
            contest
        }

        await codeforceModel.updateOne({cf_username: req.user.cf_username},{$set: data},{upsert:true},(err,doc)=>{
            if(err){
                return res.status(500).json({error:true,message:err.message})
            }
        });
        return res.status(200).json({error:false, message : "CFdata updated successfully"});
    } catch (err){
        return res.status(500).json({error:true,message:err.message})
    }
}

const getCfData = async (req,res) =>{
    try{
        const username = req.user.codeforces;
        if(username === "unknown" || username === undefined || username === ""){
            return res.status(404).json({error:true,message:"No Codeforces Username Found"})
        }
        const data = await codeforceModel.findOne({cf_username:username});
        if(data === null){
            return res.status(404).json({error:true,message:"no data available for this user"})
        }
        return res.status(200).json({error:false,message:data});
    } catch (err){
        return res.status(500).json({error:true,message:err.message})
    }
}

const getCFcount = async (req,res) =>{
    try{
        const username = req.user.codeforces;
        const response = await getForceCount(username);
        if(response.error || username === ""){
            return res.status(404).json({error:true,message:response.message})
        }
        return res.status(200).json({error:false,message:response.message});
    } catch (err){
        return res.status(500).json({error:true,message:err.message})
    }
}

const getCFrating = async (req,res) =>{
   
    try{
        const username = req.user.codeforces;
        const response = await getForceRating(username);
        if(response.error || username === ""){
            return res.status(404).json({error:true,message:response.message})
        }
        return res.status(200).json({error:false,message:response.message});
    } catch (err){
        return res.status(500).json({error:true,message:err.message})
    }
}

const checkCfUsername = async (req,res) =>{
    
    try{
        const username = req.body.username;
       const response = await getForceCount(username);
        if(response.error){
            return res.status(404).json({error:true,message:response.message})
        }
        return res.status(200).json({error:false,message:response.message});
    } catch (err){
        return res.status(500).json({error:true,message:err.message})
    }
}

module.exports = {
    getCFcount,getCFrating , checkCfUsername, setCfData, getCfData
}