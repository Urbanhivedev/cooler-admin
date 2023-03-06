import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employers: [],
  employer: null,
  error: '',
  message: '',
};

const employerSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {
    fetchEmployers: (state, action) => {
        state.employers = action.payload;
        state.error = '';
        state.message = '';
      },
    fetchSingleEmployer: (state, action) => {
        state.employer = action.payload;
      },

      confirmDeletedEmployer: (state, action) => {
        state.message = action.payload;
      },


    initiatePending: (state) => {
      state.isLoading = true;
      state.error = '';
      state.message = '';
    },
    clearUser: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = employerSlice;

export const {
 fetchEmployers,
 fetchSingleEmployer,
 confirmDeletedEmployer 
} = actions;

export default reducer;


