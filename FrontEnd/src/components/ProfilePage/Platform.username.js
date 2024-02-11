import React, { useState, useEffect } from "react";
import { getCookie } from "../../services/servicehelp";
import axios from "axios";
import { useSelector } from "react-redux";
import "./profile.css";

const tokenName = process.env.REACT_APP_JWT_NAME;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState({
    data: "",
    contentType: "image/*",
  });

  const createPost = async (newImage) => {
    const authToken = getCookie(tokenName);
    // if(!authToken){
    //     navigate('/login');
    // }

    try {
      const axiosInstance = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      const lcresponse = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/edit/profileImage`,
        newImage
      );
      console.log(lcresponse);
    } catch (e) {}
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setSelectedImage({ data: base64, contentType: "image/*" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // createPost(selectedImage);
    if (selectedImage) {
      console.log("Selected Image:", selectedImage);
    } else {
      console.log("No image selected");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload">click</label>
        <input
          type="file"
          label="Image"
          name="myfile"
          id="file-upload"
          accept=".jpeg, .jpg, .png"
          className=""
          onChange={handleImageChange}
        ></input>
        <button>submit</button>
      </form>
    </div>
  );
};

export const PROFILE_TOP = () => {
  const myUserDetails = useSelector((state) => state.userDetails);
  const githubDetails = useSelector((store) => store.githubDetails);
  const { userDetials } = myUserDetails;
  const { GithubProfile } = githubDetails;

  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    console.log(base64Image);
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        console.log(typeof reader.result);
        setBase64Image(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-1/5 bg-[#253D5B] dark:bg-[#1d1d1d] text-white rounded-t-2xl flex px-8 items-center mt-2 max-sm:justify-center">
      <div className="h-[10rem] w-[10rem] rounded-full transform sm:translate-y-[40%] translate-y-[30%]">
        {/* <ImageUpload/> */}
        <img
          // src={`https://avatar.vercel.sh/${userDetials.username}.svg?text=${userDetials.username}`}
          src={GithubProfile.avatar_url}
          alt="profile pic"
          className="rounded-full"
        ></img>
        {/* <input
            type="file"
            id="file-input" name="file-input"
            className="hidden"
            onChange={handleImageChange}
          />
          <label for="file-input" className="profile_edit_cover"></label>
          i dont know how this shit works */}
      </div>
      <div className="flex flex-col gap-2 mx-10">
        <div className="flex gap-3">
          <div className="max-[261px]:text-3xl text-5xl">
            {userDetials.username}
          </div>
          <div className="flex items-end">
            {/* <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACt0lEQVR4nO2ZO2gVQRSGP70xoLHQwicWBhULQVFRW1EktZhGQQtLH7ET0kVREJtgYyESSW6iBBS0sVIrEXyAqUVsEowWvoiiV/SODMziYdnHzOzrLtwfTnPnzNn/nzl7zsxe6KKLjsBy4DBwFXgCvAU+AQr4CswBM8BtYBjYByymA6CJTADfDVkX+2gEb6iC+GbgLtD2IB62FnAF6CuL/AlgIQfiYXsDbCuSuM7Z6wUQV8K+AHuKIL8IuFEweWVMv/yb8hZwsSTyytjLPKvUfuBPyQIUcDIP8kuB2QrIK2DePD8TzmckocvspOkVPiV3MAv5PtFNfW1MxGt6zL+XRcAxy9VtJqzugIgXVLG2mZM0L7DPWQQ8TAk+InwnI8a/Ab2iDAfvkiYeYMRiF1b5kF8C/EwI+hhopKTHtBjfLX6XAhomVpKAHT4CdqYcwtZblNmjMX3kL3BIjK0G3ic8z6upHY8Jph9+UPitNeUu7PcbWCn8ZkLj82ZugAMJvUYvkDPOxgQbt9z+R8Jvo2Uajsf4vTDvkBOGMwoYEn5DlgImEtJIZ4QTziWkkMzfNTH52y98okR+ANY5HFfmXO8LgwnB0h7+WoytMO+DzyKohLKdil0pwcLbL/vAhZRmqFPFpYwqYz9crp8Nc7mwXZEp8buu+QGmI+ZpsS6NTMX0kFTcTwmmjwF3QkeCWVExek03jprXNHPbjgK0/15bAUccgytz3gkw4DFfWdg1WwE9HncBucVjBQkYxQGnPbbY9qTpYzolt7oIaEQcA6qwtvkOtQXPr2+tigVsJyNOVSwgF9yqu4BlwLs6C/CpSh0noL8C8gt5CuipQMBzckbZAs7UWcAr8WmmdgKehi7+HSvgJvAAeGYu8FPmJFzYn4B5CygdtRfQypH8ryoEXM5JhI5xqQoBXXTBf/wDVNJccyCI65wAAAAASUVORK5CYII="
              alt="dev"
            /> */}
            <span class="material-icons-sharp font-semibold text-[2.5rem]">
              psychology
            </span>
          </div>
        </div>
        <div className="pl-1">{userDetials.email}</div>
      </div>
    </div>
  );
};

export const USERNAME_EDIT = () => {
  const [edit, setEdit] = useState(false);
  const [username, setUserName] = useState();
  const myUserDetails = useSelector((store) => store.userDetails);
  const { userDetials } = myUserDetails;
  useEffect(() => {
    setUserName(userDetials.username);
  }, [userDetials.username]);
  const handleSave = (e) => {
    setUserName(e.target.value);
  };

  const handleEdit = (val) => {
    if (val === true) {
      setEdit(val);
    } else {
      setEdit(val);
    }
  };

  return (
    <>
      <div className="flex justify-between p-4 border-b-2 dark:border-black text-lg items-center">
        <div className="flex-row flex justify-between w-full items-center">
          <div className="">Username</div>
          <div className="sm:w-[65%] w-[50%] sm:mr-7">
            {edit === true ? (
              <input className="bg-gray-200 w-full px-4" value={username} />
            ) : (
              <input
                className="bg-transparent w-full px-4"
                readOnly
                value={username}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const LEETCODE_EDIT = () => {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("anonymous");
  const myUserDetails = useSelector((state) => state.userDetails);
  const { userDetials } = myUserDetails;
  useEffect(() => {
    setUsername(userDetials.leetcode);
  }, [userDetials.leetcode]);
  const handleEdit = (val) => {
    if (val === true) {
      setEdit(val);
    } else {
      setEdit(val);
    }
  };
  const submitLeet = async () => {
    const authToken = getCookie(tokenName);
    try {
      const axiosInstance = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });

      const lcresponse = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/edit/leetcode`,
        { newUsername: username }
      );
      console.log(lcresponse.body);
    } catch (err) {}
  };
  return (
    <>
      <div className="flex justify-between p-4 border-b-2 dark:border-black text-lg items-center">
        <div className="flex-row flex justify-between w-full items-center">
          <div className="">Leetcode</div>
          <div className="sm:w-[65%] w-[50%] sm:mr-7">
            {edit === true ? (
              <input
                className="bg-white w-full px-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              <input
                className="bg-transparent w-full px-4"
                readOnly
                value={username}
              />
            )}
          </div>
        </div>
        {/* <div>
          {
            (edit===false)?
            <button onClick={()=>handleEdit(!edit)} className="px-2 py-1">
              Edit
            </button>
            :
            <div className="flex gap-3">
              <button onClick={()=>{
                handleEdit(!edit)
                submitLeet();
              }}  className="px-2 py-1 text-white rounded-md bg-slate-600">
                Save
              </button>
              <button onClick={()=>handleEdit(!edit)}  className="px-2 py-1">
                Cancel
              </button>
            </div>
            
          }
        </div> */}
      </div>
    </>
  );
};

export const CODEFORCES_EDIT = () => {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("anonymous");

  const myUserDetails = useSelector((state) => state.userDetails);
  const { userDetials } = myUserDetails;
  useEffect(() => {
    setUsername(userDetials.codeforces);
  }, [userDetials.codeforces]);

  const handleEdit = (val) => {
    if (val === true) {
      setEdit(val);
    } else {
      setEdit(val);
    }
  };

  const submitLeet = async () => {
    const authToken = getCookie(tokenName);
    try {
      const axiosInstance = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });

      const lcresponse = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/edit/codeforces`,
        { newUsername: username }
      );
      console.log(lcresponse.body);
    } catch (err) {}
  };

  return (
    <>
      <div className="flex justify-between p-4 border-b-2 dark:border-black text-lg items-center">
        <div className="flex-row flex justify-between w-full items-center">
          <div className="">
            <h1>CodeForces</h1>
          </div>
          <div className="sm:w-[65%] w-[50%] sm:mr-7">
            {edit === true ? (
              <input
                className="bg-white w-full px-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              <input
                className="bg-transparent w-full px-4"
                readOnly
                value={username}
              />
            )}
          </div>
        </div>
        {/* <div>
          {
            (edit===false)?
            <button onClick={()=>{
              handleEdit(!edit)
              }} className="px-2 py-1">
              Edit
            </button>
            :
            <div className="flex gap-3">
              <button onClick={()=>{
                handleEdit(!edit)
                submitLeet();
                }}  className="px-2 py-1 text-white rounded-md bg-slate-600">
                Save
              </button>
              <button onClick={()=>handleEdit(!edit)}  className="px-2 py-1">
                Cancel
              </button>
            </div>
            
          }
        </div> */}
      </div>
    </>
  );
};

export const CODECHEF_EDIT = () => {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("anonymous");

  const myUserDetails = useSelector((state) => state.userDetails);
  const { userDetials } = myUserDetails;
  useEffect(() => {
    setUsername(userDetials.codechef);
  }, [userDetials.codechef]);
  const handleEdit = (val) => {
    if (val === true) {
      setEdit(val);
    } else {
      setEdit(val);
    }
  };

  const submitLeet = async () => {
    const authToken = getCookie(tokenName);
    try {
      const axiosInstance = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });

      const lcresponse = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/edit/codechef`,
        { newUsername: username }
      );
      console.log(lcresponse.body);
    } catch (err) {}
  };

  return (
    <>
      <div className="flex justify-between p-4 border-b-2 dark:border-black text-lg items-center">
        <div className="flex-row flex justify-between w-full items-center">
          <div className="">CodeChef</div>
          <div className="sm:w-[65%] w-[50%] sm:mr-7">
            {edit === true ? (
              <input
                className="bg-white w-full px-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              <input
                className="bg-transparent w-full px-4"
                readOnly
                value={username}
              />
            )}
          </div>
        </div>
        {/* <div>
          {
            (edit===false)?
            <button onClick={()=>{
                handleEdit(!edit)
                }} className="px-2 py-1">
              Edit
            </button>
            :
            <div className="flex gap-3">
              <button onClick={()=>{
                handleEdit(!edit)
                submitLeet();
                }}  className="px-2 py-1 text-white rounded-md bg-slate-600">
                Save
              </button>
              <button onClick={()=>handleEdit(!edit)}  className="px-2 py-1">
                Cancel
              </button>
            </div>
            
          }
        </div> */}
      </div>
    </>
  );
};

export const GITHUB_EDIT = () => {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("anonymous");
  const myUserDetails = useSelector((state) => state.userDetails);
  const { userDetials } = myUserDetails;
  useEffect(() => {
    setUsername(userDetials.github);
  }, [userDetials.github]);
  const submitLeet = async () => {
    const authToken = getCookie(tokenName);
    try {
      const axiosInstance = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });

      const lcresponse = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/edit/github`,
        { newUsername: username }
      );
      console.log(lcresponse.body);
    } catch (err) {}
  };

  const handleEdit = (val) => {
    if (val === true) {
      setEdit(val);
    } else {
      setEdit(val);
    }
  };

  return (
    <>
      <div className="flex justify-between p-4 border-b-2 dark:border-black text-lg items-center">
        <div className="flex-row flex justify-between w-full items-center">
          <div className="">GitHub</div>
          <div className="sm:w-[65%] w-[50%] sm:mr-7">
            {edit === true ? (
              <input
                className="bg-white w-full px-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              <input
                className="bg-transparent w-full px-4"
                readOnly
                value={username}
              />
            )}
          </div>
        </div>
        {/* <div>
          {
            (edit===false)?
            <button onClick={()=>handleEdit(!edit)} className="px-2 py-1">
              Edit
            </button>
            :
            <div className="flex gap-3">
              <button onClick={()=>{
                handleEdit(!edit)
                submitLeet();
                }}  className="px-2 py-1 text-white rounded-md bg-slate-600">
                Save
              </button>
              <button onClick={()=>handleEdit(!edit)}  className="px-2 py-1">
                Cancel
              </button>
            </div>
            
          }
        </div> */}
      </div>
    </>
  );
};
