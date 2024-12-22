import React, { useState } from 'react';
import { getRecommendation, addDictionaryEntry, type DictionaryEntry } from '../api';
import { PlusCircle, Lightbulb } from 'lucide-react';

interface AddEntryFormProps {
  onMessage: (message: string) => void;
}

export function AddEntryForm({ onMessage }: AddEntryFormProps) {
  const [entry, setEntry] = useState<DictionaryEntry>({
    kor_nm: '',
    desc: '',
    eng_short_nm: '',
    eng_full_nm: '',
    synonym: [],
  });

  const [synonymInput, setSynonymInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSynonymChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSynonymInput(e.target.value);
    setEntry(prev => ({ ...prev, synonym: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }));
  };

  const handleRecommend = async () => {
    try {
      if (!entry.kor_nm) {
        onMessage('한글명은 필수입니다.');
        return;
      }
      const recommendation = await getRecommendation(entry);
      setEntry(recommendation);
      setSynonymInput(recommendation.synonym.join(', '));
      onMessage('추천이 완료되었습니다.');
    } catch (error) {
      onMessage('추천을 받는 중 오류가 발생했습니다.');
      console.error('Recommendation error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!entry.kor_nm) {
        onMessage('한글명은 필수입니다.');
        return;
      }
      const response = await addDictionaryEntry(entry);
      onMessage(response.message);
      // Clear form after successful submission
      setEntry({
        kor_nm: '',
        desc: '',
        eng_short_nm: '',
        eng_full_nm: '',
        synonym: [],
      });
      setSynonymInput('');
    } catch (error) {
      onMessage('추가하는 중 오류가 발생했습니다.');
      console.error('Add entry error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">새 단어 추가</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            한글명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="kor_nm"
            value={entry.kor_nm}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">영문 약어명</label>
          <input
            type="text"
            name="eng_short_nm"
            value={entry.eng_short_nm}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">동의어 (쉼표로 구분)</label>
          <input
            type="text"
            value={synonymInput}
            onChange={handleSynonymChange}
            placeholder="예: 단어1, 단어2, 단어3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">영문명</label>
          <input
            type="text"
            name="eng_full_nm"
            value={entry.eng_full_nm}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">설명</label>
          <textarea
            name="desc"
            value={entry.desc}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-4 justify-end mt-6">
        <button
          type="button"
          onClick={handleRecommend}
          className="inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Lightbulb className="mr-2 h-4 w-4" />
          추천 받기
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          추가하기
        </button>
      </div>
    </form>
  );
}