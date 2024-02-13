const {getForceCount,getForceRating}  = require("../utils/CodeForceFun");

const getCFcount = async (req,res) =>{

    try{
        const username = req.user.codeforces;
        const response = await getForceCount(username);
        if(response.error || username === "unknown"){
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
        if(response.error || username === "unknown"){
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

// const postCFcount = async (req,res) =>{
//     const username  = req.body.username;
//     try{
//         const submitStats = await getForceCount(username);
//         res.status(200).json({error:false,message:submitStats});
//     }catch(err){
//         res.status(500).json({error:true,message:"Error occurred while fetching the data from the leetcode api"})
//     }
// }


// const postCFrating = async (req,res) =>{
//     const username  = req.body.username;
//     try{
//         const submitStats = await getForceRating(username);
//         res.status(200).json({error:false,message:submitStats});
//     }catch(err){
//         res.status(500).json({error:true,message:"Error occurred while fetching the data from the leetcode api"})
//     }
// }


module.exports = {
    getCFcount,getCFrating , checkCfUsername
}