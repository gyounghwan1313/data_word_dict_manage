import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, type: 'korean' | 'english') => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'korean' | 'english'>('korean');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, searchType);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={searchType === 'korean' ? '한국어 검색...' : 'English search...'}
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value as 'korean' | 'english')}
        className="px-4 py-2 border rounded-lg bg-white"
      >
        <option value="korean">한국어</option>
        <option value="english">English</option>
      </select>
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        검색
      </button>
    </form>
  );
}