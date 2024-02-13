import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  setCookie,
  getCookie,
  deleteCookie,
} from "../../services/servicehelp.js";

const base_url = process.env.REACT_APP_BASE_URL;
const tokenName = process.env.REACT_APP_JWT_NAME;

export const SignupForm = (props) => {
  const { setIsLogin } = { ...props };

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username: username,
        password: password,
        email: email,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/register/`,
        userData,
      );

      if (getCookie(tokenName)) {
        deleteCookie(tokenName);
      }
      setCookie(tokenName, response.data.message.accessToken, 168);
      let newPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("validation page");
        }, 3000);
      });
      newPromise.then((res) => {
        navigate("/validUsername");
      });
    } catch (error) {
      if (error.response && error.response.status === 406) {
        setErrorMessage(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const toLogin = () => {
    setIsLogin(true);
    navigate("/login");
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="text-white flex flex-col justify-center items-center gap-y-4 p-14 py-10 bg-slate-800 border-slate-400 rounded-tr-xl shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative sm:rounded-r-xl sm:rounded-t-xl w-full"
      >
        <h1 className="text-4xl text-white font-bold text-center mb-6">
          Register
        </h1>
        <div className="relative my-2">
          <input
            type="text"
            name="firstName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="block w-72 py-1 px-0 text-sm text-white bg-transparent border-0 border-b-2 borer-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer "
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
        <br />
        <div className="relative my-2">
          <input
            type="email"
            name="lastName"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-72 py-1 px-0 text-sm text-white bg-transparent border-0 border-b-2 borer-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer "
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
        <br />
        <div className="relative my-2">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-72 py-1 px-0 text-sm text-white bg-transparent border-0 border-b-2 borer-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer "
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

          <br />
        </div>
        <p>
          Already have an account ?{" "}
          <button className="text-blue-500" onClick={() => toLogin()}>
            Login
          </button>
        </p>
        <label>{errorMessage}</label>
        <button
          className="w-[70%] font-bold mb-4 text-[18px] mt-4 rounded-full bg-white text-violet-800 hover:bg-violet-600 hover:text-white py-2 transition colors duration-300"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <ToastContainer />
    </>
  );
};
