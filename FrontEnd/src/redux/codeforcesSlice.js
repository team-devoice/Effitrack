import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cfProfile: [
    {
      lastName: "unknown",
      country: "unknown",
      lastOnlineTimeSeconds: 0,
      city: "unknown",
      rating: 0,
      friendOfCount: 0,
      titlePhoto: "x",
      handle: "unknown",
      avatar: "unknown",
      firstName: "unknown",
      contribution: 0,
      organization: "Effitrack",
      rank: "newbie",
      maxRating: 0,
      registrationTimeSeconds: 0,
      maxRank: "newbie",
    },
  ],
  cfRating: [],
};

const codeforcesSlice = createSlice({
  name: "codeforcesSlice",
  initialState,
  reducers: {
    cfModifyProfile: (state, action) => {
      return {
        cfRating: state.cfRating,
        ...state,
        cfProfile: action.payload,
      };
    },
    cfModifyRating: (state, action) => {
      // if (action.payload.length > 0) {
      //   if (state.cfRating.length == 0) {
      //     state.cfRating.push(action.payload);
      //   }
      // }
      return    {
        ...state,
        cfRating:action.payload
      }
    },
  },
});

export const { cfModifyRating, cfModifyProfile } = codeforcesSlice.actions;

export default codeforcesSlice.reducer;
