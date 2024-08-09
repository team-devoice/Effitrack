import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { validateUserName} from '../../Layouts/LoginSignupLayout/Validation'
import { validatePassword } from '../../services/helper'
import { Link, useNavigate } from 'react-router-dom'
import {
    setCookie,
    getCookie,
    deleteCookie,
    storeDataInLocalStorage,
  } from "../../services/servicehelp.js";
  import eyeOpen from "../../assets/eyeOpen.png";
  import eyeClose from "../../assets/eyeClose.png";

import Spinner from '../Spinner'

const tokenName = process.env.REACT_APP_JWT_NAME;

const Login = () => {

    const [position, setPosition] = useState(0)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(true)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const next = async() =>{
        setLoading(true)
        if(position === 0){
            try{
                if(!validateUserName(userName)){
                    setError('username must not contain special characters')
                    return
                }
                setPosition(100)
              } catch(error){
                setError(error.response.data.message)
              }
        }
        if(position === 100){
            const passwordError = validatePassword(password)
            if(passwordError.length > 0){
                setError(passwordError[0])
                setLoading(false)
            }
            else{
                try{
                      const response = await axios.post(
                        `${process.env.REACT_APP_BASE_URL}/user/login/`,
                        {username:userName, password:password},
                      );

                      const data = response.data;
                      if (getCookie(tokenName)) {
                        deleteCookie(tokenName);
                      }
                      // if (getDataFromLocalStorage('mode')) {
                      //   deleteDataFromLocalStorage('mode')
                      // }
                      setCookie(tokenName, data.accessToken, 168);
                      storeDataInLocalStorage('mode',false);
                      navigate("/");
                    if(!response.data.error){
                        navigate('/validUsername')
                    }
                  } catch(error){
                    setError(error.response.data.message)
                  }
            }
        }
        setLoading(false)
    }

    const back = () => {
        if(position < 0){
            setPosition(0)
        }
        else{
            setPosition(position-100)
        }
    } 

    useEffect(()=>{
        setError('')
    },[position])

  return (
    <>
        <div className='absolute flex gap-2 top-4 right-4'>
            <span className='text-[#333333c0]'>New Here? Create an account</span>
            <Link to={'/signup'} className='font-bold'>Sign up</Link>
        </div>
        <div className='max-w-[500px] min-w-[200px] mx-4'>
            <span className='md:text-5xl text-3xl'>Welcome to Effitrack !</span><br/>
            <span className='px-1 text-xl'>Lets connect from here </span><br/>
            <div className='input-container mt-4'>
                <div className={`w-[200%] flex slide-transition`} style={{ transform: `translateX(-${position / 2}%)` }}>
                    <GetUserName error={error} setUserName = {setUserName}/>
                    <GetPassword error={error} setPassword = {setPassword} hidePassword={hidePassword} setHidePassword={setHidePassword}/>
                </div>
            </div>
            <div className='mt-6 flex justify-between'>
                <button className='back' onClick={() => back()}>back</button>
                <button 
                    className='w-[70px] py-1 bg-black text-white rounded-lg text-center mr-2'
                    onClick={() =>next()}
                >
                    {
                        loading? <Spinner/>:'Next'
                    }
                </button>
            </div>
        </div>
    </>
  )
}

const GetUserName = (props) => {
    const setUserName = props.setUserName
    const error = props.error
    return(
        <div className="w-full mr-2">
            <div  className={`px-1 mt-2 text-xl`}>User name</div>
            <input className={`border border-[#c0c0c0] rounded-md w-full h-[40px] mt-2 px-4 ${error===""?"":"shake border border-red-500"}`} onChange={(e)=>{setUserName(e.target.value)}}/>
            {
                error !== ""?
                <div className='text-red-500 text-xs mt-1'>{error}</div>:null
            }
        </div>
    )
}

const GetPassword = (props) => {
    const error = props.error
    const setPassword = props.setPassword
    const hidePassword = props.hidePassword
    const setHidePassword = props.setHidePassword
    return(
        <div className="w-full mr-2">
            <div  className={`px-1 mt-2 text-xl`}>Enter Your password</div>
            <input className={`border border-[#c0c0c0] rounded-md w-full h-[40px] mt-2 px-4 
            ${error===""?"":"shake border border-red-500"}`} onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                type={hidePassword?"password":"text"}
                />
            <span>
                <img src={hidePassword ? eyeClose : eyeOpen} alt={hidePassword ? "Hide password" : "Show password"} className='absolute top-[3.1rem] right-4 h-6 w-6 cursor-pointer'
                onClick={() => setHidePassword(val => !val)}/>                
            </span>
            {
                error !== ""?
                <div className='text-red-500 text-xs mt-1'>{error}</div>:null
            }
        </div>
    )
}

export default Login