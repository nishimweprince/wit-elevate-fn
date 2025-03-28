import { AppDispatch } from "..";

import { courseAction } from ".";
import { generateCourses, getCoursesServices } from "./service";

export const getUserCoursesAction = (id:string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(courseAction.setIsLoading(true));
      const res = await getCoursesServices(id);

      if (res?.status === 200) {
        dispatch(courseAction.setUserCourses(res.data));
        dispatch(courseAction.setIsLoading(false));
        return { type: true };
        
      }
      dispatch(courseAction.setIsLoading(false));
    } catch (err) {
      dispatch(courseAction.setIsLoading(false));
    }
  };
}; 
export const generateCoursesAction = (id:string,data?:any) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(courseAction.setIsLoading(true));
      const res = await generateCourses(id,data);

      if (res?.status === 200) {
        dispatch(courseAction.setNewCourse(res.data));
        dispatch(courseAction.setIsLoading(false));
        return { type: true };
        
      }
      dispatch(courseAction.setIsLoading(false));
    } catch (err) {
      dispatch(courseAction.setIsLoading(false));
    }
  };
}; 