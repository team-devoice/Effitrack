const userAddModel = require('../models/userAddModel')


const postPersonal = async (req,res) =>{
    const username = req.user.username;
    const {age,contact,gender,role} = req.body;
    const email = req.user.email;
    const newData = userAddModel.updateOne({username:username},{$set:{username,age,contact,role,gender}},{upsert:true},(err,doc)=>{
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


const getProject = async (req,res) =>{
    const username = req.user.username
    const additionalData = await userAddModel.findOne({username:username});

    const projectData = additionalData.project;
    if(!projectData){
        return res.status(404).json({error:true,message:`Please update your project`})
    }
    return res.status(200).json({error:false,message:projectData})
}

const getCertifications = async (req,res) =>{
    const username = req.user.username
    const additionalData = await userAddModel.findOne({username:username});

    const projectData = additionalData.certifications;
    if(!projectData){
        return res.status(404).json({error:true,message:`Please update your certificates`})
    }
    return res.status(200).json({error:false,message:projectData})
}

const getIntern = async (req,res) =>{
    const username = req.user.username
    const additionalData = await userAddModel.findOne({username:username});

    const projectData = additionalData.intern;
    if(!projectData){
        return res.status(404).json({error:true,message:`Please update your interns`})
    }
    return res.status(200).json({error:false,message:projectData})
}

const postProject = async (req,res) =>{
    const username = req.user.username;
    const {proj_name,link,description,stack} = req.body;
    const additionalData = await userAddModel.findOne({username:username});
    if(!additionalData){
        await userAddModel.updateOne({username:username},{$set:{project:[{proj_name,link,description,stack}]}},{upsert:true},(err,doc)=>{
            if(err){
                return res.status(409).json({error:true,message:err.message})
            }
        })
        return res.status(200).json({error:false,message:'successfully updated project'})
    }
    const pre_project = additionalData.project;
    await userAddModel.updateOne({username:username},{$set:{project:[...pre_project,{proj_name,link,description,stack}]}},{upsert:true},(err,doc)=>{
        if(err){
            return res.status(409).json({error:true,message:err.message})
        }
    })
    return res.status(200).json({error:false,message:'successfully updated profile'})
}




const postCertification = async (req,res) =>{
    const username = req.user.username;
    const {cert_name,link,description,certification_provider} = req.body;
    const additionalData = await userAddModel.findOne({username:username});
    if(!additionalData){
        await userAddModel.updateOne({username:username},{$set:{certifications:[{username,cert_name,link,description,certification_provider}]}},{upsert:true},(err,doc)=>{
            if(err){
                return res.status(409).json({error:true,message:err.message})
            }
        })
        return res.status(200).json({error:false,message:'successfully updated certificate'})
    }
    const pre_certifications = additionalData.certifications;
    await userAddModel.updateOne({username:username},{$set:{certifications:[...pre_certifications,{cert_name,link,description,certification_provider}]}},{upsert:true},(err,doc)=>{
        if(err){
            return res.status(409).json({error:true,message:err.message})
        }
    })
    return res.status(200).json({error:false,message:'successfully updated profile'})
}

const postIntern = async (req,res) =>{
    const username = req.user.username;
    const {internproject,internOrganization,internRole,domains} = req.body;
    const additionalData = await userAddModel.findOne({username:username});
    if(!additionalData){
        await userAddModel.updateOne({username:username},{$set:{intern:[{internproject,internOrganization,internRole,domains}]}},{upsert:true},(err,doc)=>{
            if(err){
                return res.status(409).json({error:true,message:err.message})
            }
        })
        return res.status(200).json({error:false,message:'successfully updated intern'})
    }
    const pre_intern = additionalData.intern;
    await userAddModel.updateOne({username:username},{$set:{intern:[...pre_intern,{internproject,internOrganization,internRole,domains}]}},{upsert:true},(err,doc)=>{
        if(err){
            return res.status(409).json({error:true,message:err.message})
        }
    })
    return res.status(200).json({error:false,message:'successfully updated profile'})
}

module.exports = {

    postPersonal , postEducation , getAddUserDetails , postProject , postCertification , postIntern , getProject , getCertifications , getIntern
}