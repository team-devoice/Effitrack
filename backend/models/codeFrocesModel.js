const {Schema,model} = require('mongoose');

const codefroceSchema = new Schema({
    effitrack_username:{
        type:String,
        required:true,
        unique:true,
    },
    cf_username:{
        type:String,
        required:true,
    },
    current_rating: {
        type: Number,
        default: 0,
    },
    friendOfCount:{
        type: Number,
        default: 0,
    },
    contribution:{
        type:Number,
        default:0,
    },
    current_rank : {
        type: String,
        default: "newbie",
    },
    maxRating: {
        type: Number,
        default: 0,
    },
    maxRank: {
        type: String,
        default: "newbie",
    },
    contest: {
        type: [
            {
                contestId: Number,
                contestName: String,
                handle: String,
                rank: Number,
                ratingUpdateTimeSeconds: Number,
                oldRating: Number,
                newRating: Number,
            }
        ],
        default: [],
    },
})

const codeforceModel = new model('codeforceSchema',codefroceSchema);

module.exports = {codeforceModel};
