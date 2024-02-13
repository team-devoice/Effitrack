import { useEffect, useState } from "react";
import GitRepo from "../../assets/github.png";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./dashboard.css";
import { FaRegFolderClosed } from "react-icons/fa6";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import { getCookie } from "../../services/servicehelp";
import { useNavigate } from "react-router-dom";
import RedditLogo from "../../assets/reddit-logo.png";
import linkedlogo from "../../assets/linkedin.png";
import twitter from "../../assets/X-logo.jpg";
const Favourite = (props) => {
  const { repoDetails } = props;

  return (
    <>
      {
    <a href={repoDetails.url} target="_blank" rel="noopener noreferrer">
      <div className="repo-favourite  bg-[#f4f5f6] text-[#333] dark:bg-[#333] slowmo shadow-xl hover:shadow-none ease-in duration-300 cursor-default dark:text-[#f3f3f3] flex items-center justify-between p-4">
      <div className="flex items-center">
        <img src={GitRepo} alt="github" className="mr-4" />
        <div className="flex-grow pl-4 border-l border-[#000] dark:border-[#FFF] justify-between">
          <p className="font-medium">Repository name : {repoDetails.name}</p>
        </div>
      </div>
    {/* <h6>Stars Earned : 1</h6> */}
    <div>
      <a href={repoDetails.url} target="_blank" rel="noopener noreferrer">
      <FaRegFolderClosed style={{ fontSize: '20px'}} className="mr-2 hover:text-blue-500"></FaRegFolderClosed>
    </a>
  </div>
</div>
</a>

        // :
        // <div className="h-[4rem] repo-favourite bg-[#f4f5f6] text-[#333] dark:bg-[#333] shadow-xl hover:shadow-none ease-in duration-300 cursor-default dark:text-[#f3f3f3]">
        //   {/* emtpy shimmer */}
        // </div>
      }
    </>
  );
};

const Social = (props) => {
  const {platform, url} = {...props};
  let logoSrc;

  switch (platform.toLowerCase()) {
    case 'github':
      logoSrc = GitRepo;
      break;
    case 'linkedin':
      logoSrc = linkedlogo;
      break;
    case 'twitter':
      logoSrc = twitter;
      break;
    case 'reddit':
      logoSrc = RedditLogo;
      break;
    default:
      logoSrc = GitRepo; 
  }
  return (
    <>
      <Link to={url} target="_blank" rel="noopener noreferrer" className="h-[4rem] cursor-pointer social-media shadow-xl hover:shadow-none slowmo bg-[#f4f5f6] dark:bg-[#333] dark:text-white text-[#333]">
        <img src={logoSrc} alt={platform} className="w-[40px] h-[40px]"></img>
        <div className="social-media-inner">
          <h4 className="font-medium">{platform}</h4>
        </div>
      </Link>
    </>
  );
};

const Showcase = () => {
  const githubDetails = useSelector((store) => store.githubDetails);
  const { userGithubRepo } = githubDetails;
  const [repoDetails, setRepoDetails] = useState("");
  const { id } = useParams();
  useEffect(() => {
    setRepoDetails(userGithubRepo);
  }, [userGithubRepo]);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [LinkedIn, setLinkedIn] = useState("unknown");
  // const [GitHub, setGitHub] = useState("unknown");
  const [Twitter, setTwitter] = useState("unknown");
  const [Reddit, setReddit] = useState("unknown");
  
  const myUserDetails = useSelector((store) => store.userDetails);
  const { userDetials } = myUserDetails;

  useEffect(()=>{ 
    setLinkedIn(userDetials.socialMedia?.linkedIn)
    setTwitter(userDetials.socialMedia?.twitter)
    setReddit(userDetials.socialMedia?.reddit)
  },[userDetials.socialMedia.linkedIn, userDetials.socialMedia.twitter, userDetials.socialMedia.reddit])


  const handleSubmit = async() =>{

    const authToken = getCookie(process.env.REACT_APP_JWT_NAME);
    if (!authToken) {
      navigate("/login");
    } else {
      try {
        const axiosInstance = axios.create({
          headers: {
            common: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        });

        const response = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/socialMedia`,
          {
            LinkedIn,Twitter,Reddit
          }
        );
        setShow(!show);
      } catch (error) {
        console.log("error in authentication", error);
      }
    }
  }

  return (
    <>
      <div className="showcase-top">
        <div className="showcase-favourite bg-[#fff] dark:bg-[#1d1d1d] dark:text-[#f3f3f3] text=[#333]  rounded-xl p-3">
          <h1>Your Repository </h1>

          <div className="repo-favourites h-[13rem] overflow-auto no-scrollbar">
            {repoDetails.length > 0 ? (
              <>
                {repoDetails &&
                  repoDetails.map((repo) => {
                    return <Favourite repoDetails={repo} />;
                  })}
              </>
            ) : (
              <div className="h-[4rem] repo-favourite bg-[#f4f5f6] text-[#333] dark:bg-[#333] shadow-xl hover:shadow-none ease-in duration-300 cursor-default dark:text-[#f3f3f3]">
                {/* emtpy shimmer */}
              </div>
            )}  
          </div>
        </div>
        <div className="showcase-socails text-[#000] bg-[#fff] dark:bg-[#1d1d1d] dark:text-[#f1f1f1] rounded-xl p-3 relative">
          <h1  >Add Your Social Media Links</h1>
          <div className="socail-medias h-[13rem] overflow-auto no-scrollbar">
            {
              (LinkedIn !== "unknown" && LinkedIn !== "")?
              <Social platform = {'LinkedIn'} url={LinkedIn}/>:''
            }
            {
              (Twitter !== "unknown" && Twitter != "")?
              <Social platform = {'Twitter'} url={Twitter}/>:''
            }
            {
              (Reddit !== "unknown" && Reddit !== "")?
              <Social platform = {'Reddit'} url={Reddit}/>:''
            }
          </div>
          <div className="absolute bottom-2 right-2 m-4">
            {
              id !== undefined ? <></>
              :
              <Fab color="primary" size="small" aria-label="add" onClick={()=>{setShow(!show)}}>
                <AddIcon />
               </Fab>
            }
            
          </div>
        </div>
      </div>
      <div className={`fixed inset-0 ${(show)?'block':'hidden'} text-white h-full w-full flex justify-center items-center m-auto`}>
        <div className="bg-[#f3f4f5] dark:bg-[#1d1d1d] m-4 p-4 rounded-lg text- dark:text-white shadow-xl ">
          <div className="text-lg flex border-b-2 mb-2">
            <div className="p-4 text-[#000] dark:text-[#f1f1f1">
              Add Your Social Media links
            </div>
            <button onClick={()=>setShow(!show)}>
              <div className="h-6 w-6">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="auto" height="auto" viewBox="0 0 30 30">
                <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
              </svg>
              </div>
            </button>
          </div>
          {/* <div className="flex gap-2 items-center p-2">
            <div>
              link
            </div>
            <TextField id="outlined-basic" label="GitHub - url" variant="outlined" className="bg-white dark:bg-[#333]" onChange={(e)=>{setGitHub(e.target.value)}}/>
          </div> */}
          <div className="flex gap-2 items-center p-2">
            <div className="h-10 w-10">
            <img src={linkedlogo} alt="LinkedIn Logo" className="object-cover w-full h-full"></img>
            </div>
            <TextField id="outlined-basic" label="LinkedIn - url" variant="outlined" className="bg-white dark:bg-[#333] text"  value={LinkedIn} onChange={(e)=>{setLinkedIn(e.target.value)}} />
          </div>
          <div className="flex gap-2 items-center p-2">
            <div className="h-10 w-10 ">
              <img src={RedditLogo}  alt="Reddit Logo" className="object-cover w-full h-full"/>
            </div>
            <TextField id="outlined-basic" label="Reddit - url" variant="outlined" className="bg-white dark:bg-[#333]" value={Reddit} onChange={(e)=>{setReddit(e.target.value)}} />
          </div>
          <div className="flex gap-2 items-center p-2">
            <div className="h-10 w-10">
            <img src={twitter} alt="X Logo" className="object-cover w-full h-full rounded-full"></img>
            </div>
            <TextField id="outlined-basic" label="Twitter - url" variant="outlined" className="bg-white dark:bg-[#333]" value={Twitter} onChange={(e)=>{setTwitter(e.target.value)}}/>
          </div>
          <div className="flex justify-center m-4">
            <div>
              <Button variant="contained" onClick={handleSubmit}>Continue</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Showcase;
