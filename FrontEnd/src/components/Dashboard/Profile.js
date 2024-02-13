import React, { useState } from "react";
import temp_logo from "../../assets/temp_logo.jpeg";
import { useSelector } from "react-redux";
import {deleteCookie} from "../../services/servicehelp.js";
import { Link, useParams } from "react-router-dom";
import { FaCircleChevronDown } from "react-icons/fa6";
import { RiEditCircleFill } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import './dashboard.css'
const Profile = () => {
  const myUserDetails = useSelector((state) => state.userDetails);
  const githubDetails = useSelector((store) => store.githubDetails);
  const { userDetials } = myUserDetails;
  const { GithubProfile } = githubDetails;
  const [role, setRole] = useState("Student");
  const [subProfile,setSubProfile] = useState(false);
  const [isDropdown,setIsDropdown] = useState(false);
  const {id} = useParams();

  return (
    <>
      <div className="profile_div">
        <div>
          <img src={GithubProfile.avatar_url} alt="user-profile" className="w-[3rem] rounded-[100%]"></img>
        </div>
        <div>
          <div className="text-primary font-medium">{userDetials.username}</div>
          <div className="text-accent">
            <small>{role}</small>
          </div>
        </div>
        {
          id === undefined ?
          <button className="text-xl mt-1 ml-2" onClick={() => setIsDropdown(!isDropdown)} aria-label="Toggle Dropdown">
            <FaCircleChevronDown />
          </button>
          :
          <></>
        }
        
        {isDropdown && ( 
          <div className="pop-up subProfile">
          <div className=" flex flex-col gap-y-2 cursor-pointer">
            <Link to="/validUsername" className="font-medium hover:bg-blue-500 hover:text-white rounded-md flex items-center justify-between p-2">
            <span>Edit</span>
            <div className="text-xl"><RiEditCircleFill /></div>
            </Link>
              <button 
                className="font-medium hover:bg-blue-500 hover:text-white rounded-md flex items-center justify-between p-2"
                onClick={()=>{
                    deleteCookie(process.env.REACT_APP_JWT_NAME)
                    window.location.reload();
                  }}
                >
                    <span>Logout</span>
                    <div className="text-xl"><HiOutlineLogout/></div>
            </button>
          </div>
        </div>)}
      </div>
    </>
  );
};

export default Profile;
