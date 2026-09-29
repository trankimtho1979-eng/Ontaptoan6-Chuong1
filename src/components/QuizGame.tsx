import React, { useState, useEffect, useMemo, useRef } from 'react';
import { QuizQuestion, StudentProfile, TopicId } from '../types/math';
import { CHAPTER_QUESTIONS, TOPICS } from '../data/chapter1Questions';
import { playCorrectSound, playWrongSound, playStreakSound, playTapSound } from '../utils/soundEffects';
import { CheckCircle2, XCircle, Clock, Zap, ArrowRight, HelpCircle, RotateCcw, AlertTriangle, Volume2 } from 'lucide-react';

interface QuizGameProps {
  student: StudentProfile;
  soundEnabled: boolean;
  onFinishQuiz: (result: {
    score: number;
    totalQuestions: number;
    correctCount: number;
    timeSeconds: number;
    mode: 'all_chapter' | 'topic_practice';
    topicId?: TopicId;
    answersRecord: {
      question: QuizQuestion;
      selectedIndex: number;
      isCorrect: boolean;
    }[];
  }) => void;
  onOpenProfile: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({
  student,
  soundEnabled,
  onFinishQuiz,
  onOpenProfile,
}) => {
  // Quiz configuration
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId | 'all'>('all');
  const [isQuizActive, setIsQuizActive] = useState(false);

  // Active quiz state
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // History of answers in current session
  const [answersRecord, setAnswersRecord] = useState<{
    question: QuizQuestion;
    selectedIndex: number;
    isCorrect: boolean;
  }[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Shuffle and pick questions
  const startQuiz = (topicId: TopicId | 'all') => {
    playTapSound(soundEnabled);
    let pool = CHAPTER_QUESTIONS;
    if (topicId !== 'all') {
      pool = CHAPTER_QUESTIONS.filter((q) => q.topicId === topicId);
    }
    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    // Take 10 if 'all' or all available (usually 6-7) if topic
    const chosen = topicId === 'all' ? shuffled.slice(0, 10) : shuffled;

    setQuestions(chosen);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setTimeElapsed(0);
    setShowHint(false);
    setAnswersRecord([]);
    setSelectedTopicId(topicId);
    setIsQuizActive(true);
    setIsTimerRunning(true);
  };

  // Timer loop
  useEffect(() => {
    if (isQuizActive && isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isQuizActive, isTimerRunning]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted || !currentQ) return;
    setSelectedIndex(idx);
    setIsAnswerSubmitted(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setCorrectCount((prev) => prev + 1);

      // Score formula: 100 base + combo bonus (20 per streak above 1)
      const comboBonus = (newStreak - 1) * 20;
      const points = 100 + comboBonus;
      setScore((prev) => prev + points);

      if (newStreak >= 2) {
        playStreakSound(newStreak, soundEnabled);
      } else {
        playCorrectSound(soundEnabled);
      }
    } else {
      setStreak(0);
      playWrongSound(soundEnabled);
    }

    setAnswersRecord((prev) => [
      ...prev,
      {
        question: currentQ,
        selectedIndex: idx,
        isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    playTapSound(soundEnabled);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      // Quiz completed!
      setIsQuizActive(false);
      setIsTimerRunning(false);
      onFinishQuiz({
        score,
        totalQuestions: questions.length,
        correctCount,
        timeSeconds: timeElapsed,
        mode: selectedTopicId === 'all' ? 'all_chapter' : 'topic_practice',
        topicId: selectedTopicId === 'all' ? undefined : selectedTopicId,
        answersRecord,
      });
    }
  };

  // Format time mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Mascot Encouragement Texts
  const mascotReaction = useMemo(() => {
    if (!isAnswerSubmitted || selectedIndex === null || !currentQ) return null;
    const isCorrect = selectedIndex === currentQ.correctIndex;
    if (isCorrect) {
      if (streak >= 3) {
        return {
          emoji: '🔥',
          msg: `Đỉnh cao quá! Combo ${streak} câu liên tiếp! +${(streak - 1) * 20} điểm thưởng!`,
          color: 'text-orange-600 bg-orange-50 border-orange-200',
        };
      }
      return {
        emoji: '🎉',
        msg: 'Chính xác 100%! Bạn nắm kiến thức rất chắc!',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      };
    }
    return {
      emoji: '💡',
      msg: 'Đừng lo lắng! Hãy xem lời giải chi tiết bên dưới để khắc phục bẫy này nhé!',
      color: 'text-amber-800 bg-amber-50 border-amber-200',
    };
  }, [isAnswerSubmitted, selectedIndex, currentQ, streak]);

  // Mode Selection Screen (Before Quiz Starts)
  if (!isQuizActive) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-200">
        
        {/* Banner with Cute Student Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="text-xs uppercase tracking-wider font-bold bg-white/20 px-3 py-1 rounded-full inline-block mb-3">
                Toán 6 • Kết Nối Tri Thức Với Cuộc Sống
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight mb-2">
                Đấu Trường Trắc Nghiệm Chương 1
              </h1>
              <p className="text-amber-100 text-sm sm:text-base max-w-lg">
                Tập hợp các số tự nhiên, ghi số La Mã, lũy thừa, dấu hiệu chia hết, số nguyên tố & ƯCLN - BCNN!
              </p>
            </div>

            {/* Student Badge Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-3 shrink-0 shadow-inner">
              <span className="text-4xl">{student.avatar}</span>
              <div>
                <p className="text-xs text-amber-200 font-semibold">Thí sinh tham dự:</p>
                <p className="font-bold text-base leading-tight text-white">{student.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded font-bold">
                    Lớp {student.grade}
                  </span>
                  <button
                    onClick={onOpenProfile}
                    className="text-[11px] text-amber-200 hover:text-white underline font-medium"
                  >
                    Đổi tên
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Main Challenge Button */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm mb-8 text-center hover:border-amber-400 transition-all">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 text-3xl mb-3">
            🏆
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 font-display mb-2">
            Thử Thách Toàn Diện Chương 1 (10 Câu Phân Hóa)
          </h2>
          {/* Mode Explanation & Sound Feature Badge */}
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-4">
            Kiểm tra tổng hợp trọng tâm Chương 1: Tập hợp & phần tử, Cách ghi số & Số La Mã, Thứ tự trong N, Phép tính có dấu ngoặc, Lũy thừa & Tìm x. Có tính điểm combo và lưu vào Bảng Vàng!
          </p>

          {/* Sound Preview Indicator for 6th Graders */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 bg-amber-50/80 rounded-2xl border border-amber-200 mb-6 text-xs text-slate-600">
            <span className="font-bold text-amber-900 flex items-center gap-1">
              <Volume2 className="w-4 h-4 text-amber-600" />
              Âm thanh phản hồi:
            </span>
            <button
              type="button"
              onClick={() => playCorrectSound(true)}
              className="px-2.5 py-1 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold transition-transform active:scale-95 flex items-center gap-1"
            >
              <span>🔔 Nghe thử khi làm Đúng</span>
            </button>
            <button
              type="button"
              onClick={() => playWrongSound(true)}
              className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold transition-transform active:scale-95 flex items-center gap-1"
            >
              <span>🪵 Nghe thử khi làm Chưa Đúng</span>
            </button>
          </div>
          <button
            onClick={() => startQuiz('all')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base shadow-md hover:shadow-lg transition-all transform active:scale-98 inline-flex items-center justify-center gap-2"
          >
            <span>Bắt Đầu Thi Ngay (10 Câu)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Practice By Individual Topic */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800 font-display">
              Luyện Tập Theo Chủ Đề
            </h3>
            <span className="text-xs text-slate-500 font-medium">4 Chuyên đề (Bài 1 đến Bài 7)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOPICS.map((topic, index) => (
              <div
                key={topic.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100">
                      {topic.icon}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                      {topic.questionCount} câu
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm sm:text-base mb-1.5 break-words">
                    {index + 1}. {topic.title}
                  </h4>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed break-words">
                    <span className="font-semibold text-amber-700">{topic.lessonName}</span> · {topic.description}
                  </p>
                </div>

                <button
                  onClick={() => startQuiz(topic.id)}
                  className="w-full py-2.5 px-3 text-xs sm:text-sm font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 active:scale-98 rounded-xl transition-all flex items-center justify-center gap-1"
                >
                  <span>Bắt đầu luyện tập →</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Active Quiz View
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-in fade-in duration-200">
      
      {/* Top Bar: Progress, Timer, Streak, Score */}
      <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs mb-6">
        <div className="flex items-center justify-between gap-3 text-sm mb-3">
          
          {/* Question progress */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 font-display">
              Câu {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
              {currentQ.lessonTag}
            </span>
          </div>

          {/* Metrics */}
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            {/* Timer */}
            <div className="flex items-center gap-1.5 text-slate-600 font-mono font-bold">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{formatTime(timeElapsed)}</span>
            </div>

            {/* Streak */}
            {streak >= 2 && (
              <div className="flex items-center gap-1 font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-200 animate-bounce">
                <Zap className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                <span>Combo x{streak}</span>
              </div>
            )}

            {/* Score */}
            <div className="font-bold text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-lg">
              {score} điểm
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm mb-6 relative">
        
        {/* Difficulty & Hint Toggle */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
            Mức độ: {currentQ.difficulty === 'de' ? 'Nhận biết (Dễ)' : currentQ.difficulty === 'trung_binh' ? 'Thông hiểu' : 'Vận dụng cao'}
          </span>

          {currentQ.hint && !isAnswerSubmitted && (
            <button
              onClick={() => {
                playTapSound(soundEnabled);
                setShowHint(!showHint);
              }}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{showHint ? 'Ẩn gợi ý' : 'Xem gợi ý nhỏ'}</span>
            </button>
          )}
        </div>

        {/* Optional Hint Callout */}
        {showHint && currentQ.hint && !isAnswerSubmitted && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2 animate-in fade-in">
            <span className="text-base">💡</span>
            <div>
              <p className="font-bold mb-0.5">Gợi ý từ Thầy/Cô:</p>
              <p>{currentQ.hint}</p>
            </div>
          </div>
        )}

        {/* Question Statement */}
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 leading-snug mb-6">
          {currentQ.question}
        </h2>

        {/* Options List */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let optionStyle = 'bg-white border-2 border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50/40';

            if (isAnswerSubmitted) {
              if (isCorrect) {
                optionStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-bold shadow-xs';
              } else if (isSelected) {
                optionStyle = 'bg-rose-50 border-2 border-rose-400 text-rose-900 line-through';
              } else {
                optionStyle = 'bg-slate-50 border border-slate-200 text-slate-400 opacity-60';
              }
            }

            const optionLabels = ['A', 'B', 'C', 'D'];

            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl text-left font-medium transition-all flex items-center justify-between gap-3 text-base ${optionStyle} ${
                  !isAnswerSubmitted ? 'cursor-pointer active:scale-99' : 'cursor-default'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      isAnswerSubmitted && isCorrect
                        ? 'bg-emerald-500 text-white'
                        : isAnswerSubmitted && isSelected
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {optionLabels[idx]}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 animate-in zoom-in" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-6 h-6 text-rose-500 shrink-0 animate-in zoom-in" />
                )}
              </button>
            );
          })}
        </div>

        {/* Mascot Reaction Balloon with Replay Sound */}
        {mascotReaction && (
          <div
            className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-sm font-semibold mb-6 animate-in slide-in-from-bottom-2 ${mascotReaction.color}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{mascotReaction.emoji}</span>
              <p className="flex-1">{mascotReaction.msg}</p>
            </div>
            {soundEnabled && selectedIndex !== null && (
              <button
                type="button"
                onClick={() => {
                  if (selectedIndex === currentQ.correctIndex) {
                    playCorrectSound(true);
                  } else {
                    playWrongSound(true);
                  }
                }}
                title="Bấm để phát lại âm thanh"
                className="p-1.5 rounded-xl hover:bg-black/5 text-slate-500 transition-colors shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* DETAILED EXPLANATION SECTION (Requirements: "đáp án có giải thích chi tiết sau mỗi câu hỏi") */}
        {isAnswerSubmitted && (
          <div className="mt-6 pt-6 border-t-2 border-dashed border-amber-200 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg text-sm">📖</span>
              <h3 className="font-bold text-slate-800 text-base font-display">
                Lời Giải & Giải Thích Chi Tiết Từng Bước
              </h3>
            </div>

            {/* Steps */}
            <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200/80 mb-4 space-y-2 text-sm text-slate-700 leading-relaxed">
              {currentQ.explanation.steps.map((step, sIdx) => (
                <div key={sIdx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold shrink-0">•</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* Key formula if present */}
            {currentQ.explanation.keyFormula && (
              <div className="bg-sky-50 rounded-xl p-3 border border-sky-200 mb-3 text-xs sm:text-sm text-sky-900 flex items-start gap-2">
                <span className="text-base shrink-0">🔑</span>
                <div>
                  <span className="font-bold text-sky-800">Quy tắc vàng: </span>
                  <span className="font-mono font-medium">{currentQ.explanation.keyFormula}</span>
                </div>
              </div>
            )}

            {/* Common Trap Warning */}
            {currentQ.explanation.commonTrap && (
              <div className="bg-rose-50 rounded-xl p-3 border border-rose-200 text-xs sm:text-sm text-rose-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-800">Chú ý bẫy học sinh hay mắc: </span>
                  <span>{currentQ.explanation.commonTrap}</span>
                </div>
              </div>
            )}

            {/* Next question action button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center gap-2"
              >
                <span>
                  {currentIndex + 1 < questions.length ? 'Câu Tiếp Theo' : 'Hoàn Thành & Xem Kết Quả'}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Exit confirmation button */}
      <div className="flex justify-between items-center px-2">
        <button
          onClick={() => {
            if (window.confirm('Bạn có chắc muốn tạm dừng bài thi trắc nghiệm này không?')) {
              setIsQuizActive(false);
              setIsTimerRunning(false);
            }
          }}
          className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 font-semibold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Thoát ra màn hình chọn chủ đề</span>
        </button>

        <span className="text-xs text-slate-400">
          Học sinh: <strong className="text-slate-600">{student.name} ({student.grade})</strong>
        </span>
      </div>
    </div>
  );
};
