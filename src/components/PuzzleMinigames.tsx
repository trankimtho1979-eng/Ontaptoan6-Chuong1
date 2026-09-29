import React, { useState } from 'react';
import { StudentProfile } from '../types/math';
import { SET_SORTING_GAMES, ROMAN_NUMERAL_PAIRS, BELONGS_PUZZLE_ITEMS, BelongsSymbolGameItem } from '../data/puzzleData';
import { playCorrectSound, playWrongSound, playTapSound } from '../utils/soundEffects';
import { Check, X, RotateCcw, Sparkles, HelpCircle, Layers, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PuzzleMinigamesProps {
  student: StudentProfile;
  soundEnabled: boolean;
  onOpenProfile: () => void;
}

type PuzzleTab = 'set_sorting' | 'belongs_symbol' | 'roman_matching';

export const PuzzleMinigames: React.FC<PuzzleMinigamesProps> = ({
  student,
  soundEnabled,
  onOpenProfile,
}) => {
  const [activeTab, setActiveTab] = useState<PuzzleTab>('set_sorting');

  // --- GAME 1 STATE: SET SORTING ---
  const [activeSetGameIndex, setActiveSetGameIndex] = useState(0);
  const currentGame = SET_SORTING_GAMES[activeSetGameIndex];
  const [userAssignments, setUserAssignments] = useState<Record<string, 'setA' | 'setB' | 'both' | 'neither'>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isSetGameChecked, setIsSetGameChecked] = useState(false);
  const [setGameScore, setSetGameScore] = useState<number | null>(null);

  const handleAssignItem = (bucket: 'setA' | 'setB' | 'both' | 'neither') => {
    if (!selectedItemId) return;
    playTapSound(soundEnabled);
    setUserAssignments((prev) => ({
      ...prev,
      [selectedItemId]: bucket,
    }));
    setSelectedItemId(null);
  };

  const checkSetGame = () => {
    let correct = 0;
    currentGame.items.forEach((item) => {
      if (userAssignments[item.id] === item.correctSet) {
        correct++;
      }
    });
    setSetGameScore(correct);
    setIsSetGameChecked(true);

    if (correct === currentGame.items.length) {
      playCorrectSound(soundEnabled);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } else {
      playWrongSound(soundEnabled);
    }
  };

  const resetSetGame = () => {
    playTapSound(soundEnabled);
    setUserAssignments({});
    setSelectedItemId(null);
    setIsSetGameChecked(false);
    setSetGameScore(null);
  };

  // --- GAME 2: BELONGS SYMBOL (∈ or ∉) ---
  const [belongsIndex, setBelongsIndex] = useState(0);
  const [belongsAnswers, setBelongsAnswers] = useState<Record<string, '∈' | '∉'>>({});
  const [belongsScore, setBelongsScore] = useState(0);
  const currentBelongsItem = BELONGS_PUZZLE_ITEMS[belongsIndex];
  const isCurrentBelongsAnswered = !!belongsAnswers[currentBelongsItem.id];

  const handleBelongsAnswer = (symbol: '∈' | '∉') => {
    if (isCurrentBelongsAnswered) return;
    const isCorrect = symbol === currentBelongsItem.correctSymbol;
    setBelongsAnswers((prev) => ({ ...prev, [currentBelongsItem.id]: symbol }));

    if (isCorrect) {
      setBelongsScore((prev) => prev + 1);
      playCorrectSound(soundEnabled);
    } else {
      playWrongSound(soundEnabled);
    }
  };

  const nextBelongsItem = () => {
    playTapSound(soundEnabled);
    if (belongsIndex + 1 < BELONGS_PUZZLE_ITEMS.length) {
      setBelongsIndex((prev) => prev + 1);
    }
  };

  const resetBelongsGame = () => {
    playTapSound(soundEnabled);
    setBelongsIndex(0);
    setBelongsAnswers({});
    setBelongsScore(0);
  };

  // --- GAME 3: ROMAN NUMERAL MATCHING ---
  const [selectedRomanCard, setSelectedRomanCard] = useState<string | null>(null);
  const [selectedArabicCard, setSelectedArabicCard] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]); // pair ids matched

  const handleSelectRoman = (roman: string, id: string) => {
    if (matchedPairs.includes(id)) return;
    playTapSound(soundEnabled);
    setSelectedRomanCard(id);

    if (selectedArabicCard !== null) {
      // Check match
      const targetPair = ROMAN_NUMERAL_PAIRS.find((p) => p.id === id);
      if (targetPair && targetPair.arabic === selectedArabicCard) {
        // Matched!
        playCorrectSound(soundEnabled);
        setMatchedPairs((prev) => [...prev, id]);
        setSelectedRomanCard(null);
        setSelectedArabicCard(null);
      } else {
        playWrongSound(soundEnabled);
        setTimeout(() => {
          setSelectedRomanCard(null);
          setSelectedArabicCard(null);
        }, 600);
      }
    }
  };

  const handleSelectArabic = (arabic: number, id: string) => {
    if (matchedPairs.includes(id)) return;
    playTapSound(soundEnabled);
    setSelectedArabicCard(arabic);

    if (selectedRomanCard !== null) {
      // Check match
      const targetPair = ROMAN_NUMERAL_PAIRS.find((p) => p.id === selectedRomanCard);
      if (targetPair && targetPair.arabic === arabic) {
        // Matched!
        playCorrectSound(soundEnabled);
        setMatchedPairs((prev) => [...prev, targetPair.id]);
        setSelectedRomanCard(null);
        setSelectedArabicCard(null);
      } else {
        playWrongSound(soundEnabled);
        setTimeout(() => {
          setSelectedRomanCard(null);
          setSelectedArabicCard(null);
        }, 600);
      }
    }
  };

  const resetRomanGame = () => {
    playTapSound(soundEnabled);
    setMatchedPairs([]);
    setSelectedRomanCard(null);
    setSelectedArabicCard(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Phòng Thí Nghiệm & Giải Đố Toán Học
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-display mt-2 mb-2">
          Góc Giải Đố Vui Về Tập Hợp & Số Tự Nhiên
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Các trò chơi tương tác sinh động giúp các bạn học sinh lớp 6 nắm chắc khái niệm tập hợp, phần tử, và số La Mã!
        </p>
      </div>

      {/* Mini-game Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-amber-100/70 rounded-2xl max-w-lg mx-auto mb-8 border border-amber-200">
        <button
          onClick={() => {
            playTapSound(soundEnabled);
            setActiveTab('set_sorting');
          }}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'set_sorting'
              ? 'bg-white text-amber-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          📦 Phân Loại Vào Tập Hợp
        </button>

        <button
          onClick={() => {
            playTapSound(soundEnabled);
            setActiveTab('belongs_symbol');
          }}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'belongs_symbol'
              ? 'bg-white text-amber-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🎯 Điền Ký Hiệu ∈ hay ∉
        </button>

        <button
          onClick={() => {
            playTapSound(soundEnabled);
            setActiveTab('roman_matching');
          }}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'roman_matching'
              ? 'bg-white text-amber-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🏛️ Thẻ Bài Số La Mã
        </button>
      </div>

      {/* TAB 1: SET SORTING GAME */}
      {activeTab === 'set_sorting' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm animate-in fade-in">
          
          {/* Level Switcher */}
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-800 font-display">
                {currentGame.title}
              </h2>
              <p className="text-xs text-slate-500">{currentGame.description}</p>
            </div>
            
            <div className="flex items-center gap-2">
              {SET_SORTING_GAMES.map((g, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playTapSound(soundEnabled);
                    setActiveSetGameIndex(idx);
                    resetSetGame();
                  }}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                    activeSetGameIndex === idx
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Màn {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Number Pool (Items to be placed) */}
          <div className="mb-6 bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
            <p className="text-xs font-bold text-slate-600 mb-2.5 flex items-center gap-1.5">
              <span>👇</span> Chạm chọn một con số, sau đó bấm vào tập hợp bên dưới để xếp vào:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {currentGame.items.map((item) => {
                const assigned = userAssignments[item.id];
                const isSelected = selectedItemId === item.id;

                let badgeColor = 'bg-white text-slate-800 border-2 border-slate-200 hover:border-amber-400';
                if (isSelected) {
                  badgeColor = 'bg-amber-400 text-amber-950 border-2 border-amber-500 shadow-md scale-105 ring-2 ring-amber-300';
                } else if (assigned) {
                  badgeColor = 'bg-slate-100 text-slate-400 border border-slate-200 opacity-60';
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      playTapSound(soundEnabled);
                      setSelectedItemId(isSelected ? null : item.id);
                    }}
                    className={`px-4 py-2 rounded-xl text-base font-bold font-mono transition-all transform active:scale-95 ${badgeColor}`}
                  >
                    {item.label}
                    {assigned && <span className="ml-1 text-[10px]">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Set Bins / Buckets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            
            {/* Set A */}
            <div className="bg-sky-50/70 border-2 border-sky-300 rounded-2xl p-4 flex flex-col justify-between min-h-[160px]">
              <div>
                <h3 className="font-bold text-xs text-sky-900 mb-2 truncate">
                  {currentGame.setAName}
                </h3>
                <div className="flex flex-wrap gap-1.5 min-h-[60px]">
                  {currentGame.items
                    .filter((it) => userAssignments[it.id] === 'setA')
                    .map((it) => (
                      <span
                        key={it.id}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                          isSetGameChecked
                            ? it.correctSet === 'setA'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-rose-500 text-white'
                            : 'bg-white text-sky-900 border border-sky-200'
                        }`}
                      >
                        {it.label}
                      </span>
                    ))}
                </div>
              </div>
              <button
                disabled={!selectedItemId}
                onClick={() => handleAssignItem('setA')}
                className="mt-2 w-full py-1.5 text-xs font-bold text-sky-700 bg-white hover:bg-sky-100 rounded-lg border border-sky-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                + Bỏ vào tập này
              </button>
            </div>

            {/* Set B */}
            <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl p-4 flex flex-col justify-between min-h-[160px]">
              <div>
                <h3 className="font-bold text-xs text-emerald-900 mb-2 truncate">
                  {currentGame.setBName}
                </h3>
                <div className="flex flex-wrap gap-1.5 min-h-[60px]">
                  {currentGame.items
                    .filter((it) => userAssignments[it.id] === 'setB')
                    .map((it) => (
                      <span
                        key={it.id}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                          isSetGameChecked
                            ? it.correctSet === 'setB'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-rose-500 text-white'
                            : 'bg-white text-emerald-900 border border-emerald-200'
                        }`}
                      >
                        {it.label}
                      </span>
                    ))}
                </div>
              </div>
              <button
                disabled={!selectedItemId}
                onClick={() => handleAssignItem('setB')}
                className="mt-2 w-full py-1.5 text-xs font-bold text-emerald-700 bg-white hover:bg-emerald-100 rounded-lg border border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                + Bỏ vào tập này
              </button>
            </div>

            {/* Both (Intersection) */}
            <div className="bg-purple-50/70 border-2 border-purple-300 rounded-2xl p-4 flex flex-col justify-between min-h-[160px]">
              <div>
                <h3 className="font-bold text-xs text-purple-900 mb-2 truncate">
                  Thuộc Cả Hai (Giao A ∩ B)
                </h3>
                <div className="flex flex-wrap gap-1.5 min-h-[60px]">
                  {currentGame.items
                    .filter((it) => userAssignments[it.id] === 'both')
                    .map((it) => (
                      <span
                        key={it.id}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                          isSetGameChecked
                            ? it.correctSet === 'both'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-rose-500 text-white'
                            : 'bg-white text-purple-900 border border-purple-200'
                        }`}
                      >
                        {it.label}
                      </span>
                    ))}
                </div>
              </div>
              <button
                disabled={!selectedItemId}
                onClick={() => handleAssignItem('both')}
                className="mt-2 w-full py-1.5 text-xs font-bold text-purple-700 bg-white hover:bg-purple-100 rounded-lg border border-purple-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                + Bỏ vào phần giao
              </button>
            </div>

            {/* Neither */}
            <div className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-4 flex flex-col justify-between min-h-[160px]">
              <div>
                <h3 className="font-bold text-xs text-amber-900 mb-2 truncate">
                  Không Thuộc Tập Nào
                </h3>
                <div className="flex flex-wrap gap-1.5 min-h-[60px]">
                  {currentGame.items
                    .filter((it) => userAssignments[it.id] === 'neither')
                    .map((it) => (
                      <span
                        key={it.id}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                          isSetGameChecked
                            ? it.correctSet === 'neither'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-rose-500 text-white'
                            : 'bg-white text-amber-900 border border-amber-200'
                        }`}
                      >
                        {it.label}
                      </span>
                    ))}
                </div>
              </div>
              <button
                disabled={!selectedItemId}
                onClick={() => handleAssignItem('neither')}
                className="mt-2 w-full py-1.5 text-xs font-bold text-amber-700 bg-white hover:bg-amber-100 rounded-lg border border-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                + Không thuộc
              </button>
            </div>
          </div>

          {/* Verification Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              Đã xếp: {Object.keys(userAssignments).length} / {currentGame.items.length} số
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={resetSetGame}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Xếp Lại</span>
              </button>

              <button
                onClick={checkSetGame}
                disabled={Object.keys(userAssignments).length === 0}
                className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-xs disabled:opacity-50 transition-all"
              >
                Kiểm Tra Kết Quả ✨
              </button>
            </div>
          </div>

          {/* Feedback & Explanation */}
          {isSetGameChecked && setGameScore !== null && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm animate-in slide-in-from-bottom-2">
              <p className="font-bold text-amber-900 text-base mb-1">
                Kết quả: Bạn xếp đúng {setGameScore}/{currentGame.items.length} số!
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong>Giải thích chi tiết: </strong> {currentGame.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: BELONGS SYMBOL (∈ hay ∉) */}
      {activeTab === 'belongs_symbol' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm max-w-2xl mx-auto animate-in fade-in">
          
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-md">
              Câu {belongsIndex + 1} / {BELONGS_PUZZLE_ITEMS.length}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
              Điểm: {belongsScore}
            </span>
          </div>

          {/* Question Card */}
          <div className="text-center py-6 px-4 bg-amber-50/40 rounded-2xl border border-amber-200/80 mb-6">
            <p className="text-xs text-slate-500 mb-2 font-medium">
              {currentBelongsItem.description}
            </p>

            <div className="flex items-center justify-center gap-4 text-3xl sm:text-4xl font-mono font-black text-slate-800 my-4">
              <span className="px-3 py-1.5 bg-white rounded-xl shadow-xs border border-amber-200">
                {currentBelongsItem.element}
              </span>

              <span className="text-amber-500 text-2xl font-sans">
                {isCurrentBelongsAnswered
                  ? belongsAnswers[currentBelongsItem.id]
                  : '❓'}
              </span>

              <span className="px-3 py-1.5 bg-white rounded-xl shadow-xs border border-amber-200">
                {currentBelongsItem.setNotation}
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-700">
              Điền ký hiệu thích hợp: <strong className="text-amber-700">∈ (thuộc)</strong> hay <strong className="text-amber-700">∉ (không thuộc)</strong>?
            </p>
          </div>

          {/* Choice Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              disabled={isCurrentBelongsAnswered}
              onClick={() => handleBelongsAnswer('∈')}
              className={`p-4 rounded-2xl border-2 font-extrabold text-2xl transition-all ${
                isCurrentBelongsAnswered && currentBelongsItem.correctSymbol === '∈'
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : isCurrentBelongsAnswered && belongsAnswers[currentBelongsItem.id] === '∈'
                  ? 'bg-rose-500 text-white border-rose-600'
                  : 'bg-white hover:bg-amber-50 border-slate-200 hover:border-amber-400 text-slate-800'
              }`}
            >
              ∈ (Thuộc)
            </button>

            <button
              disabled={isCurrentBelongsAnswered}
              onClick={() => handleBelongsAnswer('∉')}
              className={`p-4 rounded-2xl border-2 font-extrabold text-2xl transition-all ${
                isCurrentBelongsAnswered && currentBelongsItem.correctSymbol === '∉'
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : isCurrentBelongsAnswered && belongsAnswers[currentBelongsItem.id] === '∉'
                  ? 'bg-rose-500 text-white border-rose-600'
                  : 'bg-white hover:bg-amber-50 border-slate-200 hover:border-amber-400 text-slate-800'
              }`}
            >
              ∉ (Không thuộc)
            </button>
          </div>

          {/* Explanation Callout */}
          {isCurrentBelongsAnswered && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-slate-700 mb-6 animate-in fade-in">
              <span className="font-bold text-amber-900 block mb-1">
                {belongsAnswers[currentBelongsItem.id] === currentBelongsItem.correctSymbol
                  ? '🎉 Hoan hô! Chính xác!'
                  : '💡 Chưa đúng rồi! Xem giải thích bên dưới:'}
              </span>
              <span>{currentBelongsItem.explanation}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              onClick={resetBelongsGame}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chơi lại từ đầu</span>
            </button>

            {isCurrentBelongsAnswered && belongsIndex + 1 < BELONGS_PUZZLE_ITEMS.length && (
              <button
                onClick={nextBelongsItem}
                className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-xs transition-all"
              >
                Câu Tiếp Theo ➔
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ROMAN NUMERAL MATCHING GAME */}
      {activeTab === 'roman_matching' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm animate-in fade-in">
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 font-display">
                Ghép Đôi Thẻ Bài Số La Mã & Hệ Thập Phân
              </h2>
              <p className="text-xs text-slate-500">
                Chạm một thẻ La Mã ở bên trái, sau đó chạm số tương ứng ở bên phải để ghép đôi!
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Đã ghép: {matchedPairs.length} / {ROMAN_NUMERAL_PAIRS.length}
              </span>
              <button
                onClick={resetRomanGame}
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            
            {/* Column 1: Roman Cards */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">
                Chữ Số La Mã
              </span>
              {ROMAN_NUMERAL_PAIRS.map((pair) => {
                const isMatched = matchedPairs.includes(pair.id);
                const isSelected = selectedRomanCard === pair.id;

                return (
                  <button
                    key={'roman-' + pair.id}
                    disabled={isMatched}
                    onClick={() => handleSelectRoman(pair.roman, pair.id)}
                    className={`w-full p-3 sm:p-4 rounded-xl border-2 font-mono font-black text-lg transition-all text-center ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60'
                        : isSelected
                        ? 'bg-amber-400 border-amber-500 text-amber-950 scale-102 shadow-md'
                        : 'bg-white hover:bg-amber-50 border-slate-200 hover:border-amber-300 text-slate-800'
                    }`}
                  >
                    {pair.roman}
                    {isMatched && <span className="ml-2 text-xs font-sans font-normal text-emerald-600">✓ Đã ghép</span>}
                  </button>
                );
              })}
            </div>

            {/* Column 2: Arabic Cards */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">
                Số Tự Nhiên Thập Phân
              </span>
              {[...ROMAN_NUMERAL_PAIRS]
                .sort((a, b) => b.arabic - a.arabic)
                .map((pair) => {
                  const isMatched = matchedPairs.includes(pair.id);
                  const isSelected = selectedArabicCard === pair.arabic;

                  return (
                    <button
                      key={'arabic-' + pair.id}
                      disabled={isMatched}
                      onClick={() => handleSelectArabic(pair.arabic, pair.id)}
                      className={`w-full p-3 sm:p-4 rounded-xl border-2 font-mono font-black text-lg transition-all text-center ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60'
                          : isSelected
                          ? 'bg-amber-400 border-amber-500 text-amber-950 scale-102 shadow-md'
                          : 'bg-white hover:bg-amber-50 border-slate-200 hover:border-amber-300 text-slate-800'
                      }`}
                    >
                      {pair.arabic}
                      {isMatched && <span className="ml-2 text-xs font-sans font-normal text-emerald-600">✓ {pair.meaning}</span>}
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Victory notification */}
          {matchedPairs.length === ROMAN_NUMERAL_PAIRS.length && (
            <div className="mt-8 p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center animate-in zoom-in">
              <span className="text-3xl">🎉</span>
              <h3 className="text-lg font-bold text-emerald-900 mt-1">
                Xuất Sắc! Bạn Đã Giải Mã Toàn Bộ Chữ Số La Mã!
              </h3>
              <p className="text-xs text-emerald-700 mt-1">
                Ghi nhớ: I(1), V(5), X(10), L(50), C(100), D(500), M(1000).
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
