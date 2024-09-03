import React from 'react'
import temp_logo from "../../assets/temp_logo.jpeg";
import welcome_img from "../../assets/welcome.jpg"
import "./loginSignup.css";
import Signup from '../../components/Signup';
import Login from '../../components/Login';

const LoginSignupLayout = (props) => {
    const AuthMethod = {...props};
  return (
    <div className='w-full flex h-[100vh]'>
        <div className='left-container'>
            <div className="absolute welcome-logo">
                <img
                    src={temp_logo}
                    className="w-[50px] h-[50px] rounded-full"
                    alt="logo"
                ></img>
                <h1 className="text-3xl font-semibold">
                    <span>Effi</span>track
                </h1>
            </div>
            <div>
                <img src={welcome_img} alt='welcome' className='w-[500px] image-inverted'/>
            </div>
        </div>
        <div className='right-container container'>
           {AuthMethod.AuthMethod === "login"? <Login/>: <Signup/>}
        </div>
    </div>
  )
}

export default LoginSignupLayout