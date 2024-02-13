import "./usernameValidation.css";
import login_bg from "../../assets/abstract-flowing-neon-wave-background.jpg";
import GitRepo from "../../assets/github.png";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getCookie } from "../../services/servicehelp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Error = () => {
  return (
    <>
      <div className="input_field errorbox">
        <h1>Invalid username</h1>
        <span className="material-icons-outlined text-[#d73332]">block</span>
      </div>
    </>
  );
};

const Warning = () => {
  return (
    <>
      <div className="input_field warningbox">
        <h1>Username already exist</h1>
        <span className="material-icons-outlined text-[rgba(255,159,10,255)]">
          Warning
        </span>
      </div>
    </>
  );
};

const Validation = () => {
  return (
    <>
      <div className="input_field validationbox">
        <h1>Wait for validation</h1>
        <span className="material-icons-sharp text-[#0090fe]">info</span>
      </div>
    </>
  );
};

const Success = () => {
  return (
    <>
      <div className="input_field successbox">
        <h1>Verified</h1>
        <span className="material-icons-outlined text-[#30d158]">task_alt</span>
      </div>
    </>
  );
};

const UserValid = () => {
  const navigate = useNavigate();
  const [lcUsername, setLcUsername] = useState("");
  const [cfUsername, setCfUsername] = useState("");
  const [ccUsername, setCcUsername] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [lcflag, setLcflag] = useState(0);
  const [ccflag, setCcflag] = useState(0);
  const [cfflag, setCfflag] = useState(0);
  const [githubFlag, setGithubFlag] = useState(0);
  const [verified, setVerified] = useState(0);
  const userSlice  = useSelector((store)=>store.userDetails);
  const {userDetials} = userSlice;

  useEffect(()=>{
    setLcUsername(userDetials.leetcode)
    setCfUsername(userDetials.codeforces)
    setCcUsername(userDetials.codechef)
    setGithubUsername(userDetials.github)
  },[userDetials.leetcode,userDetials.codechef,userDetials.codeforces,userDetials.github])

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_BASE_URL;
    const authToken = getCookie("jwtToken");
    if (!authToken) {
      //   navigate('/login');
    }

    try {
      const axiosInstance = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      });
      setLcflag(3);
      const lcResponse = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/leetcode/exist`,
        { username: lcUsername },
      );
      setLcflag(1);
    } catch (e) {
      setLcflag(2);
    }

    try {
      const axiosInstance = await axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      });

      setCfflag(3);
      const cfResponse = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/codeforces/exist`,
        { username: cfUsername },
      );
      setCfflag(1);
    } catch (e) {
      setCfflag(2);
    }
    try {
      const axiosInstance = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      });

      setCcflag(3);
      const ccResponse = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/codechef/exist`,
        { username: ccUsername },
      );
      setCcflag(1);
    } catch (e) {
      setCcflag(2);
    }

    try {
      const axiosInstance = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      });
      setGithubFlag(3);
      const githubResponse = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/github/exist`,
        { username: githubUsername },
      );
      setGithubFlag(1);
    } catch (error) {
      setGithubFlag(2);
    }
  };
  useEffect(() => {
    if ( ccflag === 1 && cfflag === 1 && lcflag === 1 && githubFlag === 1 ) {
      saveUsername().then((res) => {
        if (res) {
          const waitBro = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve("Promise resolved after 2 seconds");
            }, 2000);
          });
          waitBro.then((waiting_over) => {
            navigate("/");
          });
        } else {
          const waitBro = new Promise((resolve, reject) => {
            setVerified(2);
            setTimeout(() => {
              resolve();
            }, 2000);
          });
          waitBro.then((waiting_over) => {
            setVerified(0);
          });
        }
      });
    }
  }, [lcflag, ccflag, cfflag, githubFlag]);

  const saveUsername = async () => {
    const authToken = getCookie("jwtToken");
    const body = {
      leetcode: lcUsername,
      codechef: ccUsername,
      codeforces: cfUsername,
      github: githubUsername,
    };
    const axiosInstance = axios.create({
      headers: {
        common: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      },
    });
    try {
      const savedUsername = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/user/verifedUsername`,
        body,
      );
      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <>
      <section
        className="valid_section"
        style={{ backgroundImage: `url(${login_bg}) ` }}
      >
        <div className="valid_box">
          <div className="valid_top">
            <h1 className="font-semibold text-3xl mt-4 ml-3 mb-3">Effitrack🚀</h1>
            <h4 className="font-semibold mb-4 ml-5">
              Let's begin your Effitrack journey from here 😄!
            </h4>
          </div>
          <div className="validation_div">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="">Enter Leetcode Username  <span className="text-red-500 text-lg">*</span></label>
                <input
                  type="text"
                  id="leetcode"
                  value={lcUsername}
                  placeholder="Enter here"
                  onChange={(e) => setLcUsername(e.target.value)}
                  required
                  className="block w-[80%] py-1 px-0 text-sm text-white bg-transparent border-0 border-b-2 borer-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer items-center"
                ></input>
                {lcflag === 0 ? (
                  <div></div>
                ) : lcflag === 1 ? (
                  <Success />
                ) : lcflag === 2 ? (
                  <Error />
                ) : (
                  <Validation />
                )}
              </div>
              <div>
                <label htmlFor="codechef">Enter Codechef Username <span className="text-red-500 text-lg">*</span></label>
                <input
                  type="text"
                  placeholder="Codechef username"
                  id="codechef"
                  value={ccUsername}
                  onChange={(e) => setCcUsername(e.target.value)}
                  required
                  className="block w-[80%] py-1 px-0 text-sm text-white bg-transparent border-0 border-b-2 borer-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer items-center"
                ></input>
                {ccflag === 0 ? (
                  <div></div>
                ) : ccflag === 1 ? (
                  <Success />
                ) : ccflag === 2 ? (
                  <Error />
                ) : (
                  <Validation />
                )}
              </div>
              <div>
                <label htmlFor="codeforces">Enter Codeforces Username  <span className="text-red-500 text-lg">*</span></label>
                <input
                  type="text"
                  placeholder="Codeforces username"
                  id="codeforces"
                  value={cfUsername}
                  onChange={(e) => setCfUsername(e.target.value)}
                  required
                  className="block w-[80%] py-1 px-0 text-sm text-white bg-transparent border-0 border-b-2 borer-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer items-center"
                ></input>
                {cfflag === 0 ? (
                  <div></div>
                ) : cfflag === 1 ? (
                  <Success />
                ) : cfflag === 2 ? (
                  <Error />
                ) : (
                  <Validation />
                )}
              </div>
              <div>
                <label htmlFor="github">Enter GitHub Username  <span className="text-red-500 text-lg">*</span></label>
                <input
                  type="text"
                  placeholder="Github username"
                  id="github"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  required
                  className="block w-[80%]  py-1 px-0 text-sm text-white bg-transparent border-0 border-b-2 borer-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer items-center"
                ></input>
                {githubFlag === 0 ? (
                  <div></div>
                ) : githubFlag === 1 ? (
                  <Success />
                ) : githubFlag === 2 ? (
                  <Error />
                ) : (
                  <Validation />
                )}
              </div>
              <div className="submit_div translate-y-[-1rem] -mt-2">
                {verified === 0 ? (
                  <div>
                    <button className=" font-bold mb-4 text-[18px]  rounded-full bg-white text-violet-800 hover:bg-violet-600 hover:text-white py-2 px-10 transition colors duration-300 ">Submit</button>
                  </div>
                ) : verified === 1 ? (
                  <div>
                    <button className="bg-green-400 text-white inline-block p-3 rounded-xl">
                      Verified
                    </button>
                  </div>
                ) : (
                  <div>
                    <button className="bg-red-400 text-white inline-block p-3 rounded-xl">
                      Internet Error
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserValid;
