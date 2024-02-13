import React, { useState } from "react";
import Profile from "./Profile";
import Theme from "./Theme";
import { useSelector, useDispatch } from "react-redux";
import { toggleLeftMobileNav } from "../../redux/commonSlice";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const { leftHide, setLeftHide } = props;
  const commonDetails = useSelector((store) => store.commonDetails);
  const { mobileScreenNav } = commonDetails;
  const { title } = props;

  return (
    <div
      className="border-b-2 bg-[#fff] dark:bg-[#171717] dark:text-[#f3f3f3] 
                    border-gray-400 dark:border-none rounded-xl slowmo
                    white flex flew-row lg:justify-between items-center h-[4rem] top-navbar z-10 sm:mb-3 mb-1 lg:w-full"
    >
      <div className="lg:hidden block ml-4">
        <button
          onClick={() => {
            dispatch(toggleLeftMobileNav(!mobileScreenNav));
          }}
        >
          <span class="material-icons-sharp text-black text-2xl dark:text-white">
            menu
          </span>
        </button>
      </div>
      <div className="p-2 px-6 text-2xl font-bold text-title max-lg:mb-[5px]">
        {title}
      </div>
      <div className="lg:flex justify-center items-center gap-5 md:flex-row flex-col-reverse sm:px-6 hidden">
        <Theme />
        <Profile />
      </div>
    </div>
  );
};

export default Navbar;
