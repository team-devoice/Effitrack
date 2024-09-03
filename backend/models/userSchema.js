const mongoose  = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username:{type:String, required:true,unique:true},
    email:{type:String, required:true,unique:true},
    password:{type:String,required:true},
    created:{type:Date,default:Date.now()},
    leetcode:{type:String,default:""},
    codeforces:{type:String,default:""},
    codechef:{type:String,default:""},
    github:{type:String,default:""},
    profileImage:{
        data: { type: String, default: "" }, // Store base64-encoded image data
        contentType: { type: String, default: "" } // Store content type of the image
    },
    socialMedia:{
        linkedIn: {type: String, default:"unknown"},
        twitter: {type: String, default:"unknown"},
        reddit: {type: String, default:"unknown"}
    }
})

const userModel = mongoose.model('user', userSchema);

module.exports = {userModel};