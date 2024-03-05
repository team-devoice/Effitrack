require('dotenv').config();
const express = require("express");
const cors = require("cors");
const PORT = 5000;
const app = express();
const connection = require('./db');
const bodyParser = require('body-parser');
const leetcodeRoutes = require('./routes/leetcodeRoutes');
const codeforcesRoutes = require('./routes/codeforcesRoutes');
const githubRoutes = require('./routes/githubRoutes');
const codechefRoutes = require('./routes/codechefRoutes');
const userRoutes = require('./routes/userRoutes');
const editRoutes = require('./routes/editRoutes');
const SocialMediaRoutes = require('./routes/socialMediaRoutes');
const otpRoutes = require("./routes/optRoutes")
const addRoutes = require('./routes/userAddRoutes')
const corsOptions ={
  origin:['https://effitrack.vercel.app','http://localhost:3000'], 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());

connection();


app.use('/api/leetcode',leetcodeRoutes);
app.use('/api/codeforces',codeforcesRoutes);
app.use('/api/github',githubRoutes);
app.use('/api/codechef',codechefRoutes);
app.use('/api/user',userRoutes);
app.use('/api/edit',editRoutes)
app.use('/api/socialMedia',SocialMediaRoutes)
app.use('/api/otp',otpRoutes)
app.use('/api/additional',addRoutes)
app.listen(PORT,console.log("listening on port " + PORT));