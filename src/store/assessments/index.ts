import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../util/types";

interface Assessment {
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
  createdBy: User;
}

interface AssessmentStatistics {
  totalAttempts: number;
  passedAttempts: number;
  failedAttempts: number;
  completedAttempts: number;
  notCompletedAttempts: number;
  averageScore: number;
  passRate: number;
}

interface UserStatistics extends AssessmentStatistics {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastAttemptDate: string;
}

interface SubmittedAnswer {
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

interface AssessmentState {
  isLoading: boolean;
  newAssessment: User | null;
  allAssessment: Assessment[];
  selectedAssessment: Assessment | null;
  submittedAnswer: SubmittedAnswer | null;
  assessmentStatistics: AssessmentStatistics | null;
  overallStatistics: AssessmentStatistics & { totalUniqueUsers: number } | null;
  userStatistics: UserStatistics[];
}

const initialState: AssessmentState = {
  isLoading: false,
  newAssessment: null,
  allAssessment: [],
  selectedAssessment: null,
  submittedAnswer: null,
  assessmentStatistics: null,
  overallStatistics: null,
  userStatistics: [],
};

const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setNewAssessment: (state, action) => {
      state.newAssessment = action.payload;
    },
    setAllAssessment: (state, action) => {
      state.allAssessment = action.payload;
    },
    setSelcectedAssessment: (state, action) => {
      state.selectedAssessment = action.payload;
    },
    setSubmitedAnswer: (state, action) => {
      state.submittedAnswer = action.payload;
    },
    setAssessmentStatistics: (state, action) => {
      state.assessmentStatistics = action.payload;
    },
    setOverallStatistics: (state, action) => {
      state.overallStatistics = action.payload;
    },
    setUserStatistics: (state, action) => {
      state.userStatistics = action.payload;
    },
  },
});

export const assessmentAction = assessmentSlice.actions;
export default assessmentSlice.reducer; 