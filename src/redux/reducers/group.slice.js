import { createSlice } from '@reduxjs/toolkit';

const initialState = {
       myGroups: [], 
       groupMembers: [], 
       allGroups:[],
       coolerAdmin:{},
       message: '',
      isLoading: false,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    saveMyGroup: (state, action) => {
        state.myGroups = action.payload;
    },
    saveGroupMembers: (state, action) => {
        state.groupMembers = action.payload;
    },
    saveGroups: (state, action) => {
        state.allGroups = action.payload;
    },
    saveCoolerAdmin: (state, action) => {
      state.coolerAdmin = action.payload;
  },
    isItLoading: (state, action) => {
      state.isLoading = action.payload;
  },
    clearGroup: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = groupSlice;

export const {
 saveMyGroup,
 saveGroupMembers,
 saveCoolerAdmin,
 saveGroups,
 isItLoading,
 clearGroup
} = actions;

export default reducer;


