import { LeaderboardEntry, StudentProfile } from '../types/math';

const LEADERBOARD_KEY = 'toan6_kntt_leaderboard_v1';
const STUDENT_PROFILE_KEY = 'toan6_kntt_student_profile_v1';

export const DEFAULT_AVATARS = [
  { id: 'owl', emoji: '🦉', name: 'Cú Bác Học', title: 'Thông thái' },
  { id: 'fox', emoji: '🦊', name: 'Cáo Nhanh Trí', title: 'Linh hoạt' },
  { id: 'cat', emoji: '🐱', name: 'Mèo Thông Minh', title: 'Chăm chỉ' },
  { id: 'lion', emoji: '🦁', name: 'Sư Tử Quyết Tâm', title: 'Dũng mãnh' },
  { id: 'panda', emoji: '🐼', name: 'Gấu Chăm Chỉ', title: 'Kiên trì' },
  { id: 'rabbit', emoji: '🐰', name: 'Thỏ Nhanh Nhẹn', title: 'Thần tốc' },
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lead-1',
    name: 'Nguyễn Minh Anh',
    grade: '6A1',
    avatar: '🦉',
    score: 980,
    totalQuestions: 10,
    correctCount: 10,
    accuracy: 100,
    timeSeconds: 94,
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    badgeTitle: 'Trạng Nguyên Toán Học 👑',
    mode: 'all_chapter',
  },
  {
    id: 'lead-2',
    name: 'Trần Bảo Nam',
    grade: '6A2',
    avatar: '🦊',
    score: 920,
    totalQuestions: 10,
    correctCount: 9,
    accuracy: 90,
    timeSeconds: 82,
    timestamp: Date.now() - 1000 * 60 * 60 * 5,
    badgeTitle: 'Bậc Thầy Tập Hợp 🌟',
    mode: 'all_chapter',
  },
  {
    id: 'lead-3',
    name: 'Lê Khánh Linh',
    grade: '6A1',
    avatar: '🐰',
    score: 890,
    totalQuestions: 10,
    correctCount: 9,
    accuracy: 90,
    timeSeconds: 105,
    timestamp: Date.now() - 1000 * 60 * 60 * 8,
    badgeTitle: 'Hiệp Sĩ Số Tự Nhiên ⚔️',
    mode: 'all_chapter',
  },
  {
    id: 'lead-4',
    name: 'Phạm Đức Huy',
    grade: '6A3',
    avatar: '🦁',
    score: 840,
    totalQuestions: 10,
    correctCount: 8,
    accuracy: 80,
    timeSeconds: 110,
    timestamp: Date.now() - 1000 * 60 * 60 * 12,
    badgeTitle: 'Kỳ Thủ Phép Tính ⚡',
    mode: 'all_chapter',
  },
  {
    id: 'lead-5',
    name: 'Hoàng Thu Trang',
    grade: '6A2',
    avatar: '🐱',
    score: 790,
    totalQuestions: 10,
    correctCount: 8,
    accuracy: 80,
    timeSeconds: 135,
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    badgeTitle: 'Nhà Thám Hiểm Toán 6 🧭',
    mode: 'all_chapter',
  },
];

export function getSavedStudentProfile(): StudentProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STUDENT_PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveStudentProfile(profile: StudentProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STUDENT_PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // LocalStorage write failed
  }
}

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return INITIAL_LEADERBOARD;
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(INITIAL_LEADERBOARD));
      return INITIAL_LEADERBOARD;
    }
    const parsed = JSON.parse(raw) as LeaderboardEntry[];
    return sortLeaderboard(parsed);
  } catch {
    return INITIAL_LEADERBOARD;
  }
}

function sortLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries]
    .sort((a, b) => {
      // Primary: Score descending
      if (b.score !== a.score) return b.score - a.score;
      // Secondary: Accuracy descending
      if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
      // Tertiary: Time ascending (faster is better)
      return a.timeSeconds - b.timeSeconds;
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
}

export function recordQuizResult(record: Omit<LeaderboardEntry, 'id' | 'timestamp' | 'rank'>): LeaderboardEntry {
  const current = getLeaderboard();
  const newEntry: LeaderboardEntry = {
    ...record,
    id: 'entry-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    timestamp: Date.now(),
  };

  const updated = sortLeaderboard([...current, newEntry]).slice(0, 50); // keep top 50
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
  } catch {
    // Ignore error
  }
  return newEntry;
}

export function calculateBadgeTitle(score: number, accuracy: number): string {
  if (accuracy === 100 && score >= 900) return 'Trạng Nguyên Toán Học 👑';
  if (accuracy >= 90) return 'Bậc Thầy Tập Hợp 🌟';
  if (accuracy >= 80) return 'Hiệp Sĩ Số Tự Nhiên ⚔️';
  if (accuracy >= 70) return 'Chiến Binh Số Học 🛡️';
  if (accuracy >= 50) return 'Học Giả Siêng Năng 📚';
  return 'Tân Binh Đầy Triển Vọng 🌱';
}
