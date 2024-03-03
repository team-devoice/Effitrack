const { response } = require("express");

const getGithubRepo = async (username) =>{
    var url = `https://api.github.com/users/${username}/repos`
    const response = await fetch(url,{
        method: 'GET',
    })
    const data =  await response.json();
    var git_repo_details = [];
    data.forEach((d)=>{
        git_repo_details.push({name:d.name,url:d.html_url,desc:d.description,ano_url:d.url});
    
    })
    return git_repo_details;
}

const getCalender = async () =>{
    const url = 'https://ghchart.rshah.org/Cibiyanna26';
    await fetch(url,{
        method: 'GET',
    })
    .then(res => res.text())
    .then(res => {
        // const holder = document.createElement('div')
        // holder.innerHTML = res
        // console.log(holder.querySelector('path'))
        console.log(res);
    })
}

const checkUsername = async(username) =>{
    url = `https://api.github.com/users/${username}`
    try{
        const response = await fetch(url,{
            method: 'GET',
        })
        const data =await response.json();
        if (data.hasOwnProperty('message') && data.message == 'Not Found') {
           return {error:true,message:'Username not found'}
        } else {
            return {error:false,message:data}
        }

    } catch(err){
        return {error:true,message:err.message}
    }
}

const getGitHubProfile = async(username) =>{
    url = `https://api.github.com/users/${username}`
    const response = await fetch(url,{
        method: 'GET',
    })
    const data =await response.json();
    return data;
}

module.exports = {
    getGithubRepo,getCalender,checkUsername, getGitHubProfile
}