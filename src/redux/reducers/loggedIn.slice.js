import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails:'',
  isLoading: false,
  error: 'none',
  message: 'none',
};

const loggedInSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
      state.error = '';
      state.message = '';
    },
    loginSuccess: (state, action) => {
         console.log(action)
      state.isLoading = false;
        state.userDetails = action.payload;
        state.error = '';
        state.message = action.payload.msg;
    },
    loginFailed: (state, { payload }) => {
      (state.isLoading = false);
        (state.error = payload.errorMessage);
    },
    clearUser: (state) => {
      return {
        ...initialState,
      };
    },
    

   
  },
});

const { actions, reducer } = loggedInSlice;

export const {
  loginPending,
  loginSuccess,
  loginFailed,

} = actions;

export default reducer;