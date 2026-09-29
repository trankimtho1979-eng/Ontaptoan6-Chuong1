import React, { useState } from 'react';
import { DEFAULT_AVATARS, saveStudentProfile } from '../utils/leaderboardStorage';
import { GradeClass, StudentProfile } from '../types/math';
import { playTapSound } from '../utils/soundEffects';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile | null;
  onSaveProfile: (profile: StudentProfile) => void;
  soundEnabled: boolean;
}

const GRADES: GradeClass[] = ['6A1', '6A2', '6A3', '6A4', '6A5', '6A6', '6A7', '6A8'];

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
  soundEnabled,
}) => {
  const [name, setName] = useState(currentProfile?.name || '');
  const [grade, setGrade] = useState<GradeClass>(currentProfile?.grade || '6A1');
  const [selectedAvatar, setSelectedAvatar] = useState(currentProfile?.avatar || DEFAULT_AVATARS[0].emoji);
  const [avatarName, setAvatarName] = useState(currentProfile?.avatarName || DEFAULT_AVATARS[0].name);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setErrorMsg('Vui lòng nhập Họ và tên của bạn để bắt đầu làm bài nhé!');
      return;
    }
    if (trimmed.length < 2) {
      setErrorMsg('Họ và tên cần có ít nhất 2 ký tự.');
      return;
    }

    playTapSound(soundEnabled);
    const newProfile: StudentProfile = {
      name: trimmed,
      grade,
      avatar: selectedAvatar,
      avatarName,
      totalScore: currentProfile?.totalScore || 0,
    };
    saveStudentProfile(newProfile);
    onSaveProfile(newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-amber-200 overflow-hidden p-6 sm:p-8">
        
        {/* Header Decor */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 text-3xl mb-3 shadow-inner">
            {selectedAvatar}
          </div>
          <h2 className="text-2xl font-bold text-slate-800 font-display">
            Hồ Sơ Nhà Thám Hiểm Toán 6
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Nhập thông tin để vinh danh trên Bảng Xếp Hạng thành tích nhé!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Họ và tên học sinh <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Ví dụ: Nguyễn Văn An"
              maxLength={40}
              autoFocus
              className="w-full px-4 py-3 text-base rounded-xl border-2 border-slate-200 focus:border-amber-400 focus:ring-3 focus:ring-amber-100 outline-none transition-all placeholder:text-slate-400 font-medium"
            />
            {errorMsg && (
              <p className="text-xs text-rose-500 font-medium mt-1.5 flex items-center gap-1">
                <span>⚠️</span> {errorMsg}
              </p>
            )}
          </div>

          {/* Grade selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Lớp học
            </label>
            <div className="grid grid-cols-4 gap-2">
              {GRADES.map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => {
                    playTapSound(soundEnabled);
                    setGrade(g);
                  }}
                  className={`py-2 px-3 text-sm font-bold rounded-xl border-2 transition-all ${
                    grade === g
                      ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-sm scale-102'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Avatar mascot selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Chọn linh vật bạn đồng hành
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {DEFAULT_AVATARS.map((av) => {
                const isSelected = selectedAvatar === av.emoji;
                return (
                  <button
                    type="button"
                    key={av.id}
                    onClick={() => {
                      playTapSound(soundEnabled);
                      setSelectedAvatar(av.emoji);
                      setAvatarName(av.name);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? 'bg-amber-50 border-amber-400 shadow-xs ring-2 ring-amber-300/40'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-2xl">{av.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-800 truncate">{av.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{av.title}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            {currentProfile && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
              >
                Để sau
              </button>
            )}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base shadow-md hover:shadow-lg transition-all transform active:scale-98"
            >
              Lưu & Bắt Đầu Thám Hiểm 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
