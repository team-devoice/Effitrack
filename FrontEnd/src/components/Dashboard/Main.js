import React, { useState } from "react";
import Navbar from "./Navbar";
import Mid from "./Mid";
import Showcase from "./Showcase";
import EditProfile from "../ProfilePage/Editprofile";
import Footer from "../Footer";
import { useParams } from "react-router-dom";

const Main = (props) => {
  const {id} = useParams();
  return (
    <div className="overflow-hidden lg:h-full h-[100vh]">
      <div className="overflow-hidden w-full h-full dark:bg-[#333] bg-[#e1e1e1] p-3 pb-0 ">
        <div className="overflow-y-auto w-full h-full no-scrollbar flex flex-col justify-between">
            <div>
               <Navbar
               className=""
               title={`${id === undefined ? "Dashboard" :"Friends"}`}
              />
              
                <Mid />
                <Showcase />
          </div>
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Main;
