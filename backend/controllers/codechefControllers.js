const { codechefModel } = require('../models/codechefModel');
const {getChefData} = require('../utils/CodeChefFun');

const setCodeChefDataHelper = async(req) =>{
    const username = req.user.codechef;
    const effitrack_username = req.user.username;
    const response = await getChefData(username);
        const {currentRating,highestRating,globalRank,countryRank,stars} = response.message;
        const codechefData = {
            effitrack_username,
            cc_username:username,
            currentRating,
            highestRating,
            globalRank,
            countryRank,
            stars
        }
    return codechefData;
}

const setCodeChefData = async (req,res) =>{
    try{
        const username = req.user.codechef;
        if(username === "unknown"){
           return res.status(404).json({error:true,message:"username not found"});
        }
        const codechefData = setCodeChefDataHelper(req);
        await codechefModel.updateOne({cc_username:username}, { $set: codechefData},{upsert:true},(err,doc)=>{
            if(err){
                console.log(err);
            }
        });
        return res.status(200).json({error:false,message:"codechef data updated successfully"});
    }
    catch(err){
        return res.status(500).json({error:true,message:err.message});
    }
}

const getCodeChefData = async (req,res) =>{
    const username = req.user.codechef;
    if(username === '' || username === 'unknown' || username === undefined){
        return res.status(404).json({error: true, message: 'user dont have codechef account'});
    }
    try{
        let doc = await codechefModel.findOne({cc_username: username});
        if(doc === null){
            return res.status(404).json({error: true, message: 'user dont have codechef account'});
        }
        return res.status(200).json({error: false, message: doc});
    }
    catch(err){
        return res.status(500).json({error:true,message:err.message});
    }
}

const getCodeChefDetails =async (req,res)=>{

     
    try{
        const username = req.user.codechef; 
        const response = await getChefData(username);
        if(response.error || username === "unknown"){
           return res.status(404).json({error:true,message:"username not found"});
        }
        return res.status(200).json({error:false,message:response.message});
    }
    catch(err){
        return res.status(500).json({error:true,message:err.message});
    }
}

const checkCfUsername =async (req,res) =>{


    try{
        const username = req.body.username;
        const response = await getChefData(username);
        if(response.error){
           return res.status(404).json({error:true});
        }
        return res.status(200).json({error:false});
    }
    catch(err){
        return res.status(500).json({error:true});
    }
}


module.exports = {
    getCodeChefDetails, checkCfUsername, setCodeChefData, getCodeChefData, setCodeChefDataHelper
}
