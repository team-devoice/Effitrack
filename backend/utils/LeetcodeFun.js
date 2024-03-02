const getLCBadges = async(UserName) => {
  const url = "https://leetcode.com/graphql";
  const query = `
    {
      matchedUser(username: "${UserName}") {
          badges {
            id
            name
            shortName
            displayName
            icon
            hoverText
            medal {
              slug
              config {
                iconGif
                iconGifBackground
              }
            }
            creationDate
            category
          }
          upcomingBadges {
            name
            icon
            progress
          }
        }
    }`;
    const headers = {
      "Content-Type": "application/json",
    };
    try{
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ query }),
        })
        const data = await response.json();
        // console.log(data)
        return data.data.matchedUser;
    } catch(err){
        return {error:true,message:'internet problem'}
    }
}

const getLeetCount =  async (Username) =>{
    const url = "https://leetcode.com/graphql";
    const query = `
    {
    matchedUser(username: "${Username}") {
        username
        submitStats: submitStatsGlobal {
        acSubmissionNum {
            difficulty
            count
            submissions
        }
        }
    }
    }
    `;

    const headers = {
    "Content-Type": "application/json",
    };
    var username , submitStats;
    try{
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ query }),
        })
        const data = await response.json();
        if(data.data.matchedUser == null){
          return {error:true,message:"username not found"};
        }else{
          return {error:false,message:data.data.matchedUser.submitStats.acSubmissionNum}
        }
    } catch(err){
        return {error:true,message:'internet problem'}
    }
    
}


const getLeetRating = async (username) =>{
    var data ;
    const response = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Referer': 'https://leetcode.com/',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body: JSON.stringify({
        query: `
          query getContestRankingData($username: String!) {
            userContestRanking(username: $username) {
              attendedContestsCount
              rating
              globalRanking
              topPercentage
              totalParticipants
            }
            userContestRankingHistory(username: $username) {
              attended
              trendDirection
              problemsSolved
              totalProblems
              finishTimeInSeconds
              rating
              ranking
              contest {
                title
                startTime
              }
            }
          }
        `,
        variables: { username: username },
      }),
    });
    var userContestRanking;
    var userContestRankingHistory;
    try{
      if (response.ok) {
        data = await response.json();
         userContestRanking = data.data.userContestRanking;
         userContestRankingHistory = data.data.userContestRankingHistory.filter((d)=>{
            return d.attended == true;
        });
        return {error:false,message:[userContestRanking,userContestRankingHistory]}
      }
      else{
          return {error:true,message:'Username not found'}
      }
    }
    catch(err){
      return {error:true,message:'Internet Error'}
    }
   
    
}
  

module.exports = {
    getLeetCount , getLeetRating, getLCBadges
}
