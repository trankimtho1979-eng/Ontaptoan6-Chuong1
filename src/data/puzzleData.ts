import { SetSortingGameData, RomanPairItem } from '../types/math';

export const SET_SORTING_GAMES: SetSortingGameData[] = [
  {
    title: 'Biểu Đồ Venn: Tập Số Nhỏ Hơn 8 & Tập Số Chẵn',
    description: 'Chạm vào từng con số rồi chọn đưa vào: Tập A, Tập B, phần giao của cả hai (A ∩ B), hoặc Không thuộc tập nào!',
    setAName: 'Tập A (Số tự nhiên < 8)',
    setBName: 'Tập B (Số chẵn < 12)',
    items: [
      { id: 'v-0', value: 0, label: '0', correctSet: 'both' },
      { id: 'v-2', value: 2, label: '2', correctSet: 'both' },
      { id: 'v-4', value: 4, label: '4', correctSet: 'both' },
      { id: 'v-6', value: 6, label: '6', correctSet: 'both' },
      { id: 'v-1', value: 1, label: '1', correctSet: 'setA' },
      { id: 'v-3', value: 3, label: '3', correctSet: 'setA' },
      { id: 'v-5', value: 5, label: '5', correctSet: 'setA' },
      { id: 'v-7', value: 7, label: '7', correctSet: 'setA' },
      { id: 'v-8', value: 8, label: '8', correctSet: 'setB' },
      { id: 'v-10', value: 10, label: '10', correctSet: 'setB' },
      { id: 'v-15', value: 15, label: '15', correctSet: 'neither' },
    ],
    explanation: 'Các số 0, 2, 4, 6 vừa nhỏ hơn 8 vừa là số chẵn nên nằm ở phần giao của cả hai tập hợp. Số 8 và 10 là số chẵn nhưng không nhỏ hơn 8 nên chỉ thuộc Tập B. Số 15 là số lẻ và lớn hơn cả hai tập nên không thuộc tập nào!',
  },
  {
    title: 'Giao Của Hai Tập Hợp Chữ Cái Tiếng Việt',
    description: 'Phân loại các chữ cái vào từ "HỌC TẬP", từ "CHĂM CHỈ", hoặc thuộc cả hai từ!',
    setAName: 'Chữ trong "HỌC TẬP"',
    setBName: 'Chữ trong "CHĂM CHỈ"',
    items: [
      { id: 'c-h', value: 1, label: 'H', correctSet: 'both' },
      { id: 'c-c', value: 2, label: 'C', correctSet: 'both' },
      { id: 'c-o', value: 3, label: 'O', correctSet: 'setA' },
      { id: 'c-t', value: 4, label: 'T', correctSet: 'setA' },
      { id: 'c-p', value: 5, label: 'P', correctSet: 'setA' },
      { id: 'c-a', value: 6, label: 'A', correctSet: 'setB' },
      { id: 'c-m', value: 7, label: 'M', correctSet: 'setB' },
      { id: 'c-i', value: 8, label: 'I', correctSet: 'setB' },
      { id: 'c-x', value: 9, label: 'X', correctSet: 'neither' },
    ],
    explanation: 'Chữ H và C xuất hiện trong cả hai cụm từ nên thuộc phần giao. Chữ X không có trong từ nào nên chọn "Không thuộc tập nào"!',
  },
];

export const ROMAN_NUMERAL_PAIRS: RomanPairItem[] = [
  { id: 'r-4', roman: 'IV', arabic: 4, meaning: '5 - 1 = 4' },
  { id: 'r-9', roman: 'IX', arabic: 9, meaning: '10 - 1 = 9' },
  { id: 'r-14', roman: 'XIV', arabic: 14, meaning: '10 + 4' },
  { id: 'r-19', roman: 'XIX', arabic: 19, meaning: '10 + 9' },
  { id: 'r-24', roman: 'XXIV', arabic: 24, meaning: '20 + 4' },
  { id: 'r-26', roman: 'XXVI', arabic: 26, meaning: '20 + 6' },
  { id: 'r-29', roman: 'XXIX', arabic: 29, meaning: '20 + 9' },
  { id: 'r-50', roman: 'L', arabic: 50, meaning: 'Năm mươi' },
  { id: 'r-100', roman: 'C', arabic: 100, meaning: 'Một trăm' },
];

export interface BelongsSymbolGameItem {
  id: string;
  element: string;
  setNotation: string;
  description: string;
  correctSymbol: '∈' | '∉';
  explanation: string;
}

export const BELONGS_PUZZLE_ITEMS: BelongsSymbolGameItem[] = [
  {
    id: 'b-1',
    element: '0',
    setNotation: 'N*',
    description: 'Số 0 đối với tập hợp các số tự nhiên khác 0 (N*)',
    correctSymbol: '∉',
    explanation: 'Tập hợp N* = {1; 2; 3; ...} là tập hợp các số tự nhiên khác 0, do đó số 0 ∉ N*.',
  },
  {
    id: 'b-2',
    element: '0',
    setNotation: 'N',
    description: 'Số 0 đối với tập hợp số tự nhiên N',
    correctSymbol: '∈',
    explanation: 'Tập hợp N = {0; 1; 2; 3; ...} có chứa số 0, do đó 0 ∈ N.',
  },
  {
    id: 'b-3',
    element: '12',
    setNotation: 'A = {x ∈ N | 5 < x < 12}',
    description: 'Số 12 đối với tập hợp A các số tự nhiên lớn hơn 5 và nhỏ hơn 12',
    correctSymbol: '∉',
    explanation: 'Điều kiện x < 12 là nhỏ hơn nghiêm ngặt (không có dấu bằng), nên x không nhận giá trị 12. Vậy 12 ∉ A.',
  },
  {
    id: 'b-4',
    element: '5',
    setNotation: 'B = {x ∈ N* | x ≤ 5}',
    description: 'Số 5 đối với tập hợp B các số tự nhiên khác 0 nhỏ hơn hoặc bằng 5',
    correctSymbol: '∈',
    explanation: 'Vì có dấu "≤ 5" (nhỏ hơn hoặc bằng 5) nên số 5 thỏa mãn điều kiện, tức 5 ∈ B.',
  },
  {
    id: 'b-5',
    element: 'H',
    setNotation: 'C (Chữ cái trong "HỌC TOÁN")',
    description: 'Chữ cái H đối với tập hợp các chữ cái trong từ "HỌC TOÁN"',
    correctSymbol: '∈',
    explanation: 'Trong từ "HỌC TOÁN" có chữ cái H, do đó H ∈ C.',
  },
  {
    id: 'b-6',
    element: 'K',
    setNotation: 'C (Chữ cái trong "HỌC TOÁN")',
    description: 'Chữ cái K đối với tập hợp các chữ cái trong từ "HỌC TOÁN"',
    correctSymbol: '∉',
    explanation: 'Trong từ "HỌC TOÁN" không hề có chữ cái K, do đó K ∉ C.',
  },
  {
    id: 'b-7',
    element: '2026',
    setNotation: 'N',
    description: 'Số 2026 đối với tập hợp số tự nhiên N',
    correctSymbol: '∈',
    explanation: '2026 là một số tự nhiên, do đó 2026 ∈ N.',
  },
  {
    id: 'b-8',
    element: '10',
    setNotation: 'D (Số tự nhiên có 1 chữ số)',
    description: 'Số 10 đối với tập hợp các số tự nhiên có một chữ số',
    correctSymbol: '∉',
    explanation: 'Tập hợp các số có 1 chữ số chỉ gồm: {0; 1; 2; ...; 9}. Số 10 là số có hai chữ số nên 10 ∉ D.',
  },
];
