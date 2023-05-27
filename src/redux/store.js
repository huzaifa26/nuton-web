
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import userSlice from './reducers/userSlice';

const store = configureStore({
  reducer: combineReducers({
    user: userSlice.reducer,
  }),
});

export default store;
