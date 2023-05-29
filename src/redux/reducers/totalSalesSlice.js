import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    statistics: {
        name: 'Statistics',
        data: [60, 40, 50],
    },
};

// const DoughnutChart = (state = initialState, action) => {
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

// export default DoughnutChart;


const totalSalesSlice = createSlice({
    name: 'totalSales',
    initialState,
    reducers: {
        setTotalSales: (state, action) => {
            state.myBalance = action.payload;
        },
    },
});

export const { setTotalSales } = totalSalesSlice.actions;

export default totalSalesSlice.reducer;
