import React, { useState } from 'react';
import { BookOpen, Check, Copy, Sparkles, ChevronRight } from 'lucide-react';
import { playTapSound } from '../utils/soundEffects';

interface StudyNotebookProps {
  soundEnabled: boolean;
  onStartQuiz: () => void;
}

export const StudyNotebook: React.FC<StudyNotebookProps> = ({
  soundEnabled,
  onStartQuiz,
}) => {
  const [activeSection, setActiveSection] = useState<'all' | 'taphop' | 'lama' | 'thutu' | 'pheptinh'>('all');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-200">
      
      {/* Title */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Sách Cẩm Nang Bỏ Túi
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-display mt-2 mb-2">
          Bí Kíp Trọng Tâm Chương 1: Số Tự Nhiên
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Bộ kiến thức cô đọng từ Bài 1 đến Bài 7 chuẩn chương trình Toán 6 Kết Nối Tri Thức Với Cuộc Sống!
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-3 mb-8">
        {[
          { id: 'all', label: 'Tất Cả Bí Kíp 📚' },
          { id: 'taphop', label: '1. Tập Hợp 📦' },
          { id: 'lama', label: '2. Số La Mã & Ghi Số 🏛️' },
          { id: 'thutu', label: '3. Thứ Tự Trong N 🔢' },
          { id: 'pheptinh', label: '4. Phép Tính & Tìm x ⚡' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              playTapSound(soundEnabled);
              setActiveSection(tab.id as typeof activeSection);
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
              activeSection === tab.id
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        
        {/* CARD 1: TẬP HỢP & PHẦN TỬ (BÀI 1) */}
        {(activeSection === 'all' || activeSection === 'taphop') && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
                📦
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-800 font-display">
                  1. Tập Hợp & Cách Viết Tập Hợp (Bài 1)
                </h2>
                <p className="text-xs text-slate-500">Khái niệm, ký hiệu ∈, ∉, hai cách cho tập hợp</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 space-y-2">
                <h3 className="font-bold text-amber-950">Quy tắc viết tập hợp chuẩn:</h3>
                <p className="text-slate-700 leading-relaxed">
                  • Tên tập hợp viết bằng chữ cái in hoa: A, B, C, M, N...<br />
                  • Các phần tử nằm trong dấu ngoặc nhọn <code className="font-mono bg-white px-1.5 py-0.5 rounded text-amber-900 font-bold">&#123; &#125;</code>, cách nhau bởi dấu chấm phẩy <code className="font-mono font-bold">;</code><br />
                  • <strong>Mỗi phần tử chỉ được liệt kê 1 lần duy nhất</strong>, thứ tự liệt kê tùy ý.<br />
                  • Ký hiệu: <code className="font-mono font-bold text-amber-900">x ∈ A</code> (x thuộc A); <code className="font-mono font-bold text-rose-700">y ∉ A</code> (y không thuộc A).
                </p>
              </div>

              <div className="bg-sky-50/50 p-4 rounded-2xl border border-sky-200/80 space-y-2">
                <h3 className="font-bold text-sky-950">Hai cách cho một tập hợp:</h3>
                <p className="text-slate-700 leading-relaxed">
                  • <strong>Cách 1: Liệt kê các phần tử:</strong><br />
                  Ví dụ: <code className="font-bold font-mono">A = &#123;0; 1; 2; 3; 4&#125;</code><br />
                  • <strong>Cách 2: Chỉ ra tính chất đặc trưng:</strong><br />
                  Ví dụ: <code className="font-bold font-mono">A = &#123;x ∈ N | x &lt; 5&#125;</code><br />
                  • <strong>Tập hợp chữ cái:</strong> Trong từ "HỌC TOÁN", chữ O lặp lại 2 lần chỉ tính 1 lần: A = &#123;H; O; C; T; A; N&#125; (6 phần tử).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CARD 2: CÁCH GHI SỐ TỰ NHIÊN & SỐ LA MÃ (BÀI 2) */}
        {(activeSection === 'all' || activeSection === 'lama') && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-xl">
                🏛️
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-800 font-display">
                  2. Cách Ghi Số Tự Nhiên & Chữ Số La Mã (Bài 2)
                </h2>
                <p className="text-xs text-slate-500">Cấu tạo số ab, abc và bảng tra cứu số La Mã từ 1 đến 30</p>
              </div>
            </div>

            {/* Structure formula */}
            <div className="bg-sky-50/60 p-3.5 rounded-2xl border border-sky-200 mb-4 text-xs sm:text-sm">
              <p className="font-bold text-sky-950 mb-1">Cấu tạo số trong hệ thập phân:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 font-mono">
                <p>• Số có hai chữ số: <strong>ab = 10a + b</strong> (a ≠ 0)</p>
                <p>• Số có ba chữ số: <strong>abc = 100a + 10b + c</strong> (a ≠ 0)</p>
              </div>
            </div>

            {/* Roman Symbols grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center mb-4">
              {[
                { roman: 'I', val: 1 },
                { roman: 'V', val: 5 },
                { roman: 'X', val: 10 },
                { roman: 'L', val: 50 },
                { roman: 'C', val: 100 },
                { roman: 'D', val: 500 },
                { roman: 'M', val: 1000 },
              ].map((item) => (
                <div key={item.roman} className="bg-sky-50 p-2.5 rounded-xl border border-sky-200">
                  <span className="text-lg font-black font-mono text-sky-900 block">{item.roman}</span>
                  <span className="text-xs text-sky-700 font-bold">{item.val}</span>
                </div>
              ))}
            </div>

            {/* Quick table 1-30 */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
              <p className="font-bold text-slate-700 mb-2">Bảng tra cứu số La Mã từ 1 đến 30:</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 font-mono text-center">
                <span>1: I</span>
                <span>2: II</span>
                <span>3: III</span>
                <span className="font-bold text-rose-600">4: IV</span>
                <span>5: V</span>
                <span>6: VI</span>
                <span>7: VII</span>
                <span>8: VIII</span>
                <span className="font-bold text-rose-600">9: IX</span>
                <span>10: X</span>
                <span className="font-bold text-rose-600">14: XIV</span>
                <span className="font-bold text-rose-600">19: XIX</span>
                <span>20: XX</span>
                <span className="font-bold text-rose-600">24: XXIV</span>
                <span>25: XXV</span>
                <span className="font-bold text-rose-600">29: XXIX</span>
                <span>30: XXX</span>
                <span className="text-emerald-700 font-bold">50: L</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 italic">
                * Quy tắc vàng: Chữ số I và X không được lặp lại quá 3 lần liên tiếp. Chữ số nhỏ hơn đứng trước thì trừ đi (IV = 5 - 1 = 4; IX = 10 - 1 = 9), đứng sau thì cộng vào (VI = 5 + 1 = 6; XI = 10 + 1 = 11).
              </p>
            </div>
          </div>
        )}

        {/* CARD 3: TẬP N, N* & THỨ TỰ TRONG N (BÀI 3) */}
        {(activeSection === 'all' || activeSection === 'thutu') && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-xl">
                🔢
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-800 font-display">
                  3. Tập Hợp N, N* & Thứ Tự Trong Tập Hợp Số Tự Nhiên (Bài 3)
                </h2>
                <p className="text-xs text-slate-500">Phân biệt N và N*, tia số, số liền trước, liền sau và công thức dãy cách đều</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-2.5">
                <h3 className="font-bold text-emerald-950">Phân biệt tập N và N*:</h3>
                <div className="space-y-1.5 font-mono text-emerald-900 font-semibold bg-white p-3 rounded-xl border border-emerald-200">
                  <p>• N = &#123;0; 1; 2; 3; ...&#125; (Có chứa số 0)</p>
                  <p>• N* = &#123;1; 2; 3; 4; ...&#125; (Các số tự nhiên KHÁC 0)</p>
                  <p className="text-xs font-sans text-emerald-800 font-normal mt-1">
                    * Chú ý: 0 ∈ N nhưng 0 ∉ N*
                  </p>
                </div>
              </div>

              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-2.5">
                <h3 className="font-bold text-amber-950">Thứ tự trên tia số & Số liền trước, liền sau:</h3>
                <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-2 text-slate-700">
                  <p>
                    • <strong>Trên tia số nằm ngang:</strong> Điểm nằm bên trái biểu diễn số nhỏ hơn, điểm nằm bên phải biểu diễn số lớn hơn (a &lt; b).
                  </p>
                  <p>
                    • <strong>Số liền trước của a:</strong> là a - 1 (với a &gt; 0).<br />
                    • <strong>Số liền sau của a:</strong> là a + 1.
                  </p>
                </div>
              </div>
            </div>

            {/* Formula callout */}
            <div className="mt-4 p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
              <span className="text-xl shrink-0">⭐</span>
              <div>
                <strong>Công thức vàng tính số phần tử của dãy số cách đều:</strong>
                <p className="font-mono font-bold text-amber-900 text-sm mt-1 bg-white px-2.5 py-1 rounded-lg border border-amber-200 inline-block">
                  Số phần tử = (Số cuối - Số đầu) : khoảng cách + 1
                </p>
                <p className="text-slate-600 text-xs mt-1">
                  Ví dụ: Tập C = &#123;10; 12; 14; ...; 98&#125; có: (98 - 10) : 2 + 1 = 44 + 1 = 45 phần tử.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CARD 4: PHÉP TÍNH, LŨY THỪA & TÌM X (BÀI 4, 5, 6, 7) */}
        {(activeSection === 'all' || activeSection === 'pheptinh') && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-rose-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-xl">
                ⚡
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-800 font-display">
                  4. Thứ Tự Phép Tính, Lũy Thừa & Bài Toán Tìm x (Bài 4, 5, 6, 7)
                </h2>
                <p className="text-xs text-slate-500">Quy tắc có ngoặc/không ngoặc, nhân chia lũy thừa cùng cơ số, tính nhanh & tìm x</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {/* Thứ tự phép tính */}
              <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200 space-y-2.5">
                <h3 className="font-bold text-rose-950 flex items-center gap-1.5">
                  <span>📐</span>
                  <span>Thứ tự thực hiện phép tính:</span>
                </h3>
                <div className="bg-white p-3 rounded-xl border border-rose-200 space-y-2 text-slate-700">
                  <div>
                    <span className="font-bold text-rose-800">• Không có dấu ngoặc:</span>
                    <p className="text-xs font-semibold text-rose-900 mt-0.5 bg-rose-50 px-2 py-1 rounded-md">
                      Lũy thừa ➔ Nhân & Chia ➔ Cộng & Trừ
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      (Nếu chỉ có cộng, trừ hoặc chỉ có nhân, chia thì làm từ trái sang phải)
                    </p>
                  </div>
                  <div className="pt-2 border-t border-rose-100">
                    <span className="font-bold text-rose-800">• Có các dấu ngoặc:</span>
                    <p className="text-xs font-semibold text-rose-900 mt-0.5 bg-rose-50 px-2 py-1 rounded-md">
                      Ngoặc tròn ( ) ➔ Ngoặc vuông [ ] ➔ Ngoặc nhọn &#123; &#125;
                    </p>
                  </div>
                </div>
              </div>

              {/* Lũy thừa */}
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-2.5">
                <h3 className="font-bold text-amber-950 flex items-center gap-1.5">
                  <span>✨</span>
                  <span>Công thức lũy thừa với số mũ tự nhiên:</span>
                </h3>
                <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-2 font-mono text-xs sm:text-sm text-amber-900 font-semibold">
                  <div className="p-1.5 bg-amber-50 rounded-lg">
                    <span>• Nhân cùng cơ số: </span>
                    <span className="text-rose-600 font-bold">aᵐ · aⁿ = aᵐ⁺ⁿ</span>
                    <span className="block font-sans text-[11px] text-slate-500 font-normal">Giữ nguyên cơ số, CỘNG các số mũ</span>
                  </div>
                  <div className="p-1.5 bg-amber-50 rounded-lg">
                    <span>• Chia cùng cơ số: </span>
                    <span className="text-rose-600 font-bold">aᵐ : aⁿ = aᵐ⁻ⁿ</span>
                    <span className="block font-sans text-[11px] text-slate-500 font-normal">(với a ≠ 0, m ≥ n) Giữ nguyên cơ số, TRỪ các số mũ</span>
                  </div>
                  <div className="p-1.5 bg-slate-50 rounded-lg font-sans text-[11px] text-slate-600 font-normal">
                    • Quy ước: a¹ = a ; a⁰ = 1 (với a ≠ 0)
                  </div>
                </div>
              </div>
            </div>

            {/* Bí kíp Tìm x & Tính Nhanh */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 space-y-2">
                <h4 className="font-bold text-blue-950 flex items-center gap-1">
                  <span>🔍</span>
                  <span>Bí kíp giải bài toán Tìm x:</span>
                </h4>
                <ul className="space-y-1.5 text-slate-700 text-xs">
                  <li>• Tìm từ ngoài vào trong: Coi cụm chứa x là một đại lượng chưa biết.</li>
                  <li>• Thừa số chưa biết = <strong>Tích : Thừa số đã biết</strong>.</li>
                  <li>• Số bị chia = <strong>Thương · Số chia</strong>.</li>
                  <li>• Số bị trừ = <strong>Hiệu + Số trừ</strong>.</li>
                  <li>• Nếu <strong>aˣ = aⁿ</strong> (a &gt; 1) thì <strong>x = n</strong>.</li>
                </ul>
              </div>

              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-2">
                <h4 className="font-bold text-emerald-950 flex items-center gap-1">
                  <span>💡</span>
                  <span>Tính nhanh & Tính hợp lý:</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Áp dụng tính chất phân phối để gom thành các số tròn chục (10, 20...), tròn trăm (100...), tròn nghìn:
                </p>
                <div className="p-2 bg-white rounded-xl border border-emerald-200 font-mono text-emerald-900 font-bold text-xs">
                  a · b + a · c = a · (b + c)<br />
                  a · b - a · c = a · (b - c)
                </div>
                <p className="text-[11px] text-emerald-800">
                  Ví dụ: 43 · 37 + 43 · 63 = 43 · (37 + 63) = 43 · 100 = 4 300.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Action Footer */}
      <div className="mt-8 text-center">
        <button
          onClick={() => {
            playTapSound(soundEnabled);
            onStartQuiz();
          }}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base shadow-md hover:shadow-lg transition-all transform active:scale-98 inline-flex items-center gap-2"
        >
          <span>Đã Nắm Chắc Bí Kíp! Thử Thách Trắc Nghiệm Ngay 🚀</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
