import React, { useEffect } from 'react'
// import PublicStats from "./PublicStats"
import Footer from "../Footer"
import Navbar from "../Dashboard/Navbar"
import { SearchBar, DropdownList, TopThree, UsersList } from './TopPerformersComponents'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate , Outlet , useParams} from "react-router-dom";
import { getCookie } from "../../services/servicehelp";



const tokenName = process.env.REACT_APP_JWT_NAME;

const TopPerformers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
    // const [searchType, setSearchType] = useState();
  const [topThree, setTopThree] = useState([]);

  const handleUserClick = async(username) =>{
    const authToken = getCookie(process.env.REACT_APP_JWT_NAME);
        if (!authToken) {
            navigate("/login");
            return;
        }
        try {
          navigate(`/usernameSearch/${username}`)
      }
       catch (error) {
          console.log(error.message)
      }
        
  }

  const helper = async () => {
    try {
        const authToken = getCookie(tokenName);
        if (!authToken) {
            navigate("/login");
            return; // Exit function early if no authToken
        }
        
        const response = await axios.get('http://localhost:5000/api/user/ranking', {
            headers: {
                common: {
                    Authorization: `Bearer ${authToken}`,
                },
            },
        });

        const userData = response.data.message;
        setUsers(userData);
        setTopThree(userData.slice(0, 3));
        console.log(userData.slice(0, 3));
        setUsers(userData.slice(3));
    } catch (err) {
        console.log(err);
    }
};

useEffect(() => {
    helper();
}, []);
  return (
    <div className="overflow-hidden lg:h-full h-[100vh]">
          <div className="overflow-hidden h-full dark:bg-[#333] bg-[#e1e1e1] p-3 pb-0 ">
            <div className="overflow-y-auto w-full h-full no-scrollbar flex flex-col justify-between">
              <div>
                <Navbar
                  className=""
                  title={"Leader Board"}
                />
                <div className='p-2 rounded-xl bg-[#fafafa] dark:bg-[#1c1d1c]'>
                   <div className='w-[62rem] mx-auto py-2 flex flex-row justify-between'>
                      <div className='flex flex-row gap-x-4'> 
                        <SearchBar/>
                        <DropdownList/>
                      </div>
                      <div className='flex items-center'>
                        <button className=''>
                          <span className="material-icons-sharp text-black dark:text-white">refresh</span>
                        </button>
                      </div>
                    </div>
                  <div className="p-1 flex gap-4 justify-center items-center flex-col sm:flex-row">
                     
                      {topThree && topThree.map((user, index)=>{
                          return(
                              <button onClick={()=>{handleUserClick(user.username)}}>
                                <TopThree key={index} position={index+1} username={user.username}/>
                              </button>
                          )
                      })}
                  </div>
                  <div className="p-1 flex flex-col gap-2 justify-center items-center mt-6">
                      {users.map((user, index)=>{
                          return(
                              <button onClick={()=>{handleUserClick(user.username)}} className='sm:max-w-[62rem] w-full h-auto'>
                                <UsersList key={index}
                                  position={index+4} 
                                  name={user.username}
                                  rank={index+1}
                                  EffitrackScore={1025}
                                />
                              </button>
                          )
                      })}
                  </div>
                </div>
              </div>
              <footer>
                <Footer />
              </footer>
            </div>
          </div>
        </div>
  )
}

export default TopPerformers