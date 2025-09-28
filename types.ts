export enum View {
  DASHBOARD = 'DASHBOARD',
  MISSION = 'MISSION',
  LEADERBOARD = 'LEADERBOARD'
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  videoUrl?: string;
  quizQuestions?: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface User {
  uid: string;
  name: string;
  ecoPoints: number;
  completedMissions: string[];
}

export interface LeaderboardData {
  name: string;
  points: number;
}

export interface NavigationProps {
  onNavigate: (view: View) => void;
}