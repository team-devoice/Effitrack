import React, { useState, useEffect } from "react";
import { getCookie } from "../../services/servicehelp";
import axios from "axios";
import { useSelector } from "react-redux";
import './profile.css'

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
        newImage,
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

export const Profile_edit = () => {
  const myUserDetails = useSelector((state) => state.userDetails);
  const githubDetails = useSelector((store) => store.githubDetails);
  const { userDetials } = myUserDetails;
  const { GithubProfile } = githubDetails;

  const [base64Image, setBase64Image] = useState('');

  useEffect(()=>{
    console.log(base64Image)
  })

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        console.log(typeof(reader.result))
        setBase64Image(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-1/5 bg-[#253D5B] dark:bg-[#1d1d1d] text-white rounded-t-2xl flex px-8 items-center mt-2">
      <div className="h-[10rem] w-[10rem] rounded-full transform sm:translate-y-[40%] translate-y-[30%]">
        {/* <ImageUpload/> */}
        <img
          src={GithubProfile.avatar_url}
          alt="profile pic"
          className="rounded-full"
        ></img>

      </div>
      <div className="flex flex-col gap-2 mx-10">
        <div className="flex gap-3">
          <div className=" text-5xl">{userDetials.username}</div>
          <div className="flex items-end">
            <span class="material-icons-sharp font-semibold text-[2.5rem]">
              psychology
            </span>
          </div>
        </div>
        <div>{userDetials.email}</div>
      </div>
    </div>
  );
};

export const Username_edit = () => {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState();
  const myUserDetails = useSelector((store) => store.userDetails);
  const { userDetials } = myUserDetails;
  useEffect(() => {
    setUsername(userDetials.username);
  }, [userDetials.username]);
  
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

export const Leetcode_edit = () => {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("anonymous");
  const myUserDetails = useSelector((state) => state.userDetails);
  const { userDetials } = myUserDetails;
  useEffect(() => {
    if(userDetials.leetcode === ''){
      setUsername('None')
    }else{
      setUsername(userDetials.leetcode);
    }
    
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
        { newUsername: username },
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
              // <p className="bg-transparent w-full px-4">{username}</p>
            )}
          </div>
        </div>
    
      </div>
    </>
  );
};

export const Codeforces_edit = () => {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("anonymous");

  const myUserDetails = useSelector((state) => state.userDetails);
  const { userDetials } = myUserDetails;
  useEffect(() => {
    if(userDetials.codeforces === ''){
      setUsername('None')
    }else{
      setUsername(userDetials.codeforces);
    }
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
        { newUsername: username },
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

      </div>
    </>
  );
};

export const Codechef_edit = () => {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("anonymous");

  const myUserDetails = useSelector((state) => state.userDetails);
  const { userDetials } = myUserDetails;
  useEffect(() => {
    if(userDetials.codechef === ''){
      setUsername('None');
    }else{
      setUsername(userDetials.codechef);
    }
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
        { newUsername: username },
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
      </div>
    </>
  );
};

export const Github_edit = () => {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("anonymous");
  const myUserDetails = useSelector((state) => state.userDetails);
  const { userDetials } = myUserDetails;
  useEffect(() => {
    if(userDetials.github === ''){
      setUsername('None');
    }else{
      setUsername(userDetials.github);
    }
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
        { newUsername: username },
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
      </div>
    </>
  );
};
