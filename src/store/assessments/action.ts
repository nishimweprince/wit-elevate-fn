
import { AppDispatch } from "..";
import { assessmentAction } from "./index";
import { toast } from "react-toastify";
import {
  getAssessmentServices,
  getSelectedAssessmentServices,
  submitAssessment,
  getStudentAssessmentsServices,
  getAssessmentStatisticsService,
  getOverallAssessmentStatisticsService,
  getUserAssessmentStatisticsService,
} from "./service";

export const getAssessmentsAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(assessmentAction.setIsLoading(true));
      const res = await getAssessmentServices();

      if (res?.status === 200) {
        dispatch(assessmentAction.setAllAssessment(res.data));
        dispatch(assessmentAction.setIsLoading(false));
        return { type: true, data: res.data };
      }
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: res?.error || "Failed to fetch assessments" };
    } catch (err) {
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: "Failed to fetch assessments" };
    }
  };
};

export const getSelectedAssessmentAction = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(assessmentAction.setIsLoading(true));
      const res = await getSelectedAssessmentServices(id);

      if (res?.status === 200) {
        dispatch(assessmentAction.setSelcectedAssessment(res.data));
        dispatch(assessmentAction.setIsLoading(false));
        return { type: true, data: res.data };
      }
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: res?.error || "Failed to fetch assessment" };
    } catch (err) {
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: "Failed to fetch assessment" };
    }
  };
};

export const submitAssessmentAction = (assessmentId: string, data: { answers: Array<{ questionId: string; selectedAnswer: string }>; timeSpent: number }) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(assessmentAction.setIsLoading(true));
      const res = await submitAssessment(assessmentId, data);
      
      if (res?.status === 200) {
        dispatch(assessmentAction.setSubmitedAnswer(res.data));
        dispatch(assessmentAction.setIsLoading(false));
        toast.success("Assessment submitted successfully")
        return { type: true, data: res.data };
      }
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: res?.error || "Failed to submit assessment" };
    } catch (err) {
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: "Failed to submit assessment" };
    }
  };
};

export const getStudentAssessmentsAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(assessmentAction.setIsLoading(true));
      const res = await getStudentAssessmentsServices();

      if (res?.status === 200) {
        dispatch(assessmentAction.setIsLoading(false));
        return { type: true, data: res.data };
      }
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: res?.error || "Failed to fetch student assessments" };
    } catch (err) {
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: "Failed to fetch student assessments" };
    }
  };
};

export const getAssessmentStatisticsAction = (assessmentId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(assessmentAction.setIsLoading(true));
      const res = await getAssessmentStatisticsService(assessmentId);

      if (res?.status === 200) {
        dispatch(assessmentAction.setAssessmentStatistics(res.data));
        dispatch(assessmentAction.setIsLoading(false));
        return { type: true, data: res.data };
      }
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: res?.error || "Failed to fetch assessment statistics" };
    } catch (err) {
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: "Failed to fetch assessment statistics" };
    }
  };
};

export const getOverallAssessmentStatisticsAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(assessmentAction.setIsLoading(true));
      const res = await getOverallAssessmentStatisticsService();

      if (res?.status === 200) {
        dispatch(assessmentAction.setOverallStatistics(res.data));
        dispatch(assessmentAction.setIsLoading(false));
        return { type: true, data: res.data };
      }
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: res?.error || "Failed to fetch overall statistics" };
    } catch (err) {
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: "Failed to fetch overall statistics" };
    }
  };
};

export const getUserAssessmentStatisticsAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(assessmentAction.setIsLoading(true));
      const res = await getUserAssessmentStatisticsService();

      if (res?.status === 200) {
        dispatch(assessmentAction.setUserStatistics(res.data));
        dispatch(assessmentAction.setIsLoading(false));
        return { type: true, data: res.data };
      }
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: res?.error || "Failed to fetch user statistics" };
    } catch (err) {
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: "Failed to fetch user statistics" };
    }
  };
};