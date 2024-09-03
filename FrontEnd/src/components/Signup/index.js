import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {validateEmail, validateUserName} from '../../Layouts/LoginSignupLayout/Validation'
import { validatePassword } from '../../services/helper'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../Spinner'
import eyeOpen from "../../assets/eyeOpen.png";
import eyeClose from "../../assets/eyeClose.png";

const Signup = () => {

    const [position, setPosition] = useState(0)
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [hidePassword, setHidePassword] = useState(true)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const next = async() =>{
        setLoading(true)
        if(position === 0){
            try{
                if(!validateEmail(email)){
                    setError('Please enter a valid email')
                    setLoading(false)
                    return
                }
                const response = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/user/existEmail/`,
                    {email:email},
                  );
                if(!response.data.error){
                    setPosition(100)
                }
              } catch(error){
                setError(error.response.data.message)
              }
        }
        if(position === 100){
            try{
                if(!validateUserName(userName)){
                    setError('username must not contain special characters')
                    return
                }
                const response = await axios.post(
                  `${process.env.REACT_APP_BASE_URL}/user/existUsername/`,
                  {username:userName},
                ); 
                if(!response.data.error){
                    setPosition(200)
                }
              } catch(error){
                setError(error.response.data.message)
              }
        }
        if(position === 200){
            const passwordError = validatePassword(password)
            if(passwordError.length > 0){
                setError(passwordError[0])
                setLoading(false)
            }
            else{
                try{
                    const response = await axios.post(
                        `${process.env.REACT_APP_BASE_URL}/user/register/`,
                        {email:email, username:userName, password:password},
                      );
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
            <span className='text-[#333333c0]'>Already signed up?</span>
            <Link to={'/login'} className='font-bold'>Log in</Link>
        </div>
        <div className='max-w-[500px] min-w-[200px] mx-4'>
            <span className='md:text-5xl text-3xl'>Welcome to Effitrack !</span><br/>
            <span className='px-1 text-xl'>Lets connect from here </span><br/>
            <div className='input-container mt-4'>
                <div className={`w-[300%] flex slide-transition`} style={{ transform: `translateX(-${position / 3}%)` }}>
                    <GetEmail error={error} setEmail = {setEmail}/>
                    <GetUserName error={error} setUserName = {setUserName}/>
                    <GetPassword error={error} setPassword = {setPassword}  hidePassword={hidePassword} setHidePassword={setHidePassword}/>
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

const GetEmail = (props) => {
    const error = props.error
    const setEmail = props.setEmail
    return(
        <div className={`w-full mr-2`}>
            <div className={`px-1 mt-2 text-xl`}>Email Address</div>
            <input className={`border border-[#c0c0c0] rounded-md w-full h-[40px] mt-2 px-4 ${error===""?"":"shake border border-red-500"}`} onChange={(e)=>{setEmail(e.target.value)}}/>
            {
                error !== ""?
                <div className='text-red-500 text-xs mt-1'>{error}</div>:null
            }
        </div>
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
            <input className={`border border-[#c0c0c0] rounded-md w-full h-[40px] mt-2 px-4 ${error===""?"":"shake border border-red-500"}`} onChange={(e)=>{
                    setPassword(e.target.value)
                }}type={hidePassword?"password":"text"}
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

export default Signup