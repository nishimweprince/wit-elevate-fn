import { createSlice } from "@reduxjs/toolkit";

export interface Badge {
  _id: string;
  name: string;
  description: string;
  user: string;
  count: number;
  createdAt: string;
  category?: string;
  level?: string;
  image?: string;
  criteria?: {
    assessmentScore: number;
    requiredAssessments: string[];
  };
}

interface BadgeState {
  isLoading: boolean;
  userBadges: Badge[] | null;
  error: string | null;
}

const initialState: BadgeState = {
  isLoading: false,
  userBadges: null,
  error: null
};

const badgeSlice = createSlice({
  name: "badge",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setUserBadges(state, action) {
      state.userBadges = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    }
  }
});

export const badgeAction = badgeSlice.actions;
export default badgeSlice.reducer; 