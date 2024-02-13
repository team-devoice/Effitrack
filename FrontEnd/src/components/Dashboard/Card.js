import React, { useEffect, useState } from "react";
import LeetCode_logo from "../../assets/jpg/LeetCode_logo.jpg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Codechef_logo from "../../assets/codechef-01.png";
import Codeforces_logo from "../../assets/codeforces.png";
import { Link } from "react-router-dom";


export const LeetcodeCard = () => {
  const leetcodeDetails = useSelector((store) => store.leetcodeDetails);
  const userSlice = useSelector((store) => store.userDetails);
  const {userDetials} = userSlice;
  const { count } = leetcodeDetails;

  const [leetcodeUrl,setLeetcodeUrl] = useState('#');

  useEffect(()=>{
    if(userDetials.leetcode !== "unknown"){
      setLeetcodeUrl(`https://leetcode.com/${userDetials.leetcode}`)
    }
  },[userDetials.leetcode]);

  return (

      <div
        className={`card bg-[#fff] dark:bg-[#1d1d1d] text-[#f3f3f3] shadow-xl slowmo hover:shadow`}
      >
        <div className="card-details">
          <Link  to={`${userDetials.leetcode === "unknown" ? '#' : leetcodeUrl}`} target="_blank" className={`${userDetials.leetcode === "unknown" ? 'cursor-not-allowed' : 'cursor-pointer'}`}>

            <div
              className={`card-details-top bg-[#253D5B] dark:bg-[#333] rounded-xl flex justify-center items-center gap-x-2`}
            >
              <img src={LeetCode_logo} alt="leetlogo" className="h-5"></img>
              <h1>Leetcode</h1>
            </div>
        </Link>

          <div className="px-2 text-[#333] dark:text-[#f3f3f3]">
            <h1>Easy : {count[1].count}</h1>
            <h3>Medium : {count[2].count} </h3>
            <h4>Hard : {count[3].count} </h4>
          </div>
        </div>
        <div className="flex h-[100px] w-[100px]">
          <svg width={100} height={100}>
            <g transform="rotate(-90, 50, 50)">
              <circle
                r="45"
                cx="50"
                cy="50"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="0.5rem"
                strokeDasharray={439.8}
                strokeDashoffset={0}
                className="text-gray-300 w-[50%] dark:text-gray-600"
              ></circle>
              <circle
                r="45"
                cx="50"
                cy="50"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="0.5rem"
                strokeDasharray={439.8}
                strokeDashoffset={440 - (440 * 400) / 2350}
                className="text-[#2d63f2] dark:text-[#f3f3f3]"
              ></circle>
            </g>
            <text
              className="text-xl font-medium"
              x="50%"
              y="40%"
              dominantBaseline="central"
              textAnchor="middle"
              fill="gray"
            >
              {count[0]?.count?.toString()?.padStart(1, "0")}
            </text>
            <text
              className="text-sm font-medium"
              x="50%"
              y="65%"
              dominantBaseline="central"
              textAnchor="middle"
              fill="gray">Solved</text>
          </svg>
        </div>
      </div>

  );
};

export const CodeChefCard = () => {
  const codechefDetails = useSelector((store) => store.codechefDetails);
  const userSlice = useSelector((store) => store.userDetails);
  const {userDetials} = userSlice;
  const { ccUserDetails } = codechefDetails;

  const [codechefUrl,setCodechefUrl] = useState('#');

  useEffect(()=>{
    if(userDetials.codechef !== "unknown"){
      setCodechefUrl(`https://www.codechef.com/users/${userDetials.codechef}`)
    }
  },[userDetials.codechef]);

  return (

      <div
        className={`card bg-[#fff] dark:bg-[#1d1d1d] text-[#f3f3f3] shadow-xl slowmo hover:shadow`}
      >
          <div className="card-details">
            <Link  to={`${userDetials.codechef === "unknown" ? '#' : codechefUrl}`} target="_blank" className={`${userDetials.codechef === "unknown" ? 'cursor-not-allowed' : 'cursor-pointer'}`}>

              <div
                className={`card-details-top bg-[#253D5B] dark:bg-[#333] rounded-xl flex justify-center items-center gap-2`}
              >
                  <img src={Codechef_logo} alt="codecheflogo" className="h-5 mt-[-3px]"></img>
                  <h1>CodeChef</h1>
              </div>
            </Link>
            
              <div className="px-2 text-[#333] dark:text-[#f3f3f3]">
                <h1>Top Rating : {ccUserDetails.highestRating}</h1>
                <h3>Rank : {ccUserDetails.globalRank}</h3>
                <h4>Stars : {ccUserDetails.stars}</h4>
              </div>
          </div>
       
          
        <div className="flex h-[100px] w-[100px]">
          <svg width={100} height={100}>
            <g transform="rotate(-90, 50, 50)">
              <circle
                r="45"
                cx="50"
                cy="50"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="0.5rem"
                strokeDasharray={439.8}
                strokeDashoffset={0}
                className="text-gray-300 w-[50%] dark:text-gray-600"
              ></circle>
              <circle
                r="45"
                cx="50"
                cy="50"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="0.5rem"
                strokeDasharray={439.8}
                strokeDashoffset={
                  440 - (440 * ccUserDetails.currentRating) / 5000
                }
                className="text-[#2d63f2] dark:text-[#f3f3f3]"
              ></circle>
            </g>
            <text
              className="text-xl font-medium"
              x="50%"
              y="40%"
              dominantBaseline="central"
              textAnchor="middle"
              fill="gray"
            >
              {ccUserDetails.currentRating.toString().padStart(1, "0")}
            </text>
            <text
              className="text-sm font-medium"
              x="50%"
              y="65%"
              dominantBaseline="central"
              textAnchor="middle"
              fill="gray">Rating</text>
          </svg>
        </div>
      </div>

  );
};

export const CodeforcesCard = () => {
  const codeforcesDetails = useSelector((store) => store.codeforcesDetails);
  const { cfProfile } = codeforcesDetails;
  const userSlice = useSelector((store) => store.userDetails);
  const {userDetials} = userSlice;

  const [codeforcesUrl,setCodeforcesUrl] = useState('#');
  
  useEffect(()=>{
    if(userDetials.codeforces !== "unknown"){
      setCodeforcesUrl(`https://codeforces.com/profile/${userDetials.codeforces}`)
    }
  },[userDetials.codeforces])

  return (

      <div
        className={`card bg-[#fff] dark:bg-[#1d1d1d] text-[#f3f3f3] slowmo shadow-xl hover:shadow`}
      >
        <div className="card-details ">
          <Link  to={`${userDetials.codeforces === "unknown" ? '#' : codeforcesUrl}`} target="_blank" className={`${userDetials.codeforces === "unknown" ? 'cursor-not-allowed' : 'cursor-pointer'}`}>

            <div
              className={`card-details-top bg-[#253D5B] dark:bg-[#333] rounded-xl flex justify-center items-center gap-2`}
            >
              <img src={Codeforces_logo} alt="codeforceslogo" className="h-5"></img>
              <h1>CodeForces</h1>
            </div>
          </Link>

          <div className="px-2 text-[#333] dark:text-[#f3f3f3]">
            <h1>
              Rating :{" "}
              {cfProfile[0].hasOwnProperty("rating")
                ? cfProfile[0].rating
                : "null"}
            </h1>
            <h3>
              Rank :{" "}
              {cfProfile[0].hasOwnProperty("rank") ? cfProfile[0].rank : "null"}
            </h3>
            <h4>FriendCount : {cfProfile[0].friendOfCount}</h4>
          </div>
        </div>
        <div className="flex h-[100px] w-[100px]">
          <svg width={100} height={100}>
            <g transform="rotate(-90, 50, 50)">
              <circle
                r="45"
                cx="50"
                cy="50"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="0.5rem"
                strokeDasharray={439.8}
                strokeDashoffset={0}
                className="text-gray-300 w-[50%] dark:text-gray-600"
              ></circle>
              <circle
                r="45"
                cx="50"
                cy="50"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="0.5rem"
                strokeDasharray={439.8}
                strokeDashoffset={440 - (440 * 400) / 3635}
                className="text-[#2d63f2] dark:text-[#f3f3f3]"
              ></circle>
            </g>
            <text
              className="text-xl font-medium"
              x="50%"
              y="40%"
              dominantBaseline="central"
              textAnchor="middle"
              fill="gray"
            >
              {cfProfile[0].hasOwnProperty("maxRating")
                ? cfProfile[0].maxRating?.toString().padStart(1, "0")
                : "0".toString().padStart(1, "0")}
            </text>
            <text
              className="text-sm font-medium"
              x="50%"
              y="65%"
              dominantBaseline="central"
              textAnchor="middle"
              fill="gray">Rating</text>
          </svg>
        </div>
      </div>

  );
};

const Card = ({ card }) => {
  return (
    <div>
      <div
        className={`card bg-[#fff] dark:bg-[#1d1d1d] text-[#f3f3f3] shadow-xl hover:shadow`}
      >
        <div className="card-details ">
          <div
            className={`card-details-top bg-[#253D5B] dark:bg-[#333] rounded-xl flex justify-center items-center gap-2`}
          >
            <img src={card.logo} alt="leetlogo" className="h-5"></img>
            <h1>{card.title}</h1>
          </div>
          <div className="px-2 text-[#333] dark:text-[#f3f3f3]">
            <h1>{card.sub_title}</h1>
            <h3>Count : {card.count}</h3>
            <h4>Rank : {card.rank}</h4>
          </div>
        </div>
        <div className="flex h-[100px] w-[100px]">
          <svg width={100} height={100}>
            <g transform="rotate(-90, 50, 50)">
              <circle
                r="45"
                cx="50"
                cy="50"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="0.5rem"
                strokeDasharray={439.8}
                strokeDashoffset={0}
                className="text-gray-300 w-[50%] dark:text-gray-600"
              ></circle>
              <circle
                r="45"
                cx="50"
                cy="50"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="0.5rem"
                strokeDasharray={439.8}
                strokeDashoffset={440 - (440 * 400) / 2999}
                className="text-[#2d63f2] dark:text-[#f3f3f3]"
              ></circle>
            </g>
            <text
              className="text-xl font-bold"
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              fill="gray"
            >
              {card.completed_count.toString() + "%".padStart(1, "0")}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Card;
