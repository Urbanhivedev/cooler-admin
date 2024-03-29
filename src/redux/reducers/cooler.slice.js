import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  coolers: [],
  cooler: null,
  error: '',
  message: '',
  coolersOfMember:[]
};


const coolerSlice = createSlice({
  name: 'cooler',
  initialState,
  reducers: {
    fetchCoolers: (state, action) => {
        state.coolers = action.payload;
        state.error = '';
        state.message = '';
      },
    fetchSingleCooler: (state, action) => {
        state.cooler = action.payload;
      },
      saveCoolersOfMember: (state, action) => {
        state.coolersOfMember = action.payload;
      },

    initiatePending: (state) => {
      state.isLoading = true;
      state.error = '';
      state.message = '';
    },
    clearCoolers: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = coolerSlice;

export const {
 fetchCoolers,
 fetchSingleCooler,
 saveCoolersOfMember
} = actions;

export default reducer;


