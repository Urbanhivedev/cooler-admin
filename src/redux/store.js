import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from './storage';
import jobReducer from './reducers/job.slice';
import employerReducer from './reducers/employer.slice';
import coolerReducer from './reducers/cooler.slice';
import authReducer from './reducers/auth.slice';
import candidateReducer from './reducers/candidate.slice';
import loggedInReducer from './reducers/loggedIn.slice';
import groupReducer from './reducers/group.slice';

const reducers = combineReducers({
  jobs: jobReducer,
  employers:employerReducer,
  coolers: coolerReducer,
  auth: authReducer,
  candidate: candidateReducer,
  loggedIn:loggedInReducer,
  group: groupReducer,

});

const persistConfig = {
  key: 'root',
  storage,
   blacklist: ['auth','coolers','employers','group','jobs','candidate']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
