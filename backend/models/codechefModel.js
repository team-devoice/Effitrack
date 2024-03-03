const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const codechefSchema  = new Schema({
    effitrack_username:{
        type:String,
        required:true,
        unique:true,
    },
    cc_username:{
        type:String,
        required:true,
        unique:true,
    },
    currentRating:{type:Number,default:null},
    highestRating:{type:Number,default:0},
    globalRank:{type:Number,default:null},
    countryRank:{type: Number,default:0},
    stars:{type:String,default:null},
})

const codechefModel = model('codechefSchema',codechefSchema);

module.exports = {codechefModel};