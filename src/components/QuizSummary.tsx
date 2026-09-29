import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { QuizQuestion, StudentProfile, LeaderboardEntry } from '../types/math';
import { calculateBadgeTitle, recordQuizResult } from '../utils/leaderboardStorage';
import { playFanfareSound, playTapSound } from '../utils/soundEffects';
import { Trophy, CheckCircle, XCircle, Clock, Target, ArrowRight, RotateCcw, Award, ChevronDown, ChevronUp } from 'lucide-react';

interface QuizSummaryProps {
  student: StudentProfile;
  result: {
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
  };
  soundEnabled: boolean;
  onRestart: () => void;
  onGoToLeaderboard: () => void;
  onGoToPuzzles: () => void;
}

export const QuizSummary: React.FC<QuizSummaryProps> = ({
  student,
  result,
  soundEnabled,
  onRestart,
  onGoToLeaderboard,
  onGoToPuzzles,
}) => {
  const accuracy = Math.round((result.correctCount / result.totalQuestions) * 100);
  const badgeTitle = calculateBadgeTitle(result.score, accuracy);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [savedEntry, setSavedEntry] = useState<LeaderboardEntry | null>(null);

  // Trigger confetti and record result on mount
  useEffect(() => {
    playFanfareSound(soundEnabled);

    // Fire cute confetti fireworks
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6'],
    });

    const entry = recordQuizResult({
      name: student.name,
      grade: student.grade,
      avatar: student.avatar,
      score: result.score,
      totalQuestions: result.totalQuestions,
      correctCount: result.correctCount,
      accuracy,
      timeSeconds: result.timeSeconds,
      badgeTitle,
      mode: result.mode,
    });
    setSavedEntry(entry);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m} phút ${s < 10 ? '0' : ''}${s} giây`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      
      {/* Top Victory Card */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-10 text-white text-center shadow-xl relative overflow-hidden mb-8">
        
        {/* Background Sparkles Decor */}
        <div className="absolute top-2 left-6 text-4xl opacity-30 select-none">✨</div>
        <div className="absolute bottom-4 right-8 text-4xl opacity-30 select-none">🎉</div>

        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md text-4xl mb-4 shadow-inner ring-4 ring-white/30 animate-pulse">
            {student.avatar}
          </div>

          <p className="text-amber-100 font-bold text-sm tracking-wider uppercase">
            Chúc mừng bạn {student.name} ({student.grade})!
          </p>

          <h1 className="text-2xl sm:text-4xl font-black font-display mt-1 mb-2">
            Đã Hoàn Thành Thử Thách Chương 1!
          </h1>

          <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-white font-extrabold text-sm sm:text-base my-3 shadow-xs">
            Danh hiệu: {badgeTitle}
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mt-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
              <span className="text-xs text-amber-200 block">Tổng Điểm Số</span>
              <span className="text-2xl sm:text-3xl font-black font-mono">{result.score}</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
              <span className="text-xs text-amber-200 block">Số Câu Đúng</span>
              <span className="text-2xl sm:text-3xl font-black font-mono">
                {result.correctCount}/{result.totalQuestions}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
              <span className="text-xs text-amber-200 block">Tỉ Lệ Chính Xác</span>
              <span className="text-2xl sm:text-3xl font-black font-mono">{accuracy}%</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
              <span className="text-xs text-amber-200 block">Thời Gian Làm</span>
              <span className="text-xl sm:text-2xl font-black font-mono">{formatTime(result.timeSeconds)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
        <button
          onClick={() => {
            playTapSound(soundEnabled);
            onGoToLeaderboard();
          }}
          className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2 transform active:scale-98"
        >
          <Trophy className="w-5 h-5" />
          <span>Xem Bảng Xếp Hạng Vàng</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            playTapSound(soundEnabled);
            onGoToPuzzles();
          }}
          className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-amber-300 text-amber-900 font-bold text-sm sm:text-base shadow-xs hover:shadow-md transition-all flex items-center gap-2"
        >
          <span>Chơi Mini-Game Giải Đố Tập Hợp</span>
          <span>🧩</span>
        </button>

        <button
          onClick={() => {
            playTapSound(soundEnabled);
            onRestart();
          }}
          className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm sm:text-base transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Luyện Đề Khác</span>
        </button>
      </div>

      {/* Review All Questions with Detailed Explanations */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800 font-display">
              Chi Tiết Bài Làm & Lời Giải Mẫu
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Bấm vào từng câu để xem lại các bước giải và chú ý bẫy học sinh hay mắc
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-amber-900 rounded-full">
            {result.answersRecord.length} câu đã trả lời
          </span>
        </div>

        <div className="space-y-4">
          {result.answersRecord.map((record, index) => {
            const isExpanded = expandedIndex === index;
            const q = record.question;

            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition-all ${
                  record.isCorrect
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                {/* Header Row */}
                <button
                  onClick={() => {
                    playTapSound(soundEnabled);
                    setExpandedIndex(isExpanded ? null : index);
                  }}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="mt-0.5 shrink-0">
                      {record.isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-slate-800 font-display">
                          Câu {index + 1}
                        </span>
                        <span className="text-xs text-amber-700 font-semibold bg-amber-100/60 px-2 py-0.5 rounded">
                          {q.lessonTag}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 font-medium truncate sm:whitespace-normal">
                        {q.question}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        record.isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {record.isCorrect ? 'Đúng' : 'Chưa đúng'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 text-sm animate-in fade-in">
                    
                    {/* User Selection vs Correct Option */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                      <div
                        className={`p-3 rounded-xl border ${
                          record.isCorrect
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-rose-50 border-rose-200 text-rose-900'
                        }`}
                      >
                        <span className="font-bold block mb-1">Bạn đã chọn:</span>
                        <span>{q.options[record.selectedIndex]}</span>
                      </div>

                      {!record.isCorrect && (
                        <div className="p-3 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-900">
                          <span className="font-bold block mb-1">Đáp án đúng:</span>
                          <span>{q.options[q.correctIndex]}</span>
                        </div>
                      )}
                    </div>

                    {/* Step-by-step Solution */}
                    <div className="bg-white rounded-xl p-4 border border-amber-200">
                      <p className="font-bold text-slate-800 mb-2 flex items-center gap-1.5 text-xs sm:text-sm">
                        <span>📝</span> Lời giải chi tiết:
                      </p>
                      <div className="space-y-1.5 text-slate-600 text-xs sm:text-sm">
                        {q.explanation.steps.map((st, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{st}</span>
                          </div>
                        ))}
                      </div>

                      {q.explanation.keyFormula && (
                        <div className="mt-3 p-2.5 bg-amber-50 rounded-lg text-xs text-amber-900 font-medium">
                          <strong>Bí kíp:</strong> {q.explanation.keyFormula}
                        </div>
                      )}

                      {q.explanation.commonTrap && (
                        <div className="mt-2 p-2.5 bg-rose-50 rounded-lg text-xs text-rose-800">
                          <strong>Cảnh giác:</strong> {q.explanation.commonTrap}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
