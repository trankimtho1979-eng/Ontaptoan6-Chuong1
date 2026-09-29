import React, { useState } from 'react';
import { LeaderboardEntry, StudentProfile } from '../types/math';
import { getLeaderboard } from '../utils/leaderboardStorage';
import { Trophy, Medal, Search, Clock, Target, Award, ArrowUpDown, UserCheck } from 'lucide-react';
import { playTapSound } from '../utils/soundEffects';

interface LeaderboardViewProps {
  currentStudent: StudentProfile | null;
  soundEnabled: boolean;
  onStartQuiz: () => void;
  onOpenProfile: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  currentStudent,
  soundEnabled,
  onStartQuiz,
  onOpenProfile,
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => getLeaderboard());
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter entries
  const filteredEntries = entries.filter((item) => {
    const matchesGrade = selectedGrade === 'all' || item.grade === selectedGrade;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesGrade && matchesSearch;
  });

  const top3 = filteredEntries.slice(0, 3);
  const remaining = filteredEntries.slice(3);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const formatDate = (ts: number) => {
    const date = new Date(ts);
    return `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()} - ${date.getDate()}/${date.getMonth() + 1}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-200">
      
      {/* Page Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <Trophy className="w-3.5 h-3.5" />
          <span>Bảng Vàng Danh Dự Toán 6</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-display">
          Bảng Xếp Hạng Thành Tích Học Tập
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
          Vinh danh những nhà thám hiểm toán học xuất sắc nhất Chương 1 Kết nối tri thức!
        </p>
      </div>

      {/* Top 3 Podium Cards */}
      {top3.length > 0 && selectedGrade === 'all' && !searchQuery && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 items-end">
          
          {/* Rank 2 (Silver) */}
          {top3[1] && (
            <div className="order-2 sm:order-1 bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm text-center transform sm:translate-y-2">
              <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shadow-inner border border-slate-200">
                {top3[1].avatar}
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 text-slate-700 mb-1">
                🥈 Hạng 2
              </span>
              <h3 className="font-bold text-slate-800 text-sm truncate">
                {top3[1].name}
              </h3>
              <p className="text-xs text-slate-500 font-semibold mb-2">
                Lớp {top3[1].grade}
              </p>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-lg font-mono font-black text-slate-800 block">
                  {top3[1].score} điểm
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {top3[1].accuracy}% đúng · {formatTime(top3[1].timeSeconds)}
                </span>
              </div>
            </div>
          )}

          {/* Rank 1 (Gold) */}
          {top3[0] && (
            <div className="order-1 sm:order-2 bg-gradient-to-b from-amber-50 to-white rounded-3xl p-6 border-2 border-amber-400 shadow-md text-center transform sm:-translate-y-2 ring-4 ring-amber-300/30">
              <div className="relative w-16 h-16 mx-auto mb-2 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shadow-inner border border-amber-300">
                {top3[0].avatar}
                <span className="absolute -top-3 -right-2 text-xl animate-bounce">👑</span>
              </div>
              <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-950 mb-1 shadow-xs">
                🥇 Quán Quân
              </span>
              <h3 className="font-bold text-slate-900 text-base truncate">
                {top3[0].name}
              </h3>
              <p className="text-xs text-amber-700 font-bold mb-2">
                Lớp {top3[0].grade}
              </p>
              <div className="bg-amber-100/70 p-3 rounded-xl border border-amber-200">
                <span className="text-2xl font-mono font-black text-amber-950 block">
                  {top3[0].score} điểm
                </span>
                <span className="text-xs text-amber-800 font-bold">
                  {top3[0].accuracy}% đúng · {formatTime(top3[0].timeSeconds)}
                </span>
              </div>
            </div>
          )}

          {/* Rank 3 (Bronze) */}
          {top3[2] && (
            <div className="order-3 sm:order-3 bg-white rounded-3xl p-5 border-2 border-amber-200/80 shadow-sm text-center transform sm:translate-y-4">
              <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl shadow-inner border border-orange-200">
                {top3[2].avatar}
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-1">
                🥉 Hạng 3
              </span>
              <h3 className="font-bold text-slate-800 text-sm truncate">
                {top3[2].name}
              </h3>
              <p className="text-xs text-slate-500 font-semibold mb-2">
                Lớp {top3[2].grade}
              </p>
              <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                <span className="text-lg font-mono font-black text-amber-900 block">
                  {top3[2].score} điểm
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {top3[2].accuracy}% đúng · {formatTime(top3[2].timeSeconds)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm tên học sinh..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-amber-400 outline-none"
          />
        </div>

        {/* Filter by Grade */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-500 font-medium shrink-0 mr-1">Lớp:</span>
          {['all', '6A1', '6A2', '6A3', '6A4'].map((g) => (
            <button
              key={g}
              onClick={() => {
                playTapSound(soundEnabled);
                setSelectedGrade(g);
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                selectedGrade === g
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {g === 'all' ? 'Tất cả lớp' : g}
            </button>
          ))}
        </div>
      </div>

      {/* Full Ranking Table */}
      <div className="bg-white rounded-3xl border-2 border-amber-200 shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-50/70 border-b border-amber-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4 text-center w-14">Hạng</th>
                <th className="py-3 px-4">Học Sinh</th>
                <th className="py-3 px-3 text-center">Lớp</th>
                <th className="py-3 px-3 text-right">Điểm Số</th>
                <th className="py-3 px-3 text-center hidden sm:table-cell">Chính Xác</th>
                <th className="py-3 px-3 text-center hidden md:table-cell">Thời Gian</th>
                <th className="py-3 px-4 hidden lg:table-cell">Danh Hiệu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Chưa tìm thấy học sinh nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredEntries.map((item, index) => {
                  const isCurrentUser =
                    currentStudent &&
                    currentStudent.name.toLowerCase() === item.name.toLowerCase();

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-amber-50/40 transition-colors ${
                        isCurrentUser ? 'bg-amber-100/50 font-bold' : ''
                      }`}
                    >
                      {/* Rank */}
                      <td className="py-3.5 px-4 text-center font-bold">
                        {index === 0 ? (
                          <span className="text-amber-500 text-lg">🥇</span>
                        ) : index === 1 ? (
                          <span className="text-slate-400 text-lg">🥈</span>
                        ) : index === 2 ? (
                          <span className="text-amber-700 text-lg">🥉</span>
                        ) : (
                          <span className="text-slate-500 font-mono">#{index + 1}</span>
                        )}
                      </td>

                      {/* Student info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl shrink-0">{item.avatar}</span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-800">{item.name}</span>
                              {isCurrentUser && (
                                <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.2 rounded font-bold">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 block sm:hidden">
                              {item.accuracy}% đúng · {formatTime(item.timeSeconds)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Class */}
                      <td className="py-3.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold">
                          {item.grade}
                        </span>
                      </td>

                      {/* Score */}
                      <td className="py-3.5 px-3 text-right font-mono font-bold text-amber-700">
                        {item.score}
                      </td>

                      {/* Accuracy */}
                      <td className="py-3.5 px-3 text-center hidden sm:table-cell font-mono">
                        <span
                          className={`font-bold ${
                            item.accuracy >= 90
                              ? 'text-emerald-600'
                              : item.accuracy >= 70
                              ? 'text-amber-600'
                              : 'text-slate-600'
                          }`}
                        >
                          {item.accuracy}%
                        </span>
                      </td>

                      {/* Time */}
                      <td className="py-3.5 px-3 text-center hidden md:table-cell font-mono text-slate-500">
                        {formatTime(item.timeSeconds)}
                      </td>

                      {/* Badge Title */}
                      <td className="py-3.5 px-4 hidden lg:table-cell text-xs text-amber-900 font-semibold truncate max-w-[160px]">
                        {item.badgeTitle}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom CTA Card */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 text-white text-center shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-bold font-display">
            Muốn thăng hạng trên Bảng Vàng?
          </h3>
          <p className="text-xs text-amber-100">
            Làm bài thi trắc nghiệm ngay để tích lũy điểm combo và ghi tên mình lên vị trí Quán quân!
          </p>
        </div>

        <button
          onClick={() => {
            playTapSound(soundEnabled);
            onStartQuiz();
          }}
          className="px-6 py-3 rounded-2xl bg-white text-amber-900 hover:bg-amber-50 font-bold text-sm shadow-sm transition-all transform active:scale-95 shrink-0"
        >
          Làm Bài Thi Ngay 🚀
        </button>
      </div>
    </div>
  );
};
