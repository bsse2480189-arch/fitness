/**
 * FitForge Pro Types
 */

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin' | 'trainer';
  fitnessGoals: string[];
  height?: number; // cm
  weight?: number; // kg
  targetWeight?: number; // kg
  bmi?: number;
  createdAt: string;
  streak: number;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes
  category: string;
  exercises: Exercise[];
  isAI?: boolean;
  thumbnailUrl?: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  videoUrl?: string;
}

export type LogType = 'workout' | 'meal' | 'water' | 'weight' | 'sleep' | 'steps';

export interface ActivityLog {
  id: string;
  userId: string;
  date: string; // ISO Date YYYY-MM-DD
  type: LogType;
  value: number;
  unit: string;
  details?: any;
  createdAt: string;
}

export interface NutritionLog extends ActivityLog {
  type: 'meal';
  details: {
    mealName: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    imageUrl?: string;
  };
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  content: string;
  mediaUrl?: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'premium_monthly' | 'premium_yearly';
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
}
