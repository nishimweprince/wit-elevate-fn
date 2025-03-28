import axios from "axios";
import { formData } from "./types";
import { Assessment, AssessmentListItem } from './types';
const token = localStorage.getItem("token");

export async function allEvents(limit?: number) {
  const url = `${import.meta.env.VITE_URL_SERVER_URL}/allevents?limit=${limit}`;
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log("something wrong ...");
  }
}

export async function event(id: any) {
  const url = `${import.meta.env.VITE_URL}/event/${id}`;
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
export async function createEvent(eventData: any) {
  const url = `${import.meta.env.VITE_URL}/postEvent`;
  try {
    const data = await axios.post(url, eventData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log("can't post");
  }
}
export async function editEvent(eventData: any, id: any) {
  const url = `${import.meta.env.VITE_URL_SERVER_URL}/updateEvent/${id}`;
  try {
    const data = await axios.patch(url, eventData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log("can't edit");
  }
}

export async function createBlog(blogData: any) {
  const url = `${import.meta.env.VITE_URL}/postBlog`;
  try {
    const data = await axios.post(url, blogData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log("can't post");
  }
}

export async function deleteEvent(id: any) {
  const url = `${import.meta.env.VITE_URL}/deleteEvent/${id}`;
  try {
    const data = await axios.delete(url, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log("can't delete");
  }
}

export async function allBlogs(limit?: number, userId?: string) {
  const url = `${import.meta.env.VITE_URL}/allblogs?limit=${limit}&${
    userId && "user=" + userId
  }`;
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function blog(id: any) {
  const url = `${import.meta.env.VITE_URL}/oneBlog/${id}`;
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function editBlog(blogData: any, id: any) {
  const url = `${import.meta.env.VITE_URL}/updateBlog/${id}`;
  try {
    const data = await axios.patch(url, blogData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log("can't edit");
  }
}

export async function deleteBlog(id: any) {
  const url = `${import.meta.env.VITE_URL}/deleteBlog/${id}`;
  try {
    const data = await axios.delete(url, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log("can't delete");
  }
}

export async function postComment(blogId: any, formData: any) {
  const url = `${import.meta.env.VITE_URL}/postComment/${blogId}`;
  try {
    const data = await axios.post(url, formData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
export async function comment(blogId: any) {
  const url = `${import.meta.env.VITE_URL}/comments/${blogId}`;
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function logIn(formdata: formData) {
  const url = `${import.meta.env.VITE_URL}/signIn`;
  try {
    const data = await axios.post(url, formdata);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function signUp(formdata: formData) {
  const url = `${import.meta.env.VITE_URL}/signUp`;
  try {
    const data = await axios.post(url, formdata);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}




const API_URL = import.meta.env.VITE_UR || 'http://localhost:3000/api';

export const fetchAssessments = async (category?: string, skillLevel?: string): Promise<AssessmentListItem[]> => {
  try {
    let url = `${API_URL}/assessments`;
    const params = new URLSearchParams();
    
    if (category) params.append('category', category);
    if (skillLevel) params.append('skillLevel', skillLevel);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching assessments:', error);
    throw error;
  }
};

export const fetchAssessmentById = async (id: string): Promise<Assessment> => {
  try {
    const response = await axios.get(`${API_URL}/assessments/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching assessment:', error);
    throw error;
  }
};

export const createAssessment = async (assessment: Omit<Assessment, '_id'>): Promise<Assessment> => {
  try {
    const response = await axios.post(`${API_URL}/assessments`, assessment);
    return response.data.data;
  } catch (error) {
    console.error('Error creating assessment:', error);
    throw error;
  }
};

export const updateAssessment = async (id: string, assessment: Partial<Assessment>): Promise<Assessment> => {
  try {
    const response = await axios.put(`${API_URL}/assessments/${id}`, assessment);
    return response.data.data;
  } catch (error) {
    console.error('Error updating assessment:', error);
    throw error;
  }
};

export const deleteAssessment = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/assessments/${id}`);
  } catch (error) {
    console.error('Error deleting assessment:', error);
    throw error;
  }
};