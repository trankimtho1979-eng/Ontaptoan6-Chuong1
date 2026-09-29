export type GradeClass = '6A1' | '6A2' | '6A3' | '6A4' | '6A5' | '6A6' | '6A7' | '6A8';

export interface StudentProfile {
  name: string;
  grade: GradeClass;
  avatar: string; // avatar emoji or icon key
  avatarName: string;
  totalScore: number;
}

export type TopicId = 
  | 'tap_hop'
  | 'ghi_so_va_la_ma'
  | 'thu_tu_tap_hop'
  | 'phep_tinh_luy_thua_tim_x';

export interface TopicInfo {
  id: TopicId;
  title: string;
  lessonName: string;
  description: string;
  icon: string;
  color: string;
  questionCount: number;
}

export type Difficulty = 'de' | 'trung_binh' | 'van_dung';

export interface QuizQuestion {
  id: string;
  topicId: TopicId;
  topicTitle: string;
  lessonTag: string; // e.g., "Bài 1: Tập hợp", "Bài 6: Lũy thừa"
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: {
    steps: string[];
    keyFormula?: string;
    commonTrap?: string;
  };
  hint?: string;
}

export interface QuizResultRecord {
  id: string;
  name: string;
  grade: string;
  avatar: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  accuracy: number; // percentage
  timeSeconds: number;
  timestamp: number;
  badgeTitle: string;
  mode: 'all_chapter' | 'topic_practice' | 'puzzle_master';
  topicId?: TopicId;
}

export interface LeaderboardEntry extends QuizResultRecord {
  rank?: number;
}

export interface SetSortingItem {
  id: string;
  value: number;
  label: string;
  correctSet: 'setA' | 'setB' | 'both' | 'neither';
}

export interface SetSortingGameData {
  title: string;
  description: string;
  setAName: string;
  setBName: string;
  items: SetSortingItem[];
  explanation: string;
}

export interface RomanPairItem {
  id: string;
  roman: string;
  arabic: number;
  meaning?: string;
}
