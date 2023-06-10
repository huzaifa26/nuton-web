import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newCourse:null,
};

const couseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        newCourse: (state, action) => {
            state.newCourse = action.payload;
        },
        allCourses: (state, action) => {
            state.allCourses = action.payload;
        },
    },
});

export const { newCourse,allCourses } = couseSlice.actions;

export default couseSlice.reducer;