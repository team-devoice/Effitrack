import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetials: {
    username: "unknown",
    email: "unknown",
    leetcode:'',
    codeforces: '',
    codechef: '',
    github: '',
    socialMedia:{
      linkedIn: undefined,
      twitter: undefined,
      reddit: undefined
    }
  },
  signupData:{
    username:null,
    email:null,
    password:null,
  },
  upcomingContest: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    changeSignupData:(state,action) =>{
      console.log(action.payload);
      const {key,value} = action.payload;
      state.signupData[key] = value;
    },
    changeUserDetails: (state, action) => {
      return {
        ...state,
        userDetials: action.payload,
      };
    },
    changeUpcomingContest: (state, action) => {
      return {
        ...state,
        upcomingContest: action.payload,
      };
    },
  },
});

export const { changeUserDetails, changeUpcomingContest , changeSignupData } = userSlice.actions;

export default userSlice.reducer;
