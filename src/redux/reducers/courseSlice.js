import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newCourse:null,
};

const couseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        newCourse: (state, action) => {
            console.log(action.payload)
            state.newCourse = action.payload;
        },
    },
});

export const { newCourse } = couseSlice.actions;

export default couseSlice.reducer;