import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenses: {
        name: 'Earning',
        youtube: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
        facebook: [40, 105, 92, 155, 138, 205, 120, 92, 155, 138, 205, 120],
    },
};

// const EarningHistory = (state = initialState, action) => {
//     const { payload, type } = action;
//     switch (type) {
//         case CHART:
//             return {
//                 ...state,
//                 payload,
//             };
//         default:
//             return state;
//     }
// };
// export default EarningHistory;

const earningHistorySlice = createSlice({
    name: 'earningHistory',
    initialState,
    reducers: {
        setEarningHistory: (state, action) => {
            state.earningHistory = action.payload;
        },
    },
});

export const { setEarningHistory } = earningHistorySlice.actions;

export default earningHistorySlice.reducer;