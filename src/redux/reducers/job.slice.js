import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  job: {},
  error: '',
  message: '',
  coolerGroups:[],
  isLoading: false,
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    fetchJobs: (state, action) => {
        state.jobs = action.payload;
        state.error = '';
        state.message = '';
      },
    fetchSingleJob: (state, action) => {
        state.job = action.payload;
      },

      saveCoolerGroups: (state, action) => {
        state.coolerGroups = action.payload;
      },
      isItLoading: (state, action) => {
        state.isLoading = action.payload;
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

const { actions, reducer } = jobSlice;

export const {
 fetchJobs,
 fetchSingleJob,
 saveCoolerGroups,
 isItLoading
} = actions;

export default reducer;


