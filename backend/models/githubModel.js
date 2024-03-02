const mongoose = require('mongoose');
const {Schema,model} = mongoose;


const githubSchema = new Schema({

    github_username:{type:String,required:true},
    followers: {type:Number,default:0},
    following: {type:Number,default:0},
    public_repos: {type:Number,default:0},
    public_gists: {type:Number,default:0},
    repo:{
        type:[
            {
                name:String,
                url:String,
                desc:String,
                ano_url: String //dont remove 
            }
        ],
        default:[]
    },
    contributions:{type:Number,default:0},
    calender:{type:String,default:""}
})

const githubModel = model("githubSchema",githubSchema);

module.exports = {githubModel};