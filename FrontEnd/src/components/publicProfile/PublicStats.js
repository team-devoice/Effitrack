import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../services/servicehelp";
import { useNavigate } from "react-router-dom";
import Friends from '../../assets/jpg/friends-removebg.jpg';
import Effitrack from '../../assets/temp_logo.jpeg'
import arrow from "../../assets/jpg/next.jpg"
import './publicStats.css'

const PublicStats = () =>{
    const {id} = useParams();
    const navigate = useNavigate();
    const [effiUsername,setEffiUsername] = useState(undefined);
    const [userNotFound,setUserNotFound] = useState(false);
    const submitButton=async()=>{
        if(effiUsername===undefined){
            setUserNotFound(true);
        }else{
          
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

                
                    const lcresponse = await axiosInstance.post(
                        `${process.env.REACT_APP_BASE_URL}/user/`,{username:effiUsername}
                    );
                    setUserNotFound(false);
                    navigate(`/usernameSearch/${effiUsername}`)
                }
                 catch (error) {
                    setUserNotFound(true);
                }
            }
        }
    }   
    return(
        <>
            <div className="publicStats-top">
                <div className=" text-center flex flex-col gap-y-7 justify-center items-center mx-auto">
                    <div className="py-3 flex flex-col gap-y-4">
                        <div className="flex flex-row gap-x-4 justify-center items-center">
                            {/* <img src={
                                "https://i.ibb.co/0YBRzmJ/temp-logo.jpg"} className="w-[3rem] h-[3rem] rounded-full"></img> */}
                            <h1 className="sm:text-4xl text-2xl font-bold"><span className="text-purple-700">Effitrack Username</span></h1>
                        </div>
                        
                        <p className="sm:text-xl text-lg font-medium"><span className="text-gray-400">Explore your friends growth ! </span>🚀</p>
                    </div>
                    <div className="flex flex-row gap-x-3 justify-center relative items-center">
                        <img src={Effitrack} className="w-[2rem] h-[2rem] rounded-full absolute left-3 top-3" alt="logo"></img>
                        <input type="text" onChange={(e)=>setEffiUsername(e.target.value)} value={effiUsername} className=" effiuser-input" placeholder="Enter effitrack Username">
                            
                        </input>
                        <button onClick={()=>submitButton()} className="arrow-forward-button absolute right-3 top-3">
                            {/* <span className="material-icons-sharp translate-y-1 font-extrabold font-2xl">arrow_forward</span> */}
                            <img className="" src={arrow} alt="arrow"></img>
                        </button>
                    </div>
                    {
                        userNotFound == true ?
                        <>
                            <div className="">
                                <h1 className="text-red-400 font-semibold">Username Not Found !</h1>
                            </div>
                        </>
                        :
                        <></>
                    }
                </div>
                <div className="md:translate-x-[-1rem] md:block hidden">
                    <img src={Friends} className="" alt="friends"></img>
                </div>
            </div>
        </>
    )
}

export default PublicStats;