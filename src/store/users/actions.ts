import store from "store";
import { toast } from "react-toastify";
import { userAction } from ".";
import { AppDispatch } from "..";
import { User } from "../../util/types";
import { loginServiceUser, updateUser } from "./services";

export const loginUserAction = (data: User) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userAction.setIsLoading(true));
      const res = await loginServiceUser(data);

      if (res?.status === 200) {
        dispatch(userAction.setIsLoading(false));
        store.set("authToken", res?.data?.token);
        store.set("userData", res?.data);
        dispatch(userAction.setData(res.data));
        dispatch(userAction.setToken(res.data?.token));
        toast.success("Login Successfully");
        return { type: true };
        
      }
      dispatch(userAction.setIsLoading(false));
      toast.error(res.response.data.error);
    } catch (err) {
      dispatch(userAction.setIsLoading(false));
    }
  };
}; 

export const updateUserAction = (data:any,id:string,token?:string,) =>{
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userAction.setIsLoading(true));
      const res = await updateUser(data,id,token);

      if (res?.status === 200) {
        dispatch(userAction.setUpdatedUser(res.data));
        dispatch(userAction.setIsLoading(false));
        toast.success("Profile updated Successfully");
        return { type: true };
        
      }
      dispatch(userAction.setIsLoading(false));
    } catch (err) {
      dispatch(userAction.setIsLoading(false));
    }
  };
}

export const signOutAction = () => {
  return async (dispatch: AppDispatch) => {
    try {

      store.clearAll();
      
      
      dispatch(userAction.setData(null));
      dispatch(userAction.setToken(null));
      dispatch(userAction.setNewUser(null));
      dispatch(userAction.setUpdatedUser(null));
      
      toast.success("Signed out successfully");
      return { type: true };
    } catch (err) {
      toast.error("Failed to sign out");
      return { type: false };
    }
  };
};