import React from "react";
import {
  Profile_edit,
  Username_edit,
  Leetcode_edit,
  Codeforces_edit,
  Codechef_edit,
  Github_edit,
} from "./Platform.username";

const EditProfile = () => {
  return (
    <div className="flex flex-col lg:gap-y-12 md:gap-y-10 sm:gap-y-8  mb-4">
      <div>
        <Profile_edit />
      </div>
      <div className="flex w-full justify-center items-center mt-4 dark:text-white text-center">
        <div className="lg:w-[65%] md:w-[70%] sm:w-[75%] w-[98%] p-5 h-full rounded-xl">
          <Username_edit />
          <Leetcode_edit />
          <Codeforces_edit />
          <Codechef_edit />
          <Github_edit />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
