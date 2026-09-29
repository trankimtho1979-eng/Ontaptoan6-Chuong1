import React from 'react';
import { StudentProfile } from '../types/math';
import { Volume2, VolumeX, User, Sparkles } from 'lucide-react';
import { playTapSound } from '../utils/soundEffects';

export type ActiveTab = 'overview' | 'quiz' | 'puzzles' | 'leaderboard' | 'handbook';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  student: StudentProfile | null;
  onOpenProfile: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  student,
  onOpenProfile,
  soundEnabled,
  onToggleSound,
}) => {
  const handleNavClick = (tab: ActiveTab) => {
    playTapSound(soundEnabled);
    onSelectTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('overview')}
          className="flex items-center gap-2 text-left group"
        >
          <span className="text-2xl transform group-hover:scale-110 transition-transform">🦉</span>
          <span className="text-lg sm:text-xl font-bold font-display tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
            Toán 6 Phiêu Lưu Ký
          </span>
        </button>

        {/* Zone 2: 4-5 clean navigation links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => handleNavClick('overview')}
            className={`px-3 py-1.5 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-amber-100 text-amber-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Tổng Quan
          </button>

          <button
            onClick={() => handleNavClick('quiz')}
            className={`px-3 py-1.5 text-sm font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Trắc Nghiệm
          </button>

          <button
            onClick={() => handleNavClick('puzzles')}
            className={`px-3 py-1.5 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'puzzles'
                ? 'bg-amber-100 text-amber-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Giải Đố Tập Hợp
          </button>

          <button
            onClick={() => handleNavClick('leaderboard')}
            className={`px-3 py-1.5 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'leaderboard'
                ? 'bg-amber-100 text-amber-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Bảng Xếp Hạng
          </button>

          <button
            onClick={() => handleNavClick('handbook')}
            className={`px-3 py-1.5 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'handbook'
                ? 'bg-amber-100 text-amber-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Sổ Tay Bí Kíp
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions (Sound + Profile) */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle with Sound Preview */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Tắt âm thanh trò chơi' : 'Bật âm thanh trò chơi'}
            title={soundEnabled ? 'Âm thanh: ĐANG BẬT (Bấm để tắt)' : 'Âm thanh: ĐANG TẮT (Bấm để bật)'}
            className={`p-2 rounded-xl transition-all flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-5 h-5 text-amber-600 animate-pulse" />
                <span className="text-[11px] font-bold text-amber-800 hidden sm:inline">Âm thanh</span>
              </>
            ) : (
              <>
                <VolumeX className="w-5 h-5 text-slate-400" />
                <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">Tắt</span>
              </>
            )}
          </button>

          {/* Student Profile Trigger */}
          {student ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-2xl transition-all text-left group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">
                {student.avatar}
              </span>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[110px]">
                  {student.name}
                </p>
                <p className="text-[10px] font-semibold text-amber-700 leading-tight">
                  Lớp {student.grade}
                </p>
              </div>
            </button>
          ) : (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold rounded-xl shadow-xs transition-all whitespace-nowrap"
            >
              <User className="w-4 h-4" />
              <span>Nhập Tên Bạn</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-100 bg-white text-xs">
        <button
          onClick={() => handleNavClick('overview')}
          className={`px-2 py-1 font-semibold rounded-lg ${
            activeTab === 'overview' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-500'
          }`}
        >
          Tổng quan
        </button>
        <button
          onClick={() => handleNavClick('quiz')}
          className={`px-2 py-1 font-semibold rounded-lg ${
            activeTab === 'quiz' ? 'bg-amber-500 text-white font-bold' : 'text-slate-500'
          }`}
        >
          Trắc nghiệm
        </button>
        <button
          onClick={() => handleNavClick('puzzles')}
          className={`px-2 py-1 font-semibold rounded-lg ${
            activeTab === 'puzzles' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-500'
          }`}
        >
          Giải đố
        </button>
        <button
          onClick={() => handleNavClick('leaderboard')}
          className={`px-2 py-1 font-semibold rounded-lg ${
            activeTab === 'leaderboard' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-500'
          }`}
        >
          Bảng điểm
        </button>
        <button
          onClick={() => handleNavClick('handbook')}
          className={`px-2 py-1 font-semibold rounded-lg ${
            activeTab === 'handbook' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-500'
          }`}
        >
          Bí kíp
        </button>
      </div>
    </header>
  );
};
