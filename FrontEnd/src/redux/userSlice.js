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
  addUserDetails:{
    username:'',
    public_username:  '', // Set required to false or remove it if it's optional
    age: '',
    gender:'',
    language:'',
    contact:'',
    state: '',
    college: '',
    startyear: '',
    endyear:'',
    degree: '',
    job: '',
    company: '',
    experience: '',
    cgpa: '',
    school: '',
    rank: '',
    batch:'',
    batchUrl:'',
    effiscore:0,
    role:[],
    project: [],
    programming_language: [],
    certifications:[],
    intern:[],
  }
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
    changeAddUserDetails: (state,action) =>{
      return{
        ...state,
        addUserDetails:action.payload,
      }
    }
  },
});

export const { changeUserDetails, changeUpcomingContest , changeSignupData , changeAddUserDetails} = userSlice.actions;

export default userSlice.reducer;
