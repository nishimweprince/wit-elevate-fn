import { ChangeEvent, ReactNode } from "react";

export interface eventProps {
  _id: string;
  picture: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  cost: string;
  organiser: string;
  author: string;
}

export interface linkProps {
  link: string;
  path: string;
}

export interface buttonProps {
  text: string;
  className?: string;
  textClass?: string;
  icon?: ReactNode;
  onClick?: any;
  type?: "button" | "submit" | "reset";
  loading?:any
}

export interface heroProps {
  image: string;
  title: string;
  description: string;
}

export interface blogProps {
  picture?: string;
  title?: string;
  description?: string;
  _id?: number;
  createdAt?: string;
  createdBy?: any;
}
export interface commentProps {
  content: string;
  createdBy: any;
}
export interface testimonyProps {
  testimony: string;
  title: string;
  name: string;
}

export interface searchProps {
  placeholder: string;
  text: string;
}

export interface discoverProps {
  text: string;
}

export interface formProps {
  header: string;
}

export interface inputProps {
  placeholder?: string;
  value: string;
  name: string;
  type?: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface headerProps {
  path: string;
  link: string;
  text: string;
}

export interface formData {
  [key: string]: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  joinDate: string;
  postCount: number;
  role: 'user' | 'moderator' | 'admin';
}

export interface Post {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  author: User;
  likes: number;
  isLiked: boolean;
  attachments?: string[];
}

export interface Thread {
  id: string;
  title: string;
  createdAt: string;
  author: User;
  postCount: number;
  viewCount: number;
  lastPost: {
    timestamp: string;
    author: User;
  };
  isPinned: boolean;
  isLocked: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  threadCount: number;
  postCount: number;
  lastPost?: {
    threadId: string;
    threadTitle: string;
    timestamp: string;
    author: User;
  };
}

export interface Notification {
  id: string;
  type: 'reply' | 'mention' | 'like';
  read: boolean;
  timestamp: string;
  thread: {
    id: string;
    title: string;
  };
  from: User;
  preview: string;
}
export interface User {
  // Add user properties based on your data structure
  id?: string;
  email?: string;
  token?: string;
  // ... other user properties
}

export interface UserState {
  new: User | null;
  isLoading: boolean;
  data: User | null;
  newUser: User | null;
  updatedUser:any,
  token:any
} 

export interface Question {
  _id?: string;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
}

export interface Assessment {
  _id?: string;
  title: string;
  questions: Question[];
  duration: number;
  totalQuestions: number;
  passingScore: number;
  skillLevel: string;
  category: string;
  createdBy?: {
    firstName: string;
    lastName: string;
  };
  isActive: boolean;
  createdAt?: string;
}

export interface AssessmentListItem {
  _id: string;
  title: string;
  duration: number;
  totalQuestions: number;
  skillLevel: string;
  category: string;
  createdBy?: {
    firstName: string;
    lastName: string;
  };
}

export interface Badge {
  _id: string;
  name: string;
  description: string;
  category: string;
  level: string;
  image: string;
  criteria: {
    assessmentScore: number;
    requiredAssessments: string[];
  };
}

export interface UserBadge {
  _id: string;
  user: string;
  badge: Badge;
  earnedAt: string;
  assessments: string[];
}