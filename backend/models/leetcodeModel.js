const mongoose = require("mongoose");
const {Schema,model} = mongoose;


const leetcodeSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    // count
    TotalCount:{type:Number,default:0},
    Easy:{type:Number,default:0},
    Medium:{type:Number,default:0},
    Hard:{type:Number,default:0},
    // rating
    CurrentRating:{type:Number,default:0}, 
    attendedContestCount:{type: Number, default:0},
    total_percent: {type: Number, default:0},
    globalRanking:Number,
    // contest:[{title:String,rank:Number,rating:Number}], we can decide this later
    badges: [{sortName: String, icon: String}]
})


const leetcodeModel = model('leetcodeModel',leetcodeSchema);


module.exports = {
    leetcodeModel
};

