import React from "react";
import temp_logo from "../../assets/temp_logo.jpeg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
const GitProfile = ({ modify }) => {
  const githubDetails = useSelector((store) => store.githubDetails);
  const myUserDetails = useSelector((state) => state.userDetails);
  const { GithubProfile } = githubDetails;
  const { userDetials } = myUserDetails;

  const TableRow = ({ label, value }) => (
   <div className="flex justify-between pb-3">
   <p className="font-medium ml-2">{label}</p>
   <p class="flex items-center font-semibold text-l">{value}</p>
   </div>
  );
  const [leetcodeUrl,setLeetcodeUrl] = useState('#');
  useEffect(()=>{
    if(userDetials.github !== "unknown"){
      setLeetcodeUrl(`https://github.com/${userDetials.github}`)
    }
  },[userDetials.github]);
  return (
    <div className="flex flex-col px-4 gap-y-4 relative mt-3">
      <div className="h-[2.5rem] mt-[0.2rem] flex">
        {" "}
        <h1
          className={`bg-[#253D5B] h-full w-[8rem] rounded-xl flex items-center p-0 pl-2 text-lg font-semibold justify-center dark:bg-[#333] text-[#f3f3f3]`}
        >
          <Link to={`${userDetials.github === "unknown" ? '#' : leetcodeUrl}`} className={`${userDetials.github === "unknown" ? "cursor-not-allowed" :"cursor-pointer"}`}>
          <div className="flex flex-row justify-center gap-x-2 w-full items-center">
            <svg height="28" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="28" data-view-component="true" fill="white">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
            <h1>GitHub</h1>
          </div>
          </Link>
        </h1>
      </div>
      <div className="flex flex-col gap-x-8  mt-2">
        <div className="w-full">
          <div className="w-[40%] mx-auto">
              <img
                src={GithubProfile.avatar_url}
                alt="github"
                className="rounded-[100%] shadow-lg"
              ></img>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 mt-4 lg:mb-0 mb-4">
          <div className="text-xl font-medium text-center">
            <h1>{GithubProfile.name}</h1>
          </div>
          <div className="bg-[#f4f5f6] text-[#333] slowmo dark:bg-[#333] shadow-xl hover:shadow cursor-default dark:text-[#f3f3f3] rounded-xl pt-3">
          <table className="border-separate w-3/4 ml-5 ">
            <tbody className="">
              <TableRow label="Followers" value={GithubProfile.followers} />
              <TableRow label="Following" value={GithubProfile.following} />
              <TableRow label="Public Repos" value={GithubProfile.public_repos} />
              <TableRow label="Public Gists" value={GithubProfile.public_gists} />
            </tbody>
          </table>
      </div>
        </div>
      </div>
    </div>
  );

};

export default GitProfile;
