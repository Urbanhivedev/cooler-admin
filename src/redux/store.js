import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from './storage';
import jobReducer from './reducers/job.slice';
import coolerReducer from './reducers/cooler.slice';
import authReducer from './reducers/auth.slice';
import candidateReducer from './reducers/candidate.slice';
import loggedInReducer from './reducers/loggedIn.slice';

const reducers = combineReducers({
  jobs: jobReducer,
  coolers: coolerReducer,
  auth: authReducer,
  candidate: candidateReducer,
  loggedIn:loggedInReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
