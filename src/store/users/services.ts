import HttpRequest from "../../util/HttpRequest.ts"
import { User } from "../../util/types.ts";
import {SERVER_URL} from "../../util/constant.ts"

interface ServiceResponse {
  status: number;
  data: User;
  code?: string;
}

export const loginServiceUser = async (data: User): Promise<ServiceResponse> => {
  return await HttpRequest.post(`${SERVER_URL}/signIn`,data);
}; 

export const updateUser = async(data: any,id:string,token?:any): Promise<ServiceResponse>=>{
  return await HttpRequest.update(`${SERVER_URL}/updateProfile/${id}`,data,token)
}