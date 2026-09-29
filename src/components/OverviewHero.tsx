import React from 'react';
import { StudentProfile, TopicId } from '../types/math';
import { TOPICS } from '../data/chapter1Questions';
import { ArrowRight, Trophy, BookOpen, Sparkles, Zap, Star } from 'lucide-react';
import { playTapSound } from '../utils/soundEffects';

interface OverviewHeroProps {
  student: StudentProfile;
  soundEnabled: boolean;
  onStartQuiz: (topicId?: TopicId) => void;
  onGoToPuzzles: () => void;
  onGoToLeaderboard: () => void;
  onGoToHandbook: () => void;
  onOpenProfile: () => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({
  student,
  soundEnabled,
  onStartQuiz,
  onGoToPuzzles,
  onGoToLeaderboard,
  onGoToHandbook,
  onOpenProfile,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in duration-200">
      
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-10 text-white shadow-lg mb-10">
        
        {/* Soft Background Accents */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-12 top-6 text-6xl opacity-20 select-none hidden lg:block">📐</div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-amber-100 mb-3">
              <span>🎒</span>
              <span>Toán 6 • Kết Nối Tri Thức Với Cuộc Sống</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight leading-tight mb-3">
              Chào mừng bạn <span className="underline decoration-amber-300 decoration-wavy">{student.name}</span>!
            </h1>

            <p className="text-amber-100 text-sm sm:text-base leading-relaxed mb-6">
              Sẵn sàng cho chuyến thám hiểm <strong>Chương 1: Tập hợp các số tự nhiên</strong> với các trò chơi trắc nghiệm sinh động, giải đố tương tác và bảng vàng danh dự!
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => {
                  playTapSound(soundEnabled);
                  onStartQuiz();
                }}
                className="px-6 py-3.5 rounded-2xl bg-white text-amber-900 hover:bg-amber-50 font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>Bắt Đầu Trắc Nghiệm Ngay</span>
              </button>

              <button
                onClick={() => {
                  playTapSound(soundEnabled);
                  onGoToPuzzles();
                }}
                className="px-5 py-3.5 rounded-2xl bg-amber-600/60 hover:bg-amber-600/80 border border-white/25 text-white font-bold text-sm sm:text-base transition-all flex items-center gap-2"
              >
                <span>Giải Đố Tập Hợp 🧩</span>
              </button>
            </div>
          </div>

          {/* Student Mascot Showcase Card */}
          <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-3xl p-6 text-center shrink-0 w-full sm:w-64 shadow-inner">
            <div className="relative inline-block mb-2">
              <span className="text-6xl block drop-shadow-md">{student.avatar}</span>
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 text-xs px-2 py-0.5 rounded-full font-extrabold shadow-xs">
                Lớp {student.grade}
              </span>
            </div>

            <h3 className="font-extrabold text-lg text-white font-display mt-1">
              {student.name}
            </h3>
            <p className="text-xs text-amber-200 font-semibold mb-3">
              Bạn đồng hành: {student.avatarName}
            </p>

            <button
              onClick={() => {
                playTapSound(soundEnabled);
                onOpenProfile();
              }}
              className="text-xs text-white/90 hover:text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl font-bold transition-all w-full"
            >
              Chỉnh sửa hồ sơ ✏️
            </button>
          </div>
        </div>
      </div>

      {/* 4 Knowledge Islands of Chapter 1 */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 font-display">
              Luyện Tập Theo Chủ Đề
            </h2>
            <p className="text-xs text-slate-500">
              4 ốc đảo kiến thức trọng tâm Chương 1 Toán 6 Kết Nối Tri Thức
            </p>
          </div>
          <button
            onClick={() => {
              playTapSound(soundEnabled);
              onGoToHandbook();
            }}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            <BookOpen className="w-4 h-4" />
            <span>Xem Bí Kíp Chương 1</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOPICS.map((topic, index) => (
            <div
              key={topic.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-100 hover:border-amber-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl p-2 rounded-2xl bg-amber-50 border border-amber-100">
                    {topic.icon}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                    {topic.questionCount} câu
                  </span>
                </div>

                <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-1.5 break-words group-hover:text-amber-700 transition-colors">
                  {index + 1}. {topic.title}
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed break-words">
                  <span className="font-semibold text-amber-700">{topic.lessonName}</span> · {topic.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    playTapSound(soundEnabled);
                    onStartQuiz(topic.id);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-50 group-hover:bg-amber-500 text-amber-900 group-hover:text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1 active:scale-98"
                >
                  <span>Bắt đầu luyện tập →</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Navigation Cards (Puzzles, Leaderboard, Handbook) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Card 1: Puzzles */}
        <div
          onClick={() => {
            playTapSound(soundEnabled);
            onGoToPuzzles();
          }}
          className="bg-gradient-to-br from-sky-50 to-white rounded-3xl p-5 border-2 border-sky-200 hover:border-sky-400 cursor-pointer shadow-xs hover:shadow-md transition-all group"
        >
          <span className="text-3xl block mb-2">🧩</span>
          <h3 className="font-bold text-slate-800 text-base font-display group-hover:text-sky-700 transition-colors">
            Giải Đố Về Tập Hợp
          </h3>
          <p className="text-xs text-slate-500 mt-1 mb-3">
            Xếp số vào tập hợp A, B, phần giao, thẻ bài số La Mã và điền ∈, ∉.
          </p>
          <span className="text-xs font-bold text-sky-700 flex items-center gap-1">
            <span>Chơi mini-game</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Card 2: Leaderboard */}
        <div
          onClick={() => {
            playTapSound(soundEnabled);
            onGoToLeaderboard();
          }}
          className="bg-gradient-to-br from-amber-50 to-white rounded-3xl p-5 border-2 border-amber-200 hover:border-amber-400 cursor-pointer shadow-xs hover:shadow-md transition-all group"
        >
          <span className="text-3xl block mb-2">🏆</span>
          <h3 className="font-bold text-slate-800 text-base font-display group-hover:text-amber-700 transition-colors">
            Bảng Vàng Danh Dự
          </h3>
          <p className="text-xs text-slate-500 mt-1 mb-3">
            Xem thứ hạng toàn khối 6, điểm số cao nhất, thời gian và huy hiệu đạt được!
          </p>
          <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
            <span>Xem bảng xếp hạng</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Card 3: Handbook */}
        <div
          onClick={() => {
            playTapSound(soundEnabled);
            onGoToHandbook();
          }}
          className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-5 border-2 border-emerald-200 hover:border-emerald-400 cursor-pointer shadow-xs hover:shadow-md transition-all group"
        >
          <span className="text-3xl block mb-2">📖</span>
          <h3 className="font-bold text-slate-800 text-base font-display group-hover:text-emerald-700 transition-colors">
            Sổ Tay Bí Kíp Toán 6
          </h3>
          <p className="text-xs text-slate-500 mt-1 mb-3">
            Tổng hợp công thức lũy thừa, bảng 25 số nguyên tố, dấu hiệu chia hết và mẹo nhớ.
          </p>
          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
            <span>Mở sổ tay bí kíp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>

    </div>
  );
};
