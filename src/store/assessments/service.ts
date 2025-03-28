

import HttpRequest from "../../util/HttpRequest.ts"
import store from "store";
import { SERVER_URL } from "../../util/constant.ts";

interface ServiceResponse<T> {
  status: number;
  data: T;
  code?: string;
  error?: string;
}

export interface Assessment {
  _id: string;
  title: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
    points: number;
  }>;
  duration: number;
  totalQuestions: number;
  passingScore: number;
  skillLevel: string;
  category: string;
  isActive: boolean;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

export interface AssessmentStatistics {
  totalAttempts: number;
  passedAttempts: number;
  failedAttempts: number;
  completedAttempts: number;
  notCompletedAttempts: number;
  averageScore: number;
  passRate: number;
}

export interface UserStatistics extends AssessmentStatistics {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastAttemptDate: string;
}

export interface SubmittedAnswer {
  score: number;
  totalPoints: number;
  passed: boolean;
  feedback: Array<{
    question: string;
    selectedAnswer: string;
    isCorrect: boolean;
    points: number;
  }>;
  earnedBadges: Array<{
    name: string;
    description: string;
    count: number;
  }>;
}

export interface Course {
  _id: string;
  title: string;
  description: string;

}

export interface CourseGenerationData {
  title: string;
  description: string;

}

export interface StudentAssessment {
  _id: string;
  assessment: Assessment;
  score: number;
  passed: boolean;
  completed: boolean;
  createdAt: string;
}

export const generateCourses = async (id: string, data?: CourseGenerationData): Promise<ServiceResponse<Course>> => {
  return await HttpRequest.post(`${SERVER_URL}/courses/generate/${id}`, data);
}; 

export const getCoursesServices = async (id: string): Promise<ServiceResponse<Course>> => {
  return await HttpRequest.get(`${SERVER_URL}/courses/${id}`);
}; 

export const getAssessmentServices = async (): Promise<ServiceResponse<Assessment[]>> => {
  return await HttpRequest.get(`${SERVER_URL}/assessments`);
}; 

export const getSelectedAssessmentServices = async (id: string): Promise<ServiceResponse<Assessment>> => {
  return await HttpRequest.get(`${SERVER_URL}/assessments/${id}`);
}; 

export const submitAssessment = async (assessmentId: string, data: { answers: Array<{ questionId: string; selectedAnswer: string }>; timeSpent: number }): Promise<ServiceResponse<SubmittedAnswer>> => {
  const token = store.get("authToken");

  return await HttpRequest.post(`${SERVER_URL}/assessments/submit/${assessmentId}`, data, token);
}; 

export const getStudentAssessmentsServices = async (): Promise<ServiceResponse<StudentAssessment[]>> => {
  const token = store.get("authToken");
  return await HttpRequest.get(`${SERVER_URL}/my-assessments`, token);
};

export const getAssessmentStatisticsService = async (assessmentId: string): Promise<ServiceResponse<AssessmentStatistics>> => {
  const token = store.get("authToken");
  return await HttpRequest.get(`${SERVER_URL}/assessments/${assessmentId}/statistics`, token);
};

export const getOverallAssessmentStatisticsService = async (): Promise<ServiceResponse<AssessmentStatistics & { totalUniqueUsers: number }>> => {
  const token = store.get("authToken");
  return await HttpRequest.get(`${SERVER_URL}/assessments/statistics/overall`);
};

export const getUserAssessmentStatisticsService = async (): Promise<ServiceResponse<UserStatistics[]>> => {
  const token = store.get("authToken");
  return await HttpRequest.get(`${SERVER_URL}/assessments/statistics/users`);
};
