import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  isLoading: false,
  userCourses: null,
  newCourse:null

};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setUserCourses(state, action) {
      state.userCourses = action.payload;
    },
    setNewCourse(state, action) {
      state.newCourse = action.payload;
    },
  },
});

export const  courseAction = courseSlice.actions;
export default courseSlice.reducer; 