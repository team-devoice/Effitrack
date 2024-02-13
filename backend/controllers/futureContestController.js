const axios = require("axios");



function isValidDateString(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    const inputYear = inputDate.getFullYear();
    const inputMonth = inputDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    if (inputYear !== currentYear || inputMonth !== currentMonth) {
      return false;
    }
    const oneMonthLater = new Date(currentDate);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    if (inputDate >= oneMonthLater) {
      return false;
    }
    return true;
}


const fetchContestData = async(req,res)=>{
    try{
        const codechefUrl = `https://clist.by/api/v1/contest/?username=Cibiyanna26&api_key=${process.env.CLIST_TOKEN}&resource__id=2`;
        const codeforcesUrl = `https://clist.by/api/v1/contest/?username=Cibiyanna26&api_key=${process.env.CLIST_TOKEN}&resource__id=1`;
        const leetcodeUrl = `https://clist.by/api/v1/contest/?username=Cibiyanna26&api_key=${process.env.CLIST_TOKEN}&resource__id=102`;
        const atCoderUrl = `https://clist.by/api/v1/contest/?username=Cibiyanna26&api_key=${process.env.CLIST_TOKEN}&resource__id=93`;
        const ggCoderUrl = `https://clist.by/api/v1/contest/?username=Cibiyanna26&api_key=${process.env.CLIST_TOKEN}&resource__id=126`;


        const ccresponse = await fetch(codechefUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
        }})
        const cfresponse = await fetch(codeforcesUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
        }})
        const lcresponse = await fetch(leetcodeUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
        }})
        const atresponse = await fetch(atCoderUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
        }})
        const ggresponse = await fetch(ggCoderUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
        }})
        var ccdata = await ccresponse.json();
        var cfdata = await cfresponse.json();
        var lcdata = await lcresponse.json();
        var atdata = await atresponse.json();
        var ggdata = await ggresponse.json();
        if(!ccdata && !cfdata){
            return res.status(500).json({error:true,message:"Can't fetch the upcoming data"});
        }

        var ccContest = [];
        var cfContest = [];
        var lcContest = [];
        var atCoder = [];
        lcContest = lcdata.objects.filter((d)=>{
            return isValidDateString(d.start) === true;
        })
        cfContest = cfdata.objects.filter((d)=>{
            return isValidDateString(d.start) === true;
        })
        ccContest = ccdata.objects.filter((d)=>{
            return isValidDateString(d.start) === true;
        })
        atCoder = atdata.objects.filter((d)=>{
            return isValidDateString(d.start) === true;
        })
        ggCoder = ggdata.objects.filter((d)=>{
            return isValidDateString(d.start) === true;
        })

        var allContest = [...lcContest,...cfContest,...ccContest,...ggCoder,...atCoder];
       
        
        return res.status(200).json({error:false,message:allContest})
    }
    catch(err){
        return res.status(409).json({error:true,message:"can't parse the data fetching is not completed"})
    }
    
}
  

// fetchCodechefContest();
// fetchCodeforcesContest();

module.exports = fetchContestData;
