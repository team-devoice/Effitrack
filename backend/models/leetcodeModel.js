const mongoose = require("mongoose");
const {Schema,model} = mongoose;


const leetcodeSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    TotalCount:{type:Number,default:0},
    Easy:{type:Number,default:0},
    Medium:{type:Number,default:0},
    Hard:{type:Number,default:0},
    CurrentRating:{type:Number,default:0},
    total_contest:{type:Number,default:0},  
    contest:[{title:String,rank:Number,rating:Number}],
    globalRating:Number,
    badges: [{sortName: String, icon: String}]
})


const leetcodeModel = model('leetcodeModel',leetcodeSchema);


module.exports = {
    leetcodeModel
};

