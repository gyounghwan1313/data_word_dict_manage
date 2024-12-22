import React from 'react';
import type { DictionaryEntry } from '../types';
import { Trash2 } from 'lucide-react';

interface ResultsTableProps {
  results: DictionaryEntry[];
  onDelete: (korNm: string) => void;
}

export function ResultsTable({ results, onDelete }: ResultsTableProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        검색 결과가 없습니다
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">한국어</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">설명</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">영문 약어</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">영문 전체</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">동의어</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {results.map((entry, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{entry.kor_nm}</td>
              <td className="px-6 py-4">{entry.desc}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.eng_short_nm}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.eng_full_nm}</td>
              <td className="px-6 py-4">{entry.synonym.join(', ')}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onDelete(entry.kor_nm)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                  title="삭제"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}