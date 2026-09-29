import React, { useState, useEffect } from 'react';
import { StudentProfile, TopicId, QuizQuestion } from './types/math';
import { getSavedStudentProfile, saveStudentProfile } from './utils/leaderboardStorage';
import { Navbar, ActiveTab } from './components/Navbar';
import { StudentProfileModal } from './components/StudentProfileModal';
import { OverviewHero } from './components/OverviewHero';
import { QuizGame } from './components/QuizGame';
import { QuizSummary } from './components/QuizSummary';
import { PuzzleMinigames } from './components/PuzzleMinigames';
import { LeaderboardView } from './components/LeaderboardView';
import { StudyNotebook } from './components/StudyNotebook';
import { playCorrectSound, playWrongSound } from './utils/soundEffects';

export default function App() {
  // Student Profile state
  const [student, setStudent] = useState<StudentProfile | null>(() => getSavedStudentProfile());
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundToast, setSoundToast] = useState<string | null>(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      playCorrectSound(true);
      setSoundToast('🔊 Đã bật âm thanh trò chơi!');
    } else {
      setSoundToast('🔇 Đã tắt âm thanh trò chơi');
    }
    setTimeout(() => {
      setSoundToast(null);
    }, 2000);
  };

  // Quiz active session / results state
  const [activeQuizTopicId, setActiveQuizTopicId] = useState<TopicId | undefined>(undefined);
  const [quizFinishedResult, setQuizFinishedResult] = useState<{
    score: number;
    totalQuestions: number;
    correctCount: number;
    timeSeconds: number;
    mode: 'all_chapter' | 'topic_practice';
    answersRecord: {
      question: QuizQuestion;
      selectedIndex: number;
      isCorrect: boolean;
    }[];
  } | null>(null);

  // Prompt student profile on first launch if not yet created
  useEffect(() => {
    if (!student) {
      setIsProfileModalOpen(true);
    }
  }, []);

  const handleSaveProfile = (newProfile: StudentProfile) => {
    setStudent(newProfile);
    saveStudentProfile(newProfile);
  };

  const handleStartQuiz = (topicId?: TopicId) => {
    if (!student) {
      setIsProfileModalOpen(true);
      return;
    }
    setActiveQuizTopicId(topicId);
    setQuizFinishedResult(null);
    setActiveTab('quiz');
  };

  const handleFinishQuiz = (result: {
    score: number;
    totalQuestions: number;
    correctCount: number;
    timeSeconds: number;
    mode: 'all_chapter' | 'topic_practice';
    answersRecord: {
      question: QuizQuestion;
      selectedIndex: number;
      isCorrect: boolean;
    }[];
  }) => {
    setQuizFinishedResult(result);
  };

  const handleRestartQuiz = () => {
    setQuizFinishedResult(null);
    setActiveTab('quiz');
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-800 antialiased selection:bg-amber-200">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'quiz' && quizFinishedResult) {
            setQuizFinishedResult(null);
          }
        }}
        student={student}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Floating Sound Feedback Toast */}
      {soundToast && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900/90 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl border border-amber-300/40 animate-in fade-in slide-in-from-top-2 flex items-center gap-2">
          <span>{soundToast}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'overview' && (
          <OverviewHero
            student={
              student || {
                name: 'Bạn Nhỏ',
                grade: '6A1',
                avatar: '🦉',
                avatarName: 'Cú Bác Học',
                totalScore: 0,
              }
            }
            soundEnabled={soundEnabled}
            onStartQuiz={(topicId) => handleStartQuiz(topicId)}
            onGoToPuzzles={() => setActiveTab('puzzles')}
            onGoToLeaderboard={() => setActiveTab('leaderboard')}
            onGoToHandbook={() => setActiveTab('handbook')}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {activeTab === 'quiz' && (
          <>
            {quizFinishedResult ? (
              <QuizSummary
                student={
                  student || {
                    name: 'Bạn Nhỏ',
                    grade: '6A1',
                    avatar: '🦉',
                    avatarName: 'Cú Bác Học',
                    totalScore: 0,
                  }
                }
                result={quizFinishedResult}
                soundEnabled={soundEnabled}
                onRestart={handleRestartQuiz}
                onGoToLeaderboard={() => setActiveTab('leaderboard')}
                onGoToPuzzles={() => setActiveTab('puzzles')}
              />
            ) : (
              <QuizGame
                student={
                  student || {
                    name: 'Bạn Nhỏ',
                    grade: '6A1',
                    avatar: '🦉',
                    avatarName: 'Cú Bác Học',
                    totalScore: 0,
                  }
                }
                soundEnabled={soundEnabled}
                onFinishQuiz={handleFinishQuiz}
                onOpenProfile={() => setIsProfileModalOpen(true)}
              />
            )}
          </>
        )}

        {activeTab === 'puzzles' && (
          <PuzzleMinigames
            student={
              student || {
                name: 'Bạn Nhỏ',
                grade: '6A1',
                avatar: '🦉',
                avatarName: 'Cú Bác Học',
                totalScore: 0,
              }
            }
            soundEnabled={soundEnabled}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardView
            currentStudent={student}
            soundEnabled={soundEnabled}
            onStartQuiz={() => handleStartQuiz()}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {activeTab === 'handbook' && (
          <StudyNotebook
            soundEnabled={soundEnabled}
            onStartQuiz={() => handleStartQuiz()}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-amber-200/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🦉</span>
            <span className="font-semibold text-slate-700">
              Toán 6 Phiêu Lưu Ký • Ôn tập Chương 1: Tập hợp các số tự nhiên
            </span>
          </div>
          <p className="text-slate-400">
            Biên soạn theo chương trình GDPT môn Toán 6 Kết Nối Tri Thức Với Cuộc Sống
          </p>
        </div>
      </footer>

      {/* Student Profile Onboarding & Edit Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfile={student}
        onSaveProfile={handleSaveProfile}
        soundEnabled={soundEnabled}
      />
    </div>
  );
}
