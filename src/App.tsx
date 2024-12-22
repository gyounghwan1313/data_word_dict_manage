import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { ResultsTable } from './components/ResultsTable';
import { AddEntryForm } from './components/AddEntryForm';
import { searchKorean, searchEnglish, deleteWord } from './api';
import type { DictionaryEntry } from './api';
import { Database } from 'lucide-react';

function App() {
  const [results, setResults] = useState<DictionaryEntry[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleSearch = async (query: string, type: 'korean' | 'english') => {
    try {
      const data = await (type === 'korean' ? searchKorean(query) : searchEnglish(query));
      setResults(data);
      setMessage('');
    } catch (error) {
      setMessage('검색 중 오류가 발생했습니다.');
      console.error('Search error:', error);
    }
  };

  const handleDelete = async (korNm: string) => {
    try {
      const response = await deleteWord(korNm);
      setMessage(response.message);
      // Refresh the results after deletion
      const updatedResults = results.filter(entry => entry.kor_nm !== korNm);
      setResults(updatedResults);
    } catch (error) {
      setMessage('삭제 중 오류가 발생했습니다.');
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Database size={32} className="text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">데이터 단어 사전 관리</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <SearchBar onSearch={handleSearch} />
            
            {message && (
              <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-lg">
                {message}
              </div>
            )}

            <ResultsTable results={results} onDelete={handleDelete} />
          </div>

          <AddEntryForm onMessage={setMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;