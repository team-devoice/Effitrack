const {getGithubRepo} = require("../utils/GithubFun");
const { getGithubContributions } = require('github-contributions-counter')


const getRepoDetails = async  (req,res) =>{
    
    try{
        const username = req.user.github;
        const response  =await  getGithubRepo(username);
        if (username === "unknown") {
            return res.status(404).json({error:true,message:'enter your platform name'});
        }
        return res.status(200).json({error:false,message:response});
    }catch(err){
        return res.status(500).json({error:true,message:err.message});
    }
}

const postRepoDetails = async  (req,res) =>{
    
    try{
        const username = req.body.username;
        const response  =await getGithubRepo(username);
        getGithubContributions({
            username: 'Cibiyanna26',
            token: process.env.GITHUB_TOKEN // secret
          }).then((r) => {
            console.log(r.data.data.user.contributionsCollection.contributionCalendar)
        })
        return res.status(200).json({data:response});
    }catch(err){
        return res.status(500).json({Error:"Git occured while fetching the github data"});
    }
}

const checkUsername = async(req,res) =>{
    
    try{
        const username = req.body.username;
        url = `https://api.github.com/users/${username}`
        const response = await fetch(url,{
            method: 'GET',
        })
        const data =await response.json();
        if (data.hasOwnProperty('message') && data.message == 'Not Found') {
           return res.status(404).json({error:true,message:'Username not found'});
        } 
        
        else {
            return res.status(200).json({error:false,message:data.message});
        }

    } catch(err){
        return res.status(500).json({error:true,message:err.message})
    }
}

const githubProfile= async (req,res)=>{
    
    try{
        const username = req.user.github;
        url = `https://api.github.com/users/${username}`
        const response = await fetch(url,{
            method: 'GET',
        })
        const data =await response.json();
        if (username === "unknown") {
            return res.status(404).json({error:true,message:'enter your platform name'});
        }
        else if (data.hasOwnProperty('message') && data.message == 'Not Found') {
           return res.status(404).json({error:true,message:'Username not found'});
        }
        else if(data.hasOwnProperty('message') && data.message.includes('API rate limit exceeded')){
            return res.status(408).json({error:true,message:"rate limit exceeded"});
        } 
        else {
            return res.status(200).json({error:false,message:data});
        }

    } catch(err){
        return res.status(500).json({error:true,message:err.message})
    }
}


module.exports = {
    getRepoDetails,postRepoDetails,checkUsername,githubProfile
}