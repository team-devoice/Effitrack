const {getGithubRepo, getGitHubProfile} = require("../utils/GithubFun");
const { getGithubContributions } = require('github-contributions-counter')
const { githubModel } = require('../models/githubModel');

const setGithubData = async (req, res) => {
    const username = req.user.github;
    if(username === '' || username === 'unknown' || username === undefined || username == null) 
        res.status(404).json({error: true, message: 'user dont have github repo'})
    try{
        const effitrack_username = req.user.username;
        const repo  = await  getGithubRepo(username); 
        const github_profile = await getGitHubProfile(username);
        const github_username = github_profile.login;
        const followers = github_profile.followers;
        const following = github_profile.following;
        const public_repos = github_profile.public_repos;
        const public_gists = github_profile.public_gists;
        const data = {
            effitrack_username,
            github_username: username,
            followers,
            following,
            public_repos,
            public_gists,
            repo
        }
        console.log(data);
        await githubModel.updateOne({github_username: username}, { $set: data},{upsert:true},(err,doc)=>{
            if(err){
                console.log(err);
            }
        })
        res.status(200).json({error: false, message: "github data updated successfully"});
    }
    catch(err){
        res.status(500).json({error:true,message:err.message});
    }
}

const getGithubData = async (req, res) => {
    const username = req.user.github;
    if(username === '' || username === 'unknown' || username === undefined){
        res.status(404).json({error: true, message: 'user dont have github repo'})
    }
    try{
        let doc = await githubModel.findOne({github_username: username});
        if(doc === null){
            res.status(404).json({error: true, message: 'user dont have github repo'})
        }
        res.status(200).json({error: false, message: doc});
    }
    catch(err){
        res.status(500).json({error:true,message:err.message});
    }
}

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
        const data = await getGitHubProfile(username);
        if (username === "unknown") {
            return res.status(404).json({error:true,message:'enter your platform name'});
        }
        else if (data.hasOwnProperty('message') && data.message == 'Not Found') {
           return res.status(404).json({error:true,message:'Username not found'});
        }
        else if(data.hasOwnProperty('message') && data.message.includes('API rate limit exceeded')){
            return res.status(408).json({error:true,message:"git hub rate limit exceeded"});
        } 
        else {
            return res.status(200).json({error:false,message:data});
        }

    } catch(err){
        return res.status(500).json({error:true,message:err.message})
    }
}


module.exports = {
    getRepoDetails,postRepoDetails,checkUsername,githubProfile, setGithubData, getGithubData
}