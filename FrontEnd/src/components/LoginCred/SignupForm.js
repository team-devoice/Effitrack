import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLessThanEqual } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import axios from "axios";
import otpSvg from "../../assets/jpg/otp-validation.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  setCookie,
  getCookie,
  deleteCookie,
} from "../../services/servicehelp.js";
import './logincred.css';
import {validatePassword} from "../../services/helper.js";
const tokenName = process.env.REACT_APP_JWT_NAME;



export const Validation = (props) =>{
  const navigate = useNavigate();
  const {firstDigit,secondDigit,thirdDigit,fourthDigit,setThirdDigit,setFourthDigit,setSecondDigit,setFirstDigit,setEmail,setOtpError,email,signUpVerification,otpError} = props;
  const [optMessage,setOptMessage] = useState("Send OTP");  
  function check(e,digit){
    if(Number.isInteger(Number(e.value)) && digit === "1"){
      setFirstDigit(e.value);
    }
    if(Number.isInteger(Number(e.value)) && digit === "2"){
      setSecondDigit(e.value);
    }
    if(Number.isInteger(Number(e.value)) && digit === "3"){
      setThirdDigit(e.value);
    }
    if(Number.isInteger(Number(e.value)) && digit === "4"){
      setFourthDigit(e.value);
    }
  }

  useEffect(()=>{
    const email = getCookie(process.env.REACT_APP_SIGNUP_EMAIL);
    setEmail(email);
  },[])

  const sendOTP = async () =>{
    
      try{
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/otp/send-otp`,{email:email})
        setOptMessage("Resend");
        setOtpError(null);
      }catch(err){
        // 
        console.log(err);
      }
  }
  function navigateToSignup(){
    navigate("/signup");
  }
  return (
    <>
       <button className="absolute z-10 right-6 top-4" onClick={navigateToSignup}>
          <span className="material-icons-sharp text-white">arrow_back</span>
        </button>
      <div 
          className="text-white min-w-[350px] flex flex-col justify-center items-center gap-y-4 p-8  bg-slate-800 border-slate-400 rounded-tr-xl backdrop-filter backdrop-blur-sm bg-opacity-30 relative sm:rounded-r-xl sm:rounded-t-xl ">
        <div> 
          <h1 className="text-4xl text-white font-bold text-center ">
            Validation
          </h1>
        </div>
        <div className="w-full flex flex-col gap-y-4">
            <div className="w-[50%] mx-auto"> 
              <img src={otpSvg}></img>
            </div>

            <div className="flex flex-col gap-y-3 text-center">
              <h1 className="">OTP for validation</h1>
              <p>Enter the 6-digit code send</p>
              <div className="grid grid-cols-4 px-8 gap-4">
                  <input type="text" className="each-digit-opt" value={firstDigit} maxLength={1} step={1} onChange={(e)=>{check(e.target,"1")}} required></input>
                  <input type="text" className="each-digit-opt" value={secondDigit} maxLength={1} step={1} onChange={(e)=>{check(e.target,"2")}} required></input>
                  <input type="text" className="each-digit-opt" value={thirdDigit} maxLength={1} step={1} onChange={(e)=>{check(e.target,"3")}} required></input>
                  <input type="text" className="each-digit-opt" value={fourthDigit} maxLength={1} step={1} onChange={(e)=>{check(e.target,"4")}} required></input>
              </div>
              <div className="flex justify-between items-center ">
                <p className="">OTP valid time 5 minutes !</p>
                <button className="rounded-xl bg-purple-500 px-1 py-2 " onClick={()=>{
                  sendOTP()
                }}>{optMessage}</button>
              </div>
            </div>
           
        </div>
        <div>
          <p>{otpError}</p>
        </div>
        <button
          className="w-[70%] font-bold mb-4 text-[18px] mt-4 rounded-full bg-white text-violet-800 hover:bg-violet-600 hover:text-white py-2 transition colors duration-300"
          type="submit" onClick={()=>signUpVerification()}
        >
          Verify  
        </button>

      </div>
    </>
  )
}

const UserInfo = (props) =>{
  const {username,setUsername,password,setPassword,
        showPassword,setIsLogin,setShowPassword,
        usernameError,setUsernameError,passwordError,setPasswordError,
       email,setEmail,setEmailErrorMessage,emailErrorMessage} = props;

  useEffect(()=>{
    const username = getCookie("username");
    const email = getCookie("email");
    const password = getCookie("password");
    if(username)setUsername(username);else setUsername(null)
    if(email)setEmail(email) ; else setEmail(null)
    if(password)setPassword(password) ; else setPassword(null)
  },[])

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const toLogin = () => {
    setIsLogin(true);
    navigate("/login");
  };

  const checkInputs = async () =>{
      try{
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/user/existUsername/`,
          {username:username},
        ); 
        setCookie(process.env.REACT_APP_SIGNUP_USERNAME,username,15/60);
        setUsernameError(false);
      } catch(error){

          setUsernameError(error.response.data.message);
      }
      try{
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/user/existEmail/`,
          {email:email},
        ); 
        setCookie(process.env.REACT_APP_SIGNUP_EMAIL,email,15/60);
        setEmailErrorMessage(false);
      } catch(error){
        setEmailErrorMessage(error.response.data.message);
      }

      const passwordValidMessage = validatePassword(password);
      if (passwordValidMessage.length === 0) {
        setCookie(process.env.REACT_APP_SIGNUP_PASSWORD,password,15/60);
        setPasswordError(false);
      } else {
        setPasswordError(passwordValidMessage[0]);
      }
      // if all are satisfied then navigate to otp page
      if(usernameError === false && passwordError === false && emailErrorMessage === false){
        navigate("/signup/otpverify");
      }
  } 

  return(
    <>
         <div
            className="text-white flex flex-col justify-center items-center gap-y-4 p-14 py-10 bg-slate-800 border-slate-400 rounded-tr-xl backdrop-filter backdrop-blur-sm bg-opacity-30 relative sm:rounded-r-xl sm:rounded-t-xl w-full"
          >
            <h1 className="text-4xl text-white font-bold text-center mb-6">
              Register
            </h1>
            <div className="relative ">
              <input
                type="text"
                name="firstName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={`block w-72 py-1 px-0 text-sm text-white bg-transparent border-0 border-b-2 ${usernameError === null ? "border-gray-300" : (usernameError === false) ? "border-green-500" : "border-red-600"} appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer `}
                placeholder=""
              />
              <label
                htmlFor=""
                className="text-gray absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer=focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus-translate-y-6 "
              >
                Username
              </label>
              <BiUser className="absolute top-1 right-4" />
            </div>
            <div className="text-left block w-full">
              <p className="text-sm">{usernameError}</p>
            </div>
            <br />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`block w-72 py-1 px-0 text-sm text-white bg-transparent border-0 border-b-2 ${passwordError === null ? "border-gray-300" : (passwordError === false) ? "border-green-500" : "border-red-600"}  appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer`}
                placeholder=""
              />
              <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer=focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus-translate-y-6 ">
                Password
              </label>
              <div
                className="absolute top-1 right-4 cursor-pointer"
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>

              {/* <br /> */}
            </div>
            <div className="text-left block w-full ">
              <p className="text-sm">{passwordError}</p>
            </div>
            <br/>
            <div className="relative ">     
              <input
                type="email"
                name="lastName"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={` block w-72 py-1 px-0 text-sm text-white ${emailErrorMessage === null ? "border-gray-300" : (emailErrorMessage === false) ? "border-green-500" : "border-red-600"} bg-transparent border-0 border-b-2  appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer `}
                placeholder=""
              />
              <label
                htmlFor=""
                className="text-gray absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer=focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus-translate-y-6 "
              >
                Email
              </label>
              <AiOutlineMail className="absolute top-1 right-4" />
            </div>
           
            <div className="text-left block w-full ">
              <p className="text-sm">{emailErrorMessage}</p>
            </div>
                      {/* <br/> */}
            <p>
              Already have an account ?{" "}
              <button className="text-blue-500" onClick={() => toLogin()}>
                Login
              </button>
            </p>
            {<button
              className="w-[70%] font-bold mb-4 text-[18px] mt-4 rounded-full bg-white text-violet-800 hover:bg-violet-600 hover:text-white py-2 transition colors duration-300"
              type="submit" onClick={()=>checkInputs()}
            >
              Verify 
            </button>}
      </div>
    </>
  )
}


export const SignupUser = (props) =>{
  const { setIsLogin , validateOTP} = { ...props };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstDigit,setFirstDigit] = useState(null);
  const [secondDigit,setSecondDigit] = useState(null);
  const [thirdDigit,setThirdDigit] = useState(null);
  const [fourthDigit,setFourthDigit] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [otpError, setOtpError] = useState(null);

  useEffect(()=>{
    const username = getCookie("username");
    const email = getCookie("email");
    const password = getCookie("password");
    if(username)setUsername(username);else setUsername(null)
    if(email)setEmail(email) ; else setEmail(null)
    if(password)setPassword(password) ; else setPassword(null)
  },[])


  const [emailErrorMessage,setEmailErrorMessage] = useState(null);

const navigate = useNavigate();

  async function signUpVerification(){
    try {
      const otp = firstDigit + secondDigit + thirdDigit + fourthDigit ;
      const userData = {
        username: username,
        password: password,
        email: email,
        otp:otp,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/register/`,
        userData,
      );
      deleteCookie(process.env.REACT_APP_SIGNUP_USERNAME);
      deleteCookie(process.env.REACT_APP_SIGNUP_EMAIL);
      deleteCookie(process.env.REACT_APP_SIGNUP_PASSWORD);
      deleteCookie(process.env.REACT_APP_JWT_NAME);
      setCookie(process.env.REACT_APP_JWT_NAME,response.data.message.accessToken,168);
      setOtpError(false);
      var successMessage = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },2000);
      })
      successMessage.then(()=>{
        navigate("/validUsername")
      })
    }
    catch(err){
      setOtpError(err.response.data.message);
    }
  }



  return(
    <>
      <div className="relative">
        
      {
        !validateOTP ?
          <UserInfo username={username} setUsername={setUsername}
                  password={password} setPassword={setPassword} showPassword={showPassword} setShowPassword={setShowPassword} 
                  setIsLogin={setIsLogin}  
                  email={email} setEmail={setEmail} emailErrorMessage={emailErrorMessage} setEmailErrorMessage={setEmailErrorMessage}
                  usernameError ={usernameError} setUsernameError={setUsernameError}
                  passwordError ={passwordError} setPasswordError={setPasswordError}
          />
          :
          <Validation firstDigit={firstDigit} setFirstDigit={setFirstDigit}
                      secondDigit={secondDigit} setSecondDigit={setSecondDigit}
                      thirdDigit={thirdDigit} setThirdDigit={setThirdDigit}
                      fourthDigit={fourthDigit} setFourthDigit={setFourthDigit} email={email} setEmail={setEmail}
                      signUpVerification = {signUpVerification} otpError={otpError} setOtpError={setOtpError}
          />
      }
      </div>

    </>
  )
}