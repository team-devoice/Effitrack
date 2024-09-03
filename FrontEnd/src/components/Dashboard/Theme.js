import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {toggleMode} from '../../redux/commonSlice';
import {  deleteCookie, 
          getCookie, 
          setCookie, 
          getDataFromLocalStorage, storeDataInLocalStorage, deleteDataFromLocalStorage } from "../../services/servicehelp";

const Theme = (props) => {
  const dispatch = useDispatch();
  const commonDetails = useSelector((store)=>store.commonDetails);
  const {mode} = commonDetails;


  const handleButton = async () => {
    storeDataInLocalStorage('mode',!mode);
    dispatch(toggleMode(!mode));
  };

  return (
    <div className="lg:mr-0 mr-4">
        <button
          className={`flex ${mode ? "flex-row-reverse bg-[#333]" : "flex-row bg-gray-200 "} w-16  rounded-2xl p-1`}
          onClick={handleButton}
        >
        <div className="flex justify-center items-center dark:bg-[#1d1d1d] bg-white p-1 w-[60%] rounded-2xl ease-in-out">
          <span class="material-symbols-outlined">
            {mode ? "dark_mode" : "light_mode"}
          </span>
        </div>
      </button>
    </div>
    
  );
};

export default Theme;
