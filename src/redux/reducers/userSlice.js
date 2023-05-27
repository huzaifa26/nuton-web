import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
    },
    reducers: {
        userInfo(state, action) {
            state = action.payload;
            console.log(JSON.stringify(state, undefined, 2));
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice;