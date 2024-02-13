import { useState, useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Leftnav from "./components/Dashboard/Leftnav";
import { modifyCount, modifyRating } from "././redux/LeetcodeSlice";
import { cfModifyRating, cfModifyProfile } from "././redux/codeforcesSlice";
import { ccUpdateUserDetails } from "././redux/codechefSlice";
import { updateGithubRepo, updateGithubProfile } from "././redux/githubSlice";
import { getCookie } from "././services/servicehelp";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { changeUserDetails, changeUpcomingContest } from "././redux/userSlice";

const tokenName = process.env.REACT_APP_JWT_NAME;

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const commonDetails = useSelector((store) => store.commonDetails);
  const { mode } = commonDetails;
  const [display, setDisplay] = useState("dashboard");
  const { id } = useParams();

  useEffect(() => {
    checkAuth();
    leetcodeData();
    codeforcesData();
    codechefData();
    githubData();
  }, [id]);

  useEffect(() => {
    checkAuth();
    leetcodeData();
    codeforcesData();
    codechefData();
    githubData();
  }, []);

  const checkAuth = async () => {
    const authToken = getCookie(tokenName);
    if (!authToken) {
      navigate("/login");
    } else {
      try {
        const axiosInstance = axios.create({
          headers: {
            common: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        });

        if (id !== undefined) {
          const lcresponse = await axiosInstance.post(
            `${process.env.REACT_APP_BASE_URL}/user/`,
            { username: id }
          );
          dispatch(changeUserDetails(lcresponse.data.message));
        } else {
          const lcresponse = await axiosInstance.get(
            `${process.env.REACT_APP_BASE_URL}/user/`
          );
          dispatch(changeUserDetails(lcresponse.data.message));
        }
      } catch (error) {
        if (error.response.status === 404) {
          navigate("/user/404error");
        }
        if (error.response.status === 401 || error.response.status === 400) {
          navigate("/login");
        }
      }

      try {
        const axiosInstance = axios.create({
          headers: {
            common: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        });
        if (id !== undefined) {
          const lcresponse = await axiosInstance.post(
            `${process.env.REACT_APP_BASE_URL}/user/upcoming`,
            { username: id }
          );
          dispatch(changeUpcomingContest(lcresponse.data.message));
        } else {
          const lcresponse = await axiosInstance.get(
            `${process.env.REACT_APP_BASE_URL}/user/upcoming`
          );
          dispatch(changeUpcomingContest(lcresponse.data.message));
        }
      } catch (error) {
        if (
          error.response.request.status === 409 ||
          error.response.request.status === 500 ||
          error.response.data.error
        ) {
          console.log(error.response.data.message);
        }
      }
    }
  };

  const leetcodeData = async () => {
    const authToken = await getCookie(tokenName);

    if (!authToken) {
      navigate("/login");
    }

    try {
      const axiosInstance = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      if (id !== undefined) {
        const lcresponse = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/leetcode/count`,
          { username: id }
        );
        const data = lcresponse.data.message;
        dispatch(modifyCount(data));
      } else {
        const lcresponse = await axiosInstance.get(
          `${process.env.REACT_APP_BASE_URL}/leetcode/count`
        );
        const data = lcresponse.data.message;
        dispatch(modifyCount(data));
      }
    } catch (error) {
      if (error.response.data.error || error.response.request.status === 400) {
        console.log(error.response.data.message);
      }
    }

    try {
      const axiosInstance = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      if (id !== undefined) {
        const lcresponse = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/leetcode/rating`,
          { username: id }
        );
        const data = lcresponse.data.message;

        dispatch(modifyRating(data));
      } else {
        const lcresponse = await axiosInstance.get(
          `${process.env.REACT_APP_BASE_URL}/leetcode/rating`
        );
        const data = lcresponse.data.message;

        dispatch(modifyRating(data));
      }
    } catch (error) {
      if (
        error.response.data.error ||
        error.response.request.status === 404 ||
        error.response.request.status === 500
      ) {
        console.log(error.response.data.message);
      }
    }
  };

  const codeforcesData = async () => {
    const authToken = await getCookie(tokenName);
    if (!authToken) {
      navigate("/login");
    }

    try {
      const axiosInstance = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      if (id !== undefined) {
        const lcresponse = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/codeforces/rating`,
          { username: id }
        );
        const data = lcresponse.data.message;
        dispatch(cfModifyRating(data));
      } else {
        const lcresponse = await axiosInstance.get(
          `${process.env.REACT_APP_BASE_URL}/codeforces/rating`
        );
        const data = lcresponse.data.message;
        dispatch(cfModifyRating(data));
      }
    } catch (error) {
      if (
        error.response.data.error ||
        error.response.request.status === 404 ||
        error.response.request.status === 500
      ) {
        console.log(error.response.data.message);
      }
    }

    try {
      const axiosInstance = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      if (id !== undefined) {
        const lcresponse = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/codeforces/count`,
          { username: id }
        );
        const data = lcresponse.data.message;
        dispatch(cfModifyProfile(data));
      } else {
        const lcresponse = await axiosInstance.get(
          `${process.env.REACT_APP_BASE_URL}/codeforces/count`
        );
        const data = lcresponse.data.message;
        dispatch(cfModifyProfile(data));
      }
    } catch (error) {
      if (
        error.response.data.error ||
        error.response.request.status === 404 ||
        error.response.request.status === 500
      ) {
        console.log(error.response.data.message);
      }
    }
  };

  const codechefData = async () => {
    const authToken = await getCookie(tokenName);
    if (!authToken) {
      navigate("/login");
    }

    try {
      const axiosInstance = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      if (id !== undefined) {
        const lcresponse = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/codechef/details`,
          { username: id }
        );
        const data = lcresponse.data.message;
        dispatch(ccUpdateUserDetails(data));
      } else {
        const lcresponse = await axiosInstance.get(
          `${process.env.REACT_APP_BASE_URL}/codechef/details`
        );
        const data = lcresponse.data.message;
        dispatch(ccUpdateUserDetails(data));
      }
    } catch (error) {
      if (
        error.response.data.error ||
        error.response.request.status === 400 ||
        error.response.request.status === 404
      ) {
        console.log(error.response.data.message);
      }
    }
  };

  const githubData = async () => {
    const authToken = await getCookie(tokenName);
    if (!authToken) {
      navigate("/login");
    }

    try {
      const axiosInstance = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      if (id !== undefined) {
        const lcresponse = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/github/repo`,
          { username: id }
        );
        const data = lcresponse.data.message;
        dispatch(updateGithubRepo(data));
      } else {
        const lcresponse = await axiosInstance.get(
          `${process.env.REACT_APP_BASE_URL}/github/repo`
        );
        const data = lcresponse.data.message;
        dispatch(updateGithubRepo(data));
      }
    } catch (error) {
      if (
        error.response.data.error ||
        error.response.request.status === 400 ||
        error.response.request.status === 404
      ) {
        console.log(error.response.data.message);
      }
    }

    try {
      const axiosInstance = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      if (id !== undefined) {
        const lcresponse = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/github/profile`,
          { username: id }
        );
        const data = lcresponse.data.message;
        dispatch(updateGithubProfile(data));
      } else {
        const lcresponse = await axiosInstance.get(
          `${process.env.REACT_APP_BASE_URL}/github/profile`
        );
        const data = lcresponse.data.message;
        dispatch(updateGithubProfile(data));
      }
    } catch (error) {
      if (
        error.response.data.error ||
        error.response.request.status === 400 ||
        error.response.request.status === 404
      ) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className={`${mode === true ? "dark" : ""}`}>
        <div className="home_section bg-gray-400 dark:bg-[#484849] h-full lg:h-[100vh] scrollbar-hide overflow-hidden">
          <Leftnav display={display} setDisplay={setDisplay} />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
