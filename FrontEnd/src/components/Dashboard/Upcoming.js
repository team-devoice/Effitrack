import { useState, useEffect } from "react";
import CodeChef from "../../assets/codechef.jpeg";
import Codeforces_logo from "../../assets/codeforces.png";
import Leetcode_logo from "../../assets/jpg/LeetCode_logo.jpg"
import atCoder_logo from "../../assets/jpg/atcoder.jpg"
import geekforgeeks_logo from "../../assets/svg/gglogo.svg"
import { useSelector , useDispatch } from "react-redux";
import { toggleUpcoming } from "../../redux/persistReducer";
import PropTypes from 'prop-types';

const Contest = (props) => {
  const { onecontestData } = props;
  return (
    <>
      <a href={`${onecontestData?.href}`} target="_blank" rel="noreferrer"
        className="contest bg-[#f4f5f6] rounded-xl text-black p-[0.8rem]
                            flex slowmo items-center h-[5rem] flex-row-reverse justify-between
                             dark:bg-[#333] dark:text-[#f3f3f3] hover:shadow-none "
      >
        <div>
          {
            onecontestData?.resource?.name?.includes("codechef") ? 
                (<img src={CodeChef} alt="codechef"className="w-[32px] h-[32px]"></img>)
            :
            onecontestData?.resource?.name?.includes("codeforces") ?
            (<img src={Codeforces_logo} alt="codeforces" className="w-[32px] h-[32px] "></img>)
            : 
            onecontestData?.resource?.name?.includes("leetcode") ?
            (<img src={Leetcode_logo} alt="leetcode" className="w-[32px] h-[32px]"></img>)
            : 
            onecontestData?.resource?.name?.includes("atcoder") ?
            (<img src={atCoder_logo} alt="atcoder" className="w-[32px] h-[32px] "></img>)
            : onecontestData?.resource?.name?.includes("geeksforgeeks") ?
            (<img src={geekforgeeks_logo} alt="atcoder" className="w-[32px] h-[32px] "></img>)
            : <></>
          }
          
        </div>
        <div className="grid  p-2">
  <div className="flex flex-col w-[12rem]">
    <h1 className="font-semibold text-sm overflow-hidden truncate ">
      {onecontestData.contestName}
    </h1>
    <small className="font-thin text-gray-600 dark:text-[#c0c0c0]">{onecontestData.contestDate}</small>
  </div>
</div>

      </a>
    </>
  );
};

Contest.propTypes = {
  onecontestData: PropTypes.object, // Check if the prop is an object
};


const ContestFilter = (props) =>{
    const {platformNeed} =props;
    const dispatch = useDispatch();
    const rootReducer = useSelector((store)=>store.persistedReducer);
    console.log(rootReducer);
    const handleCheckBoxChange = () =>{
        dispatch(toggleUpcoming({key:platformNeed}))
    }
    const paragraphStyle = {
      textTransform: 'capitalize',
    };

    return <>
      <div target="_blank" rel="noreferrer"
        className="contest bg-[#f4f5f6] rounded-xl text-black
                  flex px-3 py-3 slowmo items-center
                  dark:bg-[#333] dark:text-[#f3f3f3] hover:shadow-none p-2"
      >
        <div className="w-[2.5rem] rounded-xl overflow-hidden">
        {
            platformNeed.includes("codechef") ? 
                (<img src={CodeChef} alt="codechef"className="p-2"></img>)
            :
            platformNeed.includes("codeforces") ?
            (<img src={Codeforces_logo} alt="codeforces" className="p-2"></img>)
            : 
            platformNeed.includes("leetcode") ?
            (<img src={Leetcode_logo} alt="leetcode" className="p-2"></img>)
            : 
            platformNeed.includes("atcoder") ?
            (<img src={atCoder_logo} alt="atcoder" className="p-2"></img>)
            : platformNeed.includes("geeksforgeeks") ?
            (<img src={geekforgeeks_logo} alt="atcoder" className="p-2"></img>)
            : <></>
          }
        </div>
        <div className="flex p-2 justify-between w-full font-sm text-lg items-center">
          <p className="w-[90%] mx-auto col-span-2" style={paragraphStyle}>{platformNeed}</p>
          <input
            type="checkbox"
            className="w-[1.3rem] h-[1.3rem] cursor-pointer"
            checked={rootReducer[platformNeed]}
            onChange={handleCheckBoxChange}
          >
          </input>
  
        </div>
      </div>
    </>
}

ContestFilter.propTypes = {
  platformNeed:PropTypes.string.isRequired,
}

const Upcoming = () => {
  const myUserDetails = useSelector((state) => state.userDetails);
  const { upcomingContest } = myUserDetails;
  console.log('upcoming Contest', upcomingContest);
  const platformList = ["leetcode","codechef","codeforces","atcoder","geeksforgeeks"];
  const [twoToggle,setTwoToggle] = useState(1);
  const rootSlice = useSelector((store)=>store.persistedReducer);

  const [ contestDetails, SetContestDetails ] = useState([]); //this is the sorted contest details
  useEffect(()=>{
    var contest = [];
    const helper = (line, val) => {
      if(line.includes("AtCoder")){
          const spliting = line.split("AtCoder");
          var res = spliting[1];
          res.trim();
          res = res.substring(0,res.length-1)
          return "AtCoder "+res;
      }
      const words = line.split(val);
      const firstTwoWords = words.slice(0, 2);
      if(val === 'T'){
        return words[0]
      }
      const result = firstTwoWords.join(' ');
      return line;
    }
    upcomingContest.forEach(element => {
      const domain = element.resource.name;
      const textDomain = domain.split('.')[0];
      if(rootSlice[textDomain]){
        contest.push(
          {
            "contestName": helper(element.event,' '),
            "contestDate" : helper(element.end, 'T'),
            "resource": element.resource,
            "href": element.href,
          }
        ) 
      }
    });
    contest.sort((a, b) => new Date(a.contestDate) - new Date(b.contestDate));
    SetContestDetails(contest)
  },[upcomingContest,rootSlice])
  
  return (
    <>
      <div className="dark:bg-[#1d1d1d] bg-[#fff] px-4 text-[#333] py-4 rounded-xl h-full w-full relative">
        <div className="dark:text-white text-black grid grid-cols-2 text-center">
            <button className={`w-[70%] mx-auto rounded-xl p-2 ${twoToggle?"contest-filter":""}`} onClick={()=>setTwoToggle(1)}>  
                  Upcoming
            </button>
            <button className={`w-[70%] mx-auto rounded-xl p-2 ${!twoToggle?"contest-filter":""}`} onClick={()=>setTwoToggle(0)}>
                  Filter
            </button>
        </div>
        <div className="overflow-hidden h-[34rem] rounded-xl p-1 mt-3">
          <div className="overflow-y-auto w-full h-full no-scrollbar flex flex-col gap-y-3">
          {
              twoToggle ? <>
                  { contestDetails &&
                   contestDetails.map((oneContestData) => {
                  return <Contest onecontestData={oneContestData} />;
              })}
              </> :
              <>
                {
                  platformList.map((platformNeed)=>{
                    return <ContestFilter platformNeed={platformNeed}/>
                  })
                }
                
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Upcoming;
