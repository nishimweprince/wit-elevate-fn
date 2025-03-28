import HttpRequest from "../../util/HttpRequest.ts"
import {SERVER_URL} from "../../util/constant.ts"

interface ServiceResponse {
  status: number;
  data: any;
  code?: string;
}

export const generateCourses = async (id:any,data?: any): Promise<ServiceResponse> => {
  return await HttpRequest.post(`${SERVER_URL}/courses/generate/${id}`,data);
}; 
export const getCoursesServices = async (id:string): Promise<ServiceResponse> => {
  return await HttpRequest.get(`${SERVER_URL}/courses/${id}`);
}; 

