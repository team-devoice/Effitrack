import login_bg from "../../assets/abstract-flowing-neon-wave-background.jpg";
import login from "../../assets/login.png";
import signup from "../../assets/signup.png";
import { useEffect, useState } from "react";
import { LoginForm } from "./LoginForm.js";
import { SignupForm , Validation , SignupUser } from "./SignupForm.js";
import PropTypes from 'prop-types';

export const Login = ({ page , validateOTP }) => {
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    setIsLogin(page);
  }, []);

  return (
    <>
      <div
        className={`h-[100vh] flex justify-center items-center bg-cover`}
        style={{ backgroundImage: `url(${login_bg}) ` }}
      >
        <div
          className={`flex ${isLogin === true ? "flex-row" : "flex-row-reverse"} w-full max-w-[600px] justify-center`}
        >
          <div className="min-w-[350px] hidden items-center justify-center text-white md:flex  bg-slate-950 rounded-tl-xl sm:rounded-l-xl sm:rounded-t-xl">
            <img
              src={isLogin === true ? login : signup}
              alt="login img"
              className="min-w-[420px] z-10 floating-element"
            />
          </div>
          {isLogin ? (
            <LoginForm setIsLogin={setIsLogin} />
          ) : (
            // <SignupForm setIsLogin={setIsLogin} />
            <SignupUser setIsLogin={setIsLogin} validateOTP={validateOTP}/>
          )}
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  page: PropTypes.object, // Check if the prop is an object
};