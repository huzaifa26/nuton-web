import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import earningHistoryReducer from './reducers/earningHistorySlice';
import analyticDataReducer from './reducers/analyticDataSlice';
import myBalanceReducer from './reducers/myBalanceSlice';
import profileVisitorReducer from './reducers/profileVisitorSlice';
import totalSalesReducer from './reducers/totalSalesSlice';
import courseReducer from './reducers/courseSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    earningHistory: earningHistoryReducer,
    analyticData: analyticDataReducer,
    myBalance: myBalanceReducer,
    profileVisitor: profileVisitorReducer,
    totalSales: totalSalesReducer,
    course:courseReducer
  },
});

export default store;