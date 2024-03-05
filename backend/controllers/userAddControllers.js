const userAddModel = require('../models/userAddModel')


const postPersonal = async (req,res) =>{
    const username = req.user.username;
    const {age,contact} = req.body;
    const email = req.user.email;
    await userAddModel.updateOne({username:username},{$set:{username,age,contact}},{upsert:true},(err,doc)=>{
        if(err){
            console.log(err);
        }
    })

    return res.status(200).json({error:false,message:'successfully updated profile'})
}   


const postEducation = async (req,res) =>{
    const username = req.user.username;
    const {state,college,startyear,endyear,degree} = req.body;
    await userAddModel.updateOne({username:username},{$set:{username,state,college,startyear,endyear,degree}},{upsert:true},(err,doc)=>{
        if(err){
            return res.status(409).json({error:true,message:err.message})
        }
    })
    return res.status(200).json({error:false,message:'successfully updated profile'})
}   

const getAddUserDetails = async(req,res) =>{   
    try{        
        const query = {username:req.user.username}
        const response = await userAddModel.findOne(query)
        if(!response){
            return res.status(404).json({error:true,message:`User haven't filled the education details` })
        }
        return res.status(200).json({error:false,message:response})
    } catch(e){
        return res.status(500).json({error:true,message:e.message})
    }
}

module.exports = {
    postPersonal , postEducation , getAddUserDetails
}